/**
 * What the user-to-user trade does - the public methods of Flash `inventory/trading/TradingModel`
 * that talk to the server or drive the dialog: `startTrading`, `close`,
 * `requestAddItemsToTrading`, `requestRemoveItemFromTrading`, the four accept/confirm requests,
 * `requestCancelTrading`, `addSilverFee` and the confirm countdown `TradingView` runs a timer for.
 *
 * `requestOpenTrading` is not here: the avatar menu's trade button already sends it, as
 * `roomUserCommands.startTrading`.
 *
 * Each sends its packet and writes `inventoryStore`. The countdown is the one piece of the view
 * Flash keeps in a timer rather than in the model: three ticks a second apart, after which the
 * trade moves from `COUNTDOWN` to `CONFIRMING` and the accept button turns into confirm.
 */
import {
    AcceptTradingComposer, AddItemsToTradeComposer, AddItemToTradeComposer, AddNftToTradeComposer, CloseTradingComposer, ConfirmAcceptTradingComposer, ConfirmDeclineTradingComposer,
    GetNftTradeInventoryComposer, RemoveItemFromTradeComposer, RemoveNftFromTradeComposer, SilverFeeComposer, UnacceptTradingComposer,
} from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import {
    canAddToTrading, getInventoryFurniItemsForTrade, INVENTORY_TRADE_MAX_ITEMS, INVENTORY_TRADING_COUNTDOWN_SECONDS, INVENTORY_TRADING_STATE_CANCELLED,
    INVENTORY_TRADING_STATE_COMPLETED, INVENTORY_TRADING_STATE_CONFIRMED, INVENTORY_TRADING_STATE_CONFIRMING,
    INVENTORY_TRADING_STATE_COUNTDOWN, INVENTORY_TRADING_STATE_READY, INVENTORY_TRADING_STATE_RUNNING, InventoryFurniGroup, InventoryFurniItem, inventoryStore, InventoryTradingUserSetup, isWeb3Trading, peekInventoryFurni,
} from '#base/context/inventory';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';

import { updateInventoryFurniLocks } from './inventoryCommands';

type Send = WebSocketConnection['send'];

/** `TradingModel.getGuildFurniType`-shaped key: what `canAddItemToTrade` compares an offer against. */
const getTradeStackKey = (item: Pick<InventoryFurniItem, 'isWallItem' | 'typeId' | 'category' | 'stuffData'>): string => {
    if (item.category === 6) return `${item.typeId}poster${item.stuffData.getLegacyString()}`;

    if (item.category === 17) return String(item.typeId);

    return `${item.isWallItem ? 'I' : 'S'}${item.typeId}`;
};

/** The same key for a group already in the trade, so the two can be compared. */
const getTradeGroupStackKey = (group: InventoryFurniGroup): string => {
    const item = peekInventoryFurni(group);

    return item ? getTradeStackKey(item) : `group${group.id}`;
};

/** `TradingModel.startTrading`, the sides already swapped by the handler that looked their names up. */
export const startInventoryTrading = (ownUser: InventoryTradingUserSetup, otherUser: InventoryTradingUserSetup) => {
    inventoryStore.getState().startTrading(ownUser, otherUser);
    // A trade that opens with nothing in it still clears whatever locks the last one left.
    updateInventoryFurniLocks();
};

/** `TradingModel.requestCancelTrading`: a web3 trade being confirmed is past the point of cancelling. */
export const requestCancelTrading = (send: Send) => {
    const { tradingState, tradingRequiredSilverFee, tradingOwnUser, tradingOtherUser } = inventoryStore.getState();

    if (isWeb3Trading(tradingRequiredSilverFee, tradingOwnUser, tradingOtherUser) && (tradingState === INVENTORY_TRADING_STATE_CONFIRMED)) return;

    send(new CloseTradingComposer({}));
};

/**
 * `TradingModel.close`: a trade that is running and not yet completed is cancelled first, and the
 * dialog goes either way. The furni locks go with it.
 */
export const closeInventoryTrading = (send: Send) => {
    const { tradingActive, tradingState, setTradingState, stopTrading } = inventoryStore.getState();

    if (!tradingActive) return;

    if ((tradingState !== INVENTORY_TRADING_STATE_READY) && (tradingState !== INVENTORY_TRADING_STATE_COMPLETED)) {
        requestCancelTrading(send);
        setTradingState(INVENTORY_TRADING_STATE_CANCELLED);
    }

    stopTrading();
    updateInventoryFurniLocks();
};

/**
 * `TradingModel.requestAddItemsToTrading`: a non-groupable item goes in one at a time; groupable
 * ones are filtered by `canAddItemToTrade` (nothing goes in once the user has accepted, and a
 * tenth stack only where it joins one of the nine already offered) and sent as one packet or as a
 * batch.
 */
