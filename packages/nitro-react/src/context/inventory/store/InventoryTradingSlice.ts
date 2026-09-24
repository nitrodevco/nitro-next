/**
 * The user-to-user trade - Flash `inventory/trading/TradingModel` and the state its `TradingView`
 * draws from: who the two sides are, what each has put in, whether each has accepted, and how far
 * the trade has got (`TRADING_STATE_*`).
 *
 * - `startTrading` is Flash's, with the sides already swapped so the own user is the session's own
 *   (`IncomingMessages.onTradingOpen` does the swap before it calls the model).
 * - `setTradingItems` is `updateItemGroupMaps`: a `TradingItemList` replaces both offers whole and
 *   drops both acceptances, because the server sends one whenever either side changes what it
 *   offers. The items arrive flat and are stacked into groups the way
 *   `IncomingMessages.populateItemGroups` stacks them.
 * - `setTradingState` is the `state` setter: only the moves Flash allows are taken, so a packet
 *   that arrives out of order leaves the trade where it was rather than throwing. The countdown
 *   between `COUNTDOWN` and `CONFIRMING` is driven by `inventoryTradingCommands`.
 * - The silver fields are the web3 trade's (`TradeSilverFee` / `TradeSilverSet`); with no fee and
 *   no NFT on either side `isWeb3Trade` is false and the whole row stays hidden.
 *
 * The NFT (collectibles) half of a trade rides alongside the furni one: `TradeNftAssets` replaces
 * both sides' `nftItems`, and a side's nine slots hold its furni groups first and its NFTs after,
 * which is the order `updateItemsGrid` fills them in.
 */
