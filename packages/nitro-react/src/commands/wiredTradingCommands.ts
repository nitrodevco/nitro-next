/**
 * What the wired trading windows do - the public methods of Flash's `WiredChestController` /
 * `WiredChestWrapperView` / `ChestSettingsUI` / `ChestNotificationSettingsUI` /
 * `WiredChestUpgradeConfirmationView`, `WiredContractController`, `WiredTradingModel`,
 * `WiredTransactionLogsView` / `TransactionTableObject`, `RewardNotificationController` and the
 * sandbox `SelfDonationTool`. Each sends its packet and writes `wiredTradingStore`.
 *
 * The wired menu's chests tab (another window) uses `openWiredChest`,
 * `requestWiredRoomTransactionLogs` and `requestWiredTransactionDetails` from here.
 *
 * The reference server (turbo-cloud) answers none of these packets: every flow follows Flash.
 */
import { IChestItemType, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import {
    CloseChestComposer, GetExtendedProfileComposer, IWiredContractContents, IWiredTransactionLogList, OpenChestAndGetContentsComposer, SelfDonateItemComposer, SetChestNotificationPreferencesComposer,
    SetChestNotificationPreferencesComposerType, SetChestOptionsComposer, SetChestPreferencesComposer, SetChestPreferencesComposerType, StartAddingToChestComposer, UpgradeChestComposer, WiredTradeAddDeleteItemsComposer,
    WiredTradeCancelComposer, WiredTradeConfirmComposer, WiredTransactionGetChestLogsComposer, WiredTransactionGetLogDetailsComposer, WiredTransactionGetRoomLogsComposer, WiredTransactionLogListType, WiredUpdateContractComposer,
    WithdrawAllFromChestComposer, WithdrawCoinsFromChestComposer, WithdrawItemsFromChestComposer,
} from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import {
    WIRED_CHEST_KEY_CAPACITY_LEVEL, WIRED_CHEST_KEY_EVERYONE_CAN_OPEN, WIRED_CHEST_TYPE_COIN, WIRED_TRADE_STATE_ADDING_ITEMS, WIRED_TRADE_STATE_CONFIRMED, WIRED_TRADE_STATE_CONFIRMING, WIRED_TRADE_STATE_COUNTDOWN,
    WIRED_TRADE_STATE_READY, WIRED_TRANSACTION_PAGE_SIZE, WiredChestFurniData, wiredTradingStore,
} from '#base/context/wired-trading';

type Send = WebSocketConnection['send'];

/** `SelfDonationTool.ALLOWED_ENVIRONMENT_IDS`. */
const SELF_DONATION_ENVIRONMENT_IDS = [ 's1', 's2', 'd63', 'dev', 'local' ];
/** `SelfDonationToolView.MAX_AMOUNT`. */
export const WIRED_SELF_DONATION_MAX_AMOUNT = 500;

/** `getStuffDataMap` plus the model reads next to it; undefined when the chest is not in the room. */
export const readWiredChestFurniData = (chestId: number): WiredChestFurniData | undefined => {
    const roomObject = getRoom()?.getRoomObject(chestId, RoomObjectCategoryEnum.Floor);

    if (!roomObject?.model) return undefined;

    return {
        data: roomObject.model.getValue<Record<string, string>>(RoomObjectVariableEnum.FurnitureData) ?? {},
        furniTypeId: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId) ?? 0,
        ownerId: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) ?? 0,
    };
};

/** `WiredChestController.open`, also what the wired menu's chests tab calls. */
export const openWiredChest = (send: Send, chestId: number) => {
    wiredTradingStore.getState().setChestRequested(chestId);

    send(new OpenChestAndGetContentsComposer({ chestId }));
};

/** `WiredChestController.setClosedStatus`: the server is told the chest we had open is closed. */
const setWiredChestClosedStatus = (send: Send) => {
    const { chestActiveId, setChestClosed } = wiredTradingStore.getState();

    if (chestActiveId !== 0) send(new CloseChestComposer({ chestId: chestActiveId }));

    setChestClosed();
};