const requestAddItemsToTrading = (send: Send, itemIds: readonly number[], core: InventoryFurniItem) => {
    if (!itemIds.length) return;

    if (!core.groupable) {
        send(new AddItemToTradeComposer({ itemId: itemIds[itemIds.length - 1] }));

        return;
    }

    const { tradingOwnUser } = inventoryStore.getState();

    if (!canAddToTrading(tradingOwnUser, tradingOwnUser.accepts, getTradeStackKey(core), getTradeGroupStackKey)) return;

    if (itemIds.length === 1) send(new AddItemToTradeComposer({ itemId: itemIds[0] }));
    else send(new AddItemsToTradeComposer({ itemIds }));
};

/**
 * `FurniModel.requestSelectedFurniToTrading` for the user-to-user trade: up to `count` unlocked
 * tradeable items of the selected group go in, unless that would put more than 1500 of the user's
 * items in the trade, which is an alert instead.
 *
 * Returns what Flash writes back into the amount field (`offertotrade_cnt`): how many were
 * offered, 1 after the alert, and undefined where Flash leaves the field as it is.
 */
export const offerSelectedFurniToUserTrade = (send: Send, count: number): number | undefined => {
    const { furniGroups, furniSelectedGroupId, tradingOwnUser } = inventoryStore.getState();
    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);

    if (!group) return undefined;

    const items = getInventoryFurniItemsForTrade(group, count);

    if (!items.length) return undefined;

    const itemIds = items.map(item => item.id);
    const ownItemCount = tradingOwnUser.groups.reduce((total, held) => total + held.items.length, 0);

    if ((ownItemCount + itemIds.length) > INVENTORY_TRADE_MAX_ITEMS) {
        const { getLocalizationValue, showAlert } = systemStore.getState();

        showAlert(getLocalizationValue('trading.items.too_many_items.title'), getLocalizationValue('trading.items.too_many_items.desc'));

        return 1;
    }

    requestAddItemsToTrading(send, itemIds, items[0]);

    return itemIds.length;
};

/**
 * `TradingModel.requestRemoveItemFromTrading`: the slot's own offer is taken back out - a furni
 * group by its last item's strip id, or, once the slot index is past the groups, the NFT that far
 * into the side's NFT list. Nothing comes out once the user has accepted.
 */
export const requestRemoveItemFromTrading = (send: Send, slotIndex: number) => {
    const { tradingOwnUser } = inventoryStore.getState();

    if (tradingOwnUser.accepts) return;

    if (slotIndex >= tradingOwnUser.groups.length) {
        requestRemoveNftFromTrading(send, slotIndex - tradingOwnUser.groups.length);

        return;
    }

    const group = tradingOwnUser.groups[slotIndex];
    const item = group ? peekInventoryFurni(group) : undefined;

    if (!item) return;

    send(new RemoveItemFromTradeComposer({ itemId: item.id }));
};

/** `CollectiblesModel`'s trade inventory: what the collectibles page may offer from. */
export const requestNftTradeInventory = (send: Send) => send(new GetNftTradeInventoryComposer({}));

/** `TradingModel.requestAddNftsToTrading`. */
export const requestAddNftsToTrading = (send: Send, assetIds: readonly number[]) => {
    if (!assetIds.length) return;

    send(new AddNftToTradeComposer({ assetIds }));
};

/**
 * `TradingModel.requestRemoveItemFromTrading`' NFT half: a slot past the furni groups names one of
 * the side's NFTs, which comes out by its asset id.
 */
export const requestRemoveNftFromTrading = (send: Send, nftIndex: number) => {
    const { tradingOwnUser } = inventoryStore.getState();

    if (tradingOwnUser.accepts) return;

    const asset = tradingOwnUser.nftItems[nftIndex];

    if (!asset) return;

    send(new RemoveNftFromTradeComposer({ assetId: asset.assetId }));
};

/** `TradingModel.requestAcceptTrading` / `requestUnacceptTrading`. */
export const requestAcceptTrading = (send: Send) => send(new AcceptTradingComposer({}));
export const requestUnacceptTrading = (send: Send) => send(new UnacceptTradingComposer({}));

/** `TradingModel.requestConfirmAcceptTrading`: the state moves before the packet goes, as Flash does. */
export const requestConfirmAcceptTrading = (send: Send) => {
    inventoryStore.getState().setTradingState(INVENTORY_TRADING_STATE_CONFIRMED);
    send(new ConfirmAcceptTradingComposer({}));
};

/** `TradingModel.requestConfirmDeclineTrading`. */
export const requestConfirmDeclineTrading = (send: Send) => send(new ConfirmDeclineTradingComposer({}));