import { AvatarGenderType, IObjectData, StringDataType } from '@nitrodevco/nitro-api';
import { ITradeNftAsset, ITradingItemListData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { InventoryFurniGroup, InventoryFurniItem } from './InventoryFurniGroup';

/** `TradingModel.TRADING_STATE_*`. */
export const INVENTORY_TRADING_STATE_READY = 0;
export const INVENTORY_TRADING_STATE_RUNNING = 1;
export const INVENTORY_TRADING_STATE_COUNTDOWN = 2;
export const INVENTORY_TRADING_STATE_CONFIRMING = 3;
export const INVENTORY_TRADING_STATE_CONFIRMED = 4;
export const INVENTORY_TRADING_STATE_COMPLETED = 5;
export const INVENTORY_TRADING_STATE_CANCELLED = 6;

/** `TradingModel.MAX_ITEMS_TO_TRADE`: how many groups one side may offer. */
export const INVENTORY_TRADING_MAX_ITEMS = 9;

/** `TradingCloseParser`'s reason for the server failing to commit the trade. */
export const INVENTORY_TRADING_CLOSE_REASON_COMMIT_ERROR = 1;

/** `startConfirmCountdown`: three ticks a second apart before the confirm button lights up. */
export const INVENTORY_TRADING_COUNTDOWN_SECONDS = 3;

/** `TradeOpenFailedParser` reasons answered with "a trade is already open" rather than the reason's own text. */
export const INVENTORY_TRADING_OPEN_FAIL_ALREADY_OPEN: readonly number[] = [ 7, 8 ];

/** One side of the trade, as `TradingView` draws it. */
export interface InventoryTradingUser {
    userId: number;
    userName: string;
    /** `userCanTrade`: false puts the account-disabled notice over that side's grid. */
    canTrade: boolean;
    accepts: boolean;
    /** The offered items, stacked into groups in the order the packet listed them. */
    groups: InventoryFurniGroup[];
    /**
     * The offered NFTs (`ownUserNftItems` / `otherUserNftItems`). They share the side's nine slots
     * with the furni groups and sit after them, which is the order `updateItemsGrid` fills the grid
     * in and the order `requestRemoveItemFromTrading` indexes.
     */
    nftItems: ITradeNftAsset[];
    /**
     * `showOwnUserNotification` / `showOtherUserNotification`: a notice drawn over that side's grid
     * instead of the grid. Undefined is no notice; an empty string is Flash's notice with no text,
     * which is what both sides get when neither may trade.
     */
    notice: string | undefined;
    /** `numItems` / `numCredits`: what the server counts in the offer, which a stack of posters does not tell. */
    numItems: number;
    numCredits: number;
}

/**
 * `TradingNameScamWarningData`: who you are trading with and the names theirs could be mistaken
 * for, in the room and among your friends.
 */
export interface InventoryTradingNameScamWarning {
    tradedUserId: number;
    tradedUserName: string;
    tradedUserFigure: string;
    tradedUserGender: AvatarGenderType;
    /**
     * `performance.now()` when the warning went up, taken by the handler that raised it: the close
     * lock counts down from here, and reading the clock during render would be impure.
     */
    raisedAt: number;
    similarInRoom: string[];
    similarInFriends: string[];
}

const emptyTradingUser = (): InventoryTradingUser => ({ userId: -1, userName: '', canTrade: false, accepts: false, groups: [], nftItems: [], numItems: 0, numCredits: 0, notice: undefined });

/** `TradingModel.getGuildFurniType`: the type id with the four values of the badge behind it. */
const getGuildFurniType = (typeId: number, stuffData: IObjectData): string => {
    if (!(stuffData instanceof StringDataType)) return String(typeId);

    let key = String(typeId);

    for (let index = 1; index < 5; index++) key += `,${stuffData.getValue(index)}`;

    return key;
};

/** `IncomingMessages.populateItemGroups`' key: what makes two offered items one stack. */
const getTradingGroupKey = (data: ITradingItemListData, isExternalImage: boolean): string => {
    if (!data.isGroupable || isExternalImage) return `itemid${data.itemId}`;

    if (data.category === 6) return `${data.itemTypeId}poster${data.stuffData.getLegacyString()}`;

    if (data.category === 17) return getGuildFurniType(data.itemTypeId, data.stuffData);

    return `${data.itemType}${data.itemTypeId}`;
};

/** `new FurnitureItem(itemData)` from a trade's item list; a trade never carries a lock, a rent or the sell flags. */
const createTradingItem = (data: ITradingItemListData): InventoryFurniItem => ({
    id: data.itemId,
    ref: data.roomItemId,
    typeId: data.itemTypeId,
    category: data.category,
    isWallItem: data.isWallItem,
    stuffData: data.stuffData,
    extra: data.extra ?? 0,
    groupable: data.isGroupable,
    tradeable: true,
    recyclable: false,
    sellable: false,
    isRented: false,
    // A trade's item list carries no room id: an item in a trade is not in a room.
    flatId: -1,
    locked: false,
});

let nextTradingGroupId = 1;

/**
 * `IncomingMessages.populateItemGroups`: the flat item list stacked into groups, in the order the
 * first item of each group arrived. `isExternalImage` answers Flash's `isFurniExternalImage` - such
 * an item never stacks, because each one is its own picture.
 */
export const groupTradingItems = (items: readonly ITradingItemListData[], isExternalImage: (typeId: number) => boolean): InventoryFurniGroup[] => {
    const groups: InventoryFurniGroup[] = [];
    const byKey = new Map<string, InventoryFurniGroup>();

    for (const data of items) {
        const external = isExternalImage(data.itemTypeId);
        const key = getTradingGroupKey(data, external);
        const stackable = data.isGroupable && !external;
        let group = stackable ? byKey.get(key) : undefined;

        if (!group) {
            group = { id: nextTradingGroupId++, typeId: data.itemTypeId, category: data.category, stuffData: data.stuffData, extra: data.extra ?? 0, items: [], hasUnseenItems: false };

            groups.push(group);
            byKey.set(key, group);
        }

        group.items.push(createTradingItem(data));
    }

    return groups;
};

type State = {
    /** Flash's "trading opened" flag: a trade has been opened and not closed - what the inventory's trading sub page shows for. */
    tradingActive: boolean;
    tradingState: number;
    tradingOwnUser: InventoryTradingUser;
    tradingOtherUser: InventoryTradingUser;
    /** `startConfirmCountdown`'s counter, 3 down to 0; -1 while no countdown runs. */
    tradingCountdown: number;
    /**
     * `TradingView.setMinimized`: the trade is shown as the one-line `inventory_trading_minimized`
     * strip rather than the full dialog. `categorySwitch` sets it while the user is on a tab other
     * than furni or collectibles, and `closingInventoryView` sets it for a web3 trade waiting on
     * its confirmation; every state that ends the trade clears it.
     */
    tradingMinimized: boolean;
    /** `requiredSilverFee` / `playerSilver` / `otherPlayerSilver` - the web3 trade's fee row. */
    tradingRequiredSilverFee: number;
    tradingPlayerSilver: number;
    tradingOtherPlayerSilver: number;
    /** `CollectiblesModel`'s trade inventory: the NFTs a trade may offer, asked for when the page opens. */
    tradingNftInventory: ITradeNftAsset[];
    /** `CollectiblesModel.selected`: the grouped product the collectibles page has picked, by its key. */
    tradingNftSelectedKey: string;
    /** `TradingNameScamWarningController`'s dialog, raised when the trade opens; undefined when there is nothing to warn about. */
    tradingNameScamWarning: InventoryTradingNameScamWarning | undefined;
};

type Actions = {
    /** `TradingModel.startTrading`, the sides already swapped so the first is the session's own user. */
    startTrading: (ownUser: InventoryTradingUserSetup, otherUser: InventoryTradingUserSetup) => void;
    /** `TradingModel.close`'s tail: the trade is no longer open and the sub page goes. */
    stopTrading: () => void;
    /** The `state` setter - a move Flash does not allow is dropped. */
    setTradingState: (state: number) => void;
    /** `updateItemGroupMaps`: both offers replaced, both acceptances dropped. */
    setTradingItems: (own: InventoryTradingOffer, other: InventoryTradingOffer) => void;
    /** `TradingModel.updateNftItems`: both NFT offers replaced, both acceptances dropped. */
    setTradingNftItems: (ownItems: ITradeNftAsset[], otherItems: ITradeNftAsset[]) => void;
    /** The answer to `GetNftTradeInventoryComposer`. */
    setTradingNftInventory: (items: ITradeNftAsset[]) => void;
    /** `CollectiblesModel.selectItem`; '' is nothing picked. */
    selectTradingNft: (key: string) => void;
    /** `TradingNameScamWarningController.show` / `hide`: undefined takes the warning down. */
    setTradingNameScamWarning: (warning: InventoryTradingNameScamWarning | undefined) => void;
    /** `TradingAcceptEvent`: by user id, so a packet naming neither side is dropped. */
    setTradingAccepts: (userId: number, accepts: boolean) => void;
    setTradingCountdown: (countdown: number) => void;
    /** `TradingView.setMinimized`. */
    setTradingMinimized: (minimized: boolean) => void;
    /** `showOwnUserNotification` / `showOtherUserNotification` and their `hide` twins (undefined). */
    setTradingNotice: (side: 'own' | 'other', notice: string | undefined) => void;
    setTradingSilverFee: (silverFee: number) => void;
    setTradingSilver: (playerSilver: number, otherPlayerSilver: number) => void;
};

/** What `startTrading` is given for each side - the rest of the user starts empty. */
export type InventoryTradingUserSetup = Pick<InventoryTradingUser, 'userId' | 'userName' | 'canTrade'>;

/** What one side has put in, as `TradingItemList` carries it. */
export type InventoryTradingOffer = Pick<InventoryTradingUser, 'groups' | 'numItems' | 'numCredits'>;

/** `TradingView.setup`'s notice for one side. */
const getTradingSetupNotice = (ownCanTrade: boolean, otherCanTrade: boolean, side: 'own' | 'other'): string | undefined => {
    if (!ownCanTrade && !otherCanTrade) return '';

    if (side === 'own') return ownCanTrade ? undefined : 'inventory.trading.warning.own_account_disabled';

    return otherCanTrade ? undefined : 'inventory.trading.warning.others_account_disabled';
};

export const InventoryTradingSliceInitialState: State = {
    tradingActive: false,
    tradingState: INVENTORY_TRADING_STATE_READY,
    tradingOwnUser: emptyTradingUser(),
    tradingOtherUser: emptyTradingUser(),
    tradingCountdown: -1,
    tradingMinimized: false,
    tradingRequiredSilverFee: 0,
    tradingPlayerSilver: 0,
    tradingOtherPlayerSilver: 0,
    tradingNftInventory: [],
    tradingNftSelectedKey: '',
    tradingNameScamWarning: undefined,
};

export type InventoryTradingSlice = State & Actions;

/** The `state` setter's table: which states each one may move to. Anything else is dropped. */
const ALLOWED_TRADING_STATES: Record<number, readonly number[]> = {
    [INVENTORY_TRADING_STATE_READY]: [ INVENTORY_TRADING_STATE_RUNNING, INVENTORY_TRADING_STATE_COMPLETED ],
    [INVENTORY_TRADING_STATE_RUNNING]: [ INVENTORY_TRADING_STATE_COUNTDOWN, INVENTORY_TRADING_STATE_CANCELLED ],
    [INVENTORY_TRADING_STATE_COUNTDOWN]: [ INVENTORY_TRADING_STATE_RUNNING, INVENTORY_TRADING_STATE_CONFIRMING, INVENTORY_TRADING_STATE_CANCELLED ],
    [INVENTORY_TRADING_STATE_CONFIRMING]: [ INVENTORY_TRADING_STATE_CONFIRMED, INVENTORY_TRADING_STATE_COMPLETED, INVENTORY_TRADING_STATE_CANCELLED ],
    [INVENTORY_TRADING_STATE_CONFIRMED]: [ INVENTORY_TRADING_STATE_COMPLETED, INVENTORY_TRADING_STATE_CANCELLED ],
    [INVENTORY_TRADING_STATE_COMPLETED]: [ INVENTORY_TRADING_STATE_READY ],
    [INVENTORY_TRADING_STATE_CANCELLED]: [ INVENTORY_TRADING_STATE_READY, INVENTORY_TRADING_STATE_RUNNING ],
};

export const createInventoryTradingSlice: StateCreator<InventoryTradingSlice, [], [], InventoryTradingSlice> = set => ({
    ...InventoryTradingSliceInitialState,
    startTrading: (ownUser, otherUser) => set({
        ...InventoryTradingSliceInitialState,
        tradingActive: true,
        tradingState: INVENTORY_TRADING_STATE_RUNNING,
        // `TradingView.setup`: a side that may not trade gets the notice over its grid, and where
        // neither may the notices are blank and the help text says so instead.
        tradingOwnUser: { ...emptyTradingUser(), ...ownUser, notice: getTradingSetupNotice(ownUser.canTrade, otherUser.canTrade, 'own') },
        tradingOtherUser: { ...emptyTradingUser(), ...otherUser, notice: getTradingSetupNotice(ownUser.canTrade, otherUser.canTrade, 'other') },
    }),
    stopTrading: () => set({ ...InventoryTradingSliceInitialState }),
    setTradingState: state => set((x) => {
        if (x.tradingState === state) return x;

        if (!ALLOWED_TRADING_STATES[x.tradingState]?.includes(state)) return x;

        // Leaving the countdown for any reason stops it; entering it is the command's job. Every
        // move to a finished state calls `setMinimized(false)`, so the strip never outlives the trade.
        const ends = (state === INVENTORY_TRADING_STATE_COMPLETED) || (state === INVENTORY_TRADING_STATE_CANCELLED);

        return {
            tradingState: state,
            tradingCountdown: (state === INVENTORY_TRADING_STATE_COUNTDOWN) ? x.tradingCountdown : -1,
            tradingMinimized: ends ? false : x.tradingMinimized,
        };
    }),
    setTradingItems: (own, other) => set(x => ({
        tradingOwnUser: { ...x.tradingOwnUser, ...own, accepts: false },
        tradingOtherUser: { ...x.tradingOtherUser, ...other, accepts: false },
    })),
    setTradingNftItems: (ownItems, otherItems) => set(x => ({
        tradingOwnUser: { ...x.tradingOwnUser, nftItems: ownItems, accepts: false },
        tradingOtherUser: { ...x.tradingOtherUser, nftItems: otherItems, accepts: false },
    })),
    setTradingNftInventory: tradingNftInventory => set({ tradingNftInventory }),
    selectTradingNft: tradingNftSelectedKey => set({ tradingNftSelectedKey }),
    setTradingNameScamWarning: tradingNameScamWarning => set({ tradingNameScamWarning }),
    setTradingAccepts: (userId, accepts) => set((x) => {
        if (userId === x.tradingOwnUser.userId) return { tradingOwnUser: { ...x.tradingOwnUser, accepts } };

        if (userId === x.tradingOtherUser.userId) return { tradingOtherUser: { ...x.tradingOtherUser, accepts } };

        return x;
    }),
    setTradingCountdown: tradingCountdown => set({ tradingCountdown }),
    setTradingMinimized: tradingMinimized => set({ tradingMinimized }),
    setTradingNotice: (side, notice) => set(x => ((side === 'own')
        ? { tradingOwnUser: { ...x.tradingOwnUser, notice } }
        : { tradingOtherUser: { ...x.tradingOtherUser, notice } })),
    setTradingSilverFee: tradingRequiredSilverFee => set({ tradingRequiredSilverFee }),
    setTradingSilver: (tradingPlayerSilver, tradingOtherPlayerSilver) => set({ tradingPlayerSilver, tradingOtherPlayerSilver }),
});

/**
 * `CollectibleGroupedItem`: the wallet's copies of one collectible product, as the collectibles
 * grid shows them - one cell per product with the asset ids of the copies behind it.
 */
export interface InventoryCollectibleGroup {
    /** `productTypeId`, `itemTypeId` and `productCode` together name one product. */
    key: string;
    /** The product itself, for the name and the preview - the first copy stands for all of them. */
    item: ITradeNftAsset;
    /** Every copy held, in the order the inventory listed them. */
    assetIds: number[];
    /** `unlockedAssetCount`: the copies not already in the trade - what may still be offered. */
    unlockedAssetCount: number;
}

const getCollectibleGroupKey = (item: ITradeNftAsset): string => `${item.productTypeId}|${item.itemTypeId}|${item.productCode}`;

/**
 * The trade inventory grouped for the collectibles grid, with the copies already in the trade
 * counted out of each group's unlocked total (`lockAsset` / `unlockedAssetCount`).
 */
export const groupTradingNftInventory = (inventory: readonly ITradeNftAsset[], offered: readonly ITradeNftAsset[]): InventoryCollectibleGroup[] => {
    const lockedIds = new Set(offered.map(asset => asset.assetId));
    const groups: InventoryCollectibleGroup[] = [];
    const byKey = new Map<string, InventoryCollectibleGroup>();

    for (const item of inventory) {
        const key = getCollectibleGroupKey(item);
        let group = byKey.get(key);

        if (!group) {
            group = { key, item, assetIds: [], unlockedAssetCount: 0 };

            groups.push(group);
            byKey.set(key, group);
        }

        group.assetIds.push(item.assetId);

        if (!lockedIds.has(item.assetId)) group.unlockedAssetCount++;
    }

    return groups;
};

/** `CollectibleGroupedItem.pop(count)`: the asset ids a fresh offer of `count` copies would use. */
export const takeTradingNftAssetIds = (group: InventoryCollectibleGroup, offered: readonly ITradeNftAsset[], count: number): number[] => {
    const lockedIds = new Set(offered.map(asset => asset.assetId));

    return group.assetIds.filter(assetId => !lockedIds.has(assetId)).slice(0, Math.max(0, count));
};

/** `TradingModel.ownHasAnyOffer` / `otherHasAnyOffer`. */
export const hasTradingOffer = (user: InventoryTradingUser): boolean => (user.groups.length > 0) || (user.nftItems.length > 0);

/** `TradingModel.isWeb3Trade`: a fee to pay, or an NFT on either side. */
export const isWeb3Trading = (requiredSilverFee: number, ownUser?: InventoryTradingUser, otherUser?: InventoryTradingUser): boolean =>
    (requiredSilverFee > 0) || ((ownUser?.nftItems.length ?? 0) > 0) || ((otherUser?.nftItems.length ?? 0) > 0);

/** `ownUserNumItemsTotal` / `otherUserNumItemsTotal`: the furni count the server sends plus the NFTs. */
export const getTradingItemsTotal = (user: InventoryTradingUser): number => user.numItems + user.nftItems.length;

/** `TradingModel.tradeFeeReached`. */
export const isTradingFeeReached = (requiredSilverFee: number, playerSilver: number, otherPlayerSilver: number): boolean => (playerSilver + otherPlayerSilver) >= requiredSilverFee;

/** `TradingModel.isCreditFurniPresent`: either side is offering credit furni. */
export const isTradingCreditFurniPresent = (ownUser: InventoryTradingUser, otherUser: InventoryTradingUser): boolean => (ownUser.numCredits > 0) || (otherUser.numCredits > 0);

/**
 * `TradingModel.canAddItemToTrade`: a tenth group may only go in when it stacks onto one of the
 * nine already offered, which is what `groupKey` compares. Nothing may go in once the user has
 * accepted.
 */
export const canAddToTrading = (ownUser: InventoryTradingUser, accepts: boolean, groupKey: string, keyOf: (group: InventoryFurniGroup) => string): boolean => {
    if (accepts) return false;

    if (ownUser.groups.length < INVENTORY_TRADING_MAX_ITEMS) return true;

    return ownUser.groups.some(group => keyOf(group) === groupKey);
};