/** `WiredChestWrapperView.hide` (and `WiredChestController.close`). */
export const closeWiredChest = (send: Send) => {
    wiredTradingStore.getState().hideChestView();

    setWiredChestClosedStatus(send);
};

/**
 * `WiredChestController.setOpenStatus` + `WiredChestWrapperView.show`: the contents of the chest
 * we asked for are in, so its window opens - unless the chest is not in the room.
 */
export const showWiredChest = (send: Send, chestId: number, chestType: number) => {
    const { setChestOpen, showChestView, setChestFurni } = wiredTradingStore.getState();

    setChestOpen(chestId);

    const furni = readWiredChestFurniData(chestId);

    if (!furni) {
        closeWiredChest(send);

        return;
    }

    showChestView({ chestId, chestType, isOwner: furni.ownerId === userStore.getState().userId, isRoomOwner: roomStore.getState().isRoomOwner });
    setChestFurni(furni);
};

/**
 * `WiredChestController.onPermissionsChanged` / `WiredChestWrapperView.viewingChestUpdated`: the
 * window closes when the viewer may no longer read the chest and it is not open to everyone.
 */
export const checkWiredChestAccess = (send: Send, canRead: boolean) => {
    const { chestView } = wiredTradingStore.getState();

    if (!chestView || chestView.isOwner || canRead) return;

    if (wiredTradingStore.getState().chestFurni?.data[WIRED_CHEST_KEY_EVERYONE_CAN_OPEN] === '1') return;

    closeWiredChest(send);
};

/** `WiredChestWrapperView.isStarterChest`: the chest's class name has the `wired.chests_starter_infix`. */
export const isWiredStarterChest = (config: Record<string, unknown>, className: string | undefined): boolean => {
    const infix = config['wired.chests_starter_infix'];

    return (typeof infix === 'string') && (infix !== '') && (className !== undefined) && (className.indexOf(infix) !== -1);
};

/** `WiredChestWrapperView.onOptionsChanged`. */
export const setWiredChestOptions = (send: Send, chestId: number, isLocked: boolean, autoLock: boolean, capacity: number) => send(new SetChestOptionsComposer({ chestId, isLocked, autoLock, capacity }));

/** `onDepositClick`: the server starts the deposit flow (the inventory's "add to chest" mode). */
export const startWiredChestDeposit = (send: Send, chestId: number) => send(new StartAddingToChestComposer({ chestId }));

/** `onWithdrawAllConfirmed`. */
export const withdrawAllFromWiredChest = (send: Send, chestId: number) => send(new WithdrawAllFromChestComposer({ chestId }));

/** `FurniChestSubController.withdrawItemsWithType`. */
export const withdrawWiredChestItems = (send: Send, chestId: number, type: IChestItemType, amount: number) => send(new WithdrawItemsFromChestComposer({ chestId, type, amount }));

/** `CoinChestSubController.onWithdrawClick`. */
export const withdrawWiredChestCoins = (send: Send, chestId: number, amount: number) => send(new WithdrawCoinsFromChestComposer({ chestId, amount }));

/** `onViewLogsClick`: the chest's log, first page. */
export const requestWiredChestLogs = (send: Send, chestId: number) => send(new WiredTransactionGetChestLogsComposer({ chestId, pageSize: WIRED_TRANSACTION_PAGE_SIZE, page: 1 }));

/** `ChestSettingsUI.onSaveClicked`; the window closes on `ChestPreferencesUpdateSuccess`. */
export const saveWiredChestPreferences = (send: Send, preferences: SetChestPreferencesComposerType) => send(new SetChestPreferencesComposer(preferences));

/** `ChestNotificationSettingsUI.onSaveClicked`; the window closes on `ChestPreferencesUpdateSuccess`. */
export const saveWiredChestNotificationPreferences = (send: Send, preferences: SetChestNotificationPreferencesComposerType) => send(new SetChestNotificationPreferencesComposer(preferences));

/** `WiredChestUpgradeConfirmationView.onBuyClicked`; the window closes on `UpgradeChestResult`. */
export const upgradeWiredChest = (send: Send, chestId: number, amount: number) => send(new UpgradeChestComposer({ chestId, amount }));