/** `TradingModel.addSilverFee`: one silver of the user's own into the trade's fee, or one back out. */
export const addTradingSilverFee = (send: Send, add: boolean) => send(new SilverFeeComposer({ add }));

let countdownTimer: ReturnType<typeof setInterval> | undefined;

/** `TradingView.cancelConfirmCountdown`. */
export const cancelTradingConfirmCountdown = () => {
    if (countdownTimer === undefined) return;

    clearInterval(countdownTimer);
    countdownTimer = undefined;
};

/**
 * `TradingView.startConfirmCountdown`: three ticks a second apart while the trade sits in
 * `COUNTDOWN`, counting the `inventory.trading.countdown` caption down; the third tick is
 * `confirmCountdownReady`, which moves the trade to `CONFIRMING`.
 */
export const startTradingConfirmCountdown = () => {
    const { setTradingCountdown, setTradingState } = inventoryStore.getState();

    cancelTradingConfirmCountdown();
    setTradingCountdown(INVENTORY_TRADING_COUNTDOWN_SECONDS);

    countdownTimer = setInterval(() => {
        const { tradingState, tradingCountdown } = inventoryStore.getState();

        // The trade left the countdown under us (cancelled, or the other side changed its offer).
        if (tradingState !== INVENTORY_TRADING_STATE_COUNTDOWN) {
            cancelTradingConfirmCountdown();

            return;
        }

        const next = tradingCountdown - 1;

        setTradingCountdown(next);

        if (next > 0) return;

        cancelTradingConfirmCountdown();
        setTradingState(INVENTORY_TRADING_STATE_CONFIRMING);
    }, 1000);
};

/** `TradingView.setMinimized(true)`: the trade becomes the one-line strip. */
export const minimizeInventoryTrading = () => inventoryStore.getState().setTradingMinimized(true);

/** `windowMininizedEventProc`'s continue button: back to the furni page, and the full dialog with it. */
export const restoreInventoryTrading = () => {
    inventoryStore.getState().setTradingMinimized(false);
    // `TradingModel.requestFurniViewOpen`.
    systemStore.getState().showWindow('inventory', { tab: 'furni' });
};

/**
 * `TradingModel.categorySwitch`: a trade survives the user changing tab - it is only *minimised*
 * while the tab is neither furni nor collectibles. Cancelling belongs to `subCategorySwitch`, which
 * is the sub page changing (the wired trade taking the dock), not the tab.
 */
export const onInventoryTabChangedDuringTrade = (tab: string) => {
    const { tradingActive, setTradingMinimized } = inventoryStore.getState();

    if (!tradingActive) return;

    setTradingMinimized((tab !== 'furni') && (tab !== 'collectibles'));
};

/** `TradingModel.closingInventoryView`: shutting the inventory closes a trade that is not being confirmed. */
export const onInventoryClosedDuringTrade = (send: Send) => {
    const { tradingActive, tradingState, tradingRequiredSilverFee, tradingOwnUser, tradingOtherUser } = inventoryStore.getState();

    if (!tradingActive) return;

    // `closingInventoryView`: a web3 trade waiting on its confirmation is minimised rather than
    // closed, and the user is told where it went.
    if (isWeb3Trading(tradingRequiredSilverFee, tradingOwnUser, tradingOtherUser) && (tradingState === INVENTORY_TRADING_STATE_CONFIRMED)) {
        const { getLocalizationValue } = systemStore.getState();

        minimizeInventoryTrading();
        notificationStore.getState().addNotification(getLocalizationValue('tradingdialog.minimize_web3'), 'info', 'icon_curator_stamp_large_png');

        return;
    }

    closeInventoryTrading(send);
};

/** `TradingView.windowEventProc`'s accept button: accept, take it back, or confirm, by the state. */
export const onTradingAcceptPressed = (send: Send) => {
    const { tradingState, tradingOwnUser } = inventoryStore.getState();

    if (tradingState === INVENTORY_TRADING_STATE_RUNNING) {
        if (tradingOwnUser.accepts) requestUnacceptTrading(send);
        else requestAcceptTrading(send);

        return;
    }

    if (tradingState === INVENTORY_TRADING_STATE_CONFIRMING) requestConfirmAcceptTrading(send);
};

/** `TradingView.windowEventProc`'s cancel button: cancel while it runs, decline while it is being confirmed. */
export const onTradingCancelPressed = (send: Send) => {
    const { tradingState } = inventoryStore.getState();

    if (tradingState === INVENTORY_TRADING_STATE_RUNNING) requestCancelTrading(send);
    else if (tradingState === INVENTORY_TRADING_STATE_CONFIRMING) requestConfirmDeclineTrading(send);
};