/** `wired.<coins|furni>_chest.<name>` - `WiredChestController.getInteger(..., 0)`. */
export const getWiredChestConfigInteger = (config: Record<string, unknown>, chestType: number, name: string): number => {
    const value = Number(config[`wired.${(chestType === WIRED_CHEST_TYPE_COIN) ? 'coins' : 'furni'}_chest.${name}`]);

    return Number.isFinite(value) ? Math.trunc(value) : 0;
};

/**
 * `WiredChestWrapperView.maxCapacity`: a starter chest's fixed capacity, otherwise the initial
 * capacity plus one upgrade's worth per bought level.
 */
export const getWiredChestMaxCapacity = (config: Record<string, unknown>, chestType: number, isStarterChest: boolean, data: Record<string, string>): number => {
    if (isStarterChest) return getWiredChestConfigInteger(config, chestType, 'starter_capacity');

    const level = parseInt(data[WIRED_CHEST_KEY_CAPACITY_LEVEL] ?? '0', 10) || 0;

    return getWiredChestConfigInteger(config, chestType, 'initial_capacity') + (getWiredChestConfigInteger(config, chestType, 'upgrade_capacity') * level);
};

/** `WiredContractController.saveContract`: `AbstractContract.validate` has nothing to object to, so it goes straight out. */
export const saveWiredContract = (send: Send, contents: IWiredContractContents) => send(new WiredUpdateContractComposer(contents));

/** `WiredTradingModel.requestAccept`; true when the confirm countdown should start. */
export const acceptWiredTrade = (send: Send): boolean => {
    const { tradeState, setTradeState } = wiredTradingStore.getState();

    if (tradeState !== WIRED_TRADE_STATE_ADDING_ITEMS) return false;

    send(new WiredTradeConfirmComposer({ isFinalConfirm: false }));
    setTradeState(WIRED_TRADE_STATE_COUNTDOWN);

    return true;
};

/** `WiredTradingModel.confirmCountdownReady`. */
export const wiredTradeCountdownReady = () => {
    const { tradeState, setTradeState } = wiredTradingStore.getState();

    if (tradeState === WIRED_TRADE_STATE_COUNTDOWN) setTradeState(WIRED_TRADE_STATE_CONFIRMING);
};

/** `WiredTradingModel.requestConfirm`. */
export const confirmWiredTrade = (send: Send) => {
    const { tradeState, setTradeState } = wiredTradingStore.getState();

    if (tradeState !== WIRED_TRADE_STATE_CONFIRMING) return;

    send(new WiredTradeConfirmComposer({ isFinalConfirm: true }));
    setTradeState(WIRED_TRADE_STATE_CONFIRMED);
};

/** `WiredTradingModel.requestCancelTrading`: the server answers with `WiredTradeCancelled`. */
export const cancelWiredTrade = (send: Send) => send(new WiredTradeCancelComposer({}));

/** `WiredTradingModel.requestRemoveItemFromTrading`, by the item's inventory id. */
export const removeWiredTradeItem = (send: Send, itemId: number) => {
    if (wiredTradingStore.getState().tradeState !== WIRED_TRADE_STATE_ADDING_ITEMS) return;

    send(new WiredTradeAddDeleteItemsComposer({ isDelete: true, itemIds: [ itemId ] }));
};

/** `WiredTradingModel.close`: `sendCancel` is Flash's second argument - the user walked away, rather than the server ending it. */
export const closeWiredTrade = (send: Send, sendCancel: boolean) => {
    const { tradeRunning, tradeState, closeTrade } = wiredTradingStore.getState();

    if (!tradeRunning) return;

    if ((tradeState !== WIRED_TRADE_STATE_READY) && sendCancel) cancelWiredTrade(send);

    closeTrade();
};

/** `WiredTransactionLogsView.requestPage`: a chest log pages by chest id, the room log by page alone. */
export const requestWiredTransactionLogsPage = (send: Send, logs: IWiredTransactionLogList, page: number) => {
    if (Number(logs.logListType) === Number(WiredTransactionLogListType.Chest)) send(new WiredTransactionGetChestLogsComposer({ chestId: logs.logListId, pageSize: WIRED_TRANSACTION_PAGE_SIZE, page }));
    else send(new WiredTransactionGetRoomLogsComposer({ pageSize: WIRED_TRANSACTION_PAGE_SIZE, page }));
};

/** `WiredMenuChestsTab`'s requests of the room's log: its preview (`WIRED_TRANSACTIONS_PREVIEW_AMOUNT`) and the full log window (`WIRED_TRANSACTION_PAGE_SIZE`). */
export const requestWiredRoomTransactionLogs = (send: Send, pageSize: number, page: number) => send(new WiredTransactionGetRoomLogsComposer({ pageSize, page }));

/** `TransactionTableObject.onClickDetails`. */
export const requestWiredTransactionDetails = (send: Send, transactionId: number) => send(new WiredTransactionGetLogDetailsComposer({ transactionId }));

/** `TransactionTableObject.onClickUsername`. */
export const openWiredTransactionUserProfile = (send: Send, userId: number) => send(new GetExtendedProfileComposer({ userId, openProfile: true }));

/** `RewardNotificationController.linkReceived` (`wiredrewards/open/<id>`): a reward nobody kept is ignored. */
export const openWiredRewardView = (internalId: number) => {
    const { rewardsById, openRewardView } = wiredTradingStore.getState();

    if (!rewardsById[internalId]) return;

    openRewardView(internalId);
};

/** `SelfDonationTool.isSandboxEnvironment`: `environment.id` is one of the sandbox hotels. */
export const isWiredSelfDonationAllowed = (): boolean => {
    const environmentId = systemStore.getState().config['environment.id'];

    return (typeof environmentId === 'string') && SELF_DONATION_ENVIRONMENT_IDS.includes(environmentId);
};

/** `SelfDonationTool.open` (`selfdonation/open`): nothing outside a sandbox hotel. */
export const openWiredSelfDonation = () => {
    if (!isWiredSelfDonationAllowed()) return;

    systemStore.getState().showWindow('wired_self_donation');
};

/** `SelfDonationTool.onDonate` with its `validate`: a failed check is an alert, not a packet. */
export const selfDonateWiredItem = (send: Send, type: IChestItemType | undefined, amount: number) => {
    const { getLocalizationValue, showAlert, floorItems, wallItems } = systemStore.getState();
    const alert = (message: string) => showAlert(getLocalizationValue('wiredfurni.error.title', 'wiredfurni.error.title'), message);

    if (!isWiredSelfDonationAllowed()) {
        alert(getLocalizationValue('selfdonation.sandbox_only', 'Self donation only works in the sandbox environment.'));

        return;
    }

    if (!type) {
        alert(getLocalizationValue('selfdonation.select_item', 'Select a furniture item first.'));

        return;
    }

    if ((amount < 1) || (amount > WIRED_SELF_DONATION_MAX_AMOUNT)) {
        alert(getLocalizationValue('selfdonation.invalid_amount', 'Please enter an amount between 1 and %max%.', { max: String(WIRED_SELF_DONATION_MAX_AMOUNT) }));

        return;
    }

    if (!(type.isWallItem ? wallItems : floorItems)[type.typeId]) {
        alert(getLocalizationValue('selfdonation.invalid_item', 'This item cannot be donated from the sandbox tool.'));

        return;
    }

    send(new SelfDonateItemComposer({ type, amount }));
};

/**
 * `WiredTradingModel.requestAddItemsToTrading`: the inventory's selection goes into the offer,
 * by inventory item id, while items may still be added. The furni page
 * (`inventoryCommands.offerSelectedFurniToTrade`) checks the item cap before this.
 */
export const requestAddItemsToWiredTrade = (send: Send, itemIds: number[]) => {
    if (wiredTradingStore.getState().tradeState !== WIRED_TRADE_STATE_ADDING_ITEMS) return;

    send(new WiredTradeAddDeleteItemsComposer({ isDelete: false, itemIds }));
};
