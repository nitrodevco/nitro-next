/**
 * The user-to-user trade - the trading half of Flash `inventory/IncomingMessages`
 * (`onTradingOpen`, `onTradingItemList`, and the messages it hands straight to
 * `TradingModel.handleMessageEvent`).
 *
 * - `TradingOpen`: both users' names come from the room's user list, and the sides are swapped so
 *   the first is the session's own user, whichever way round the server named them. The inventory
 *   opens on its furni page with the trade docked under it.
 * - `TradingItemList`: the flat item lists are stacked into groups
 *   (`IncomingMessages.populateItemGroups`) and replace both offers, and the furni locks are
 *   re-read - a trade locks the items it holds out of the grid.
 * - `TradingConfirmation` puts the trade into its three-second countdown; `TradingCompleted` and
 *   `TradingClose` end it, the latter with the alert Flash raises when it was not the user who
 *   closed it, or the commit-error alert behind `trading.commiterror.enabled`.
 * - `TradeOpenFailed` is an alert naming the reason, except the two reasons that mean a trade is
 *   already open, which get their own text.
 *
 * - `TradeNftAssets` is the collectibles half of the two offers, and `TradeNftAssetInventory` the
 *   wallet's NFTs a trade may offer from (`CollectiblesModel`).
 * - Opening a trade also runs the name-scam check (`TradingModel.detectNameScam`): the other user's
 *   name is weighed against everyone else in the room and every friend, and a look-alike raises the
 *   warning dialog.
 */
import { RoomObjectUserType } from '@nitrodevco/nitro-api';
import {
    TradeNftAssetInventoryMessage, TradeNftAssetsMessage, TradeOpenFailedEventPaserMessage, TradeSilverFeeMessage, TradeSilverSetMessage, TradingAcceptEventMessage,
    TradingCloseEventMessage, TradingCompletedEventMessage, TradingConfirmationEventMessage, TradingItemListEventMessage, TradingOpenEventMessage,
    TradingOtherNotAllowedEventMessage, TradingYouAreNotAllowedEventMessage,
} from '@nitrodevco/nitro-packets';

import { startInventoryTrading, startTradingConfirmCountdown, updateInventoryFurniLocks } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import {
    groupTradingItems, INVENTORY_TRADING_CLOSE_REASON_COMMIT_ERROR, INVENTORY_TRADING_OPEN_FAIL_ALREADY_OPEN, INVENTORY_TRADING_STATE_CANCELLED, INVENTORY_TRADING_STATE_COMPLETED,
    INVENTORY_TRADING_STATE_COUNTDOWN, inventoryStore,
} from '#base/context/inventory';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { detectTradingNameScam, hasTradingNameScamMatches } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerInventoryTradingHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setTradingItems, setTradingNftItems, setTradingNftInventory, setTradingAccepts, setTradingState, setTradingNotice, setTradingNameScamWarning, setTradingSilverFee, setTradingSilver, stopTrading } = inventoryStore.getState();

    /** `IncomingMessages.isFurniExternalImage`: such an item never stacks with another. */
    const isExternalImage = (typeId: number) => systemStore.getState().wallItems[typeId]?.isExternalImage === true;

    return subscribeAll(subscribe, [
        on(TradingOpenEventMessage, (data) => {
            const { getUserByWebId } = roomStore.getState();
            const first = getUserByWebId(data.userId, RoomObjectUserType.User);
            const second = getUserByWebId(data.otherUserId, RoomObjectUserType.User);

            // Flash gives up when either user is missing from the room - it has no name to show.
            if (!first || !second) return;

            const one = { userId: data.userId, userName: first.name, canTrade: data.userCanTrade };
            const two = { userId: data.otherUserId, userName: second.name, canTrade: data.otherUserCanTrade };
            const ownIsSecond = data.otherUserId === userStore.getState().userId;

            const ownUser = ownIsSecond ? two : one;
            const otherUser = ownIsSecond ? one : two;

            startInventoryTrading(ownUser, otherUser);

            // `toggleInventorySubPage('trading')` with `toggleInventoryPage('furni')`.
            systemStore.getState().showWindow('inventory', { tab: 'furni' });

            // `detectNameScam`: the other user's name weighed against everyone else in the room and
            // every friend. Flash runs it whoever opened the trade
            // (`SHOW_NAME_SCAM_WARNING_FOR_SELF_INITIATED_TRADES`).
            const other = ownIsSecond ? first : second;
            const roomUserNames = Object.values(roomStore.getState().usersByRoomObjectId)
                .filter(user => (Number(user.userType) === Number(RoomObjectUserType.User)) && (user.webID !== ownUser.userId) && (user.webID !== otherUser.userId))
                .map(user => user.name)
                .filter(name => !!name);
            const friendNames = Object.values(userStore.getState().friends).map(friend => friend.name).filter(name => !!name);
            const result = detectTradingNameScam(otherUser.userName, roomUserNames, friendNames);

            if (hasTradingNameScamMatches(result)) {
                setTradingNameScamWarning({
                    tradedUserId: otherUser.userId,
                    tradedUserName: otherUser.userName,
                    tradedUserFigure: other.figure ?? '',
                    tradedUserGender: other.gender,
                    raisedAt: performance.now(),
                    ...result,
                });
            }
        }),

        on(TradingItemListEventMessage, (data) => {
            const { tradingOwnUser } = inventoryStore.getState();
            const firstIsOwn = data.firstUserID === tradingOwnUser.userId;
            const first = { groups: groupTradingItems(data.firstUserItemArray, isExternalImage), numItems: data.firstUserNumItems, numCredits: data.firstUserNumCredits };
            const second = { groups: groupTradingItems(data.secondUserItemArray, isExternalImage), numItems: data.secondUserNumItems, numCredits: data.secondUserNumCredits };

            setTradingItems(firstIsOwn ? first : second, firstIsOwn ? second : first);
            updateInventoryFurniLocks();
        }),

        // `TradingModel.updateNftItems`: the packet names the sides as "mine" and "theirs" already.
        on(TradeNftAssetsMessage, data => setTradingNftItems(data.myItems, data.theirItems)),

        on(TradeNftAssetInventoryMessage, data => setTradingNftInventory(data.items)),

        on(TradingAcceptEventMessage, data => setTradingAccepts(data.userId, data.userAccepts)),

        on(TradingConfirmationEventMessage, () => {
            setTradingState(INVENTORY_TRADING_STATE_COUNTDOWN);
            startTradingConfirmCountdown();
        }),

        on(TradingCompletedEventMessage, () => {
            setTradingState(INVENTORY_TRADING_STATE_COMPLETED);
            stopTrading();
            updateInventoryFurniLocks();
        }),

        on(TradingCloseEventMessage, (data) => {
            const { tradingActive } = inventoryStore.getState();

            // Flash drops a close for a trade it has already stopped.
            if (!tradingActive) return;

            const { getLocalizationValue, showAlert, config } = systemStore.getState();

            if (data.reason === INVENTORY_TRADING_CLOSE_REASON_COMMIT_ERROR) {
                if (config['trading.commiterror.enabled'] === true) {
                    showAlert(getLocalizationValue('inventory.trading.notification.commiterror.caption'), getLocalizationValue('inventory.trading.notification.commiterror.info'));
                }
            } else if (data.userId !== inventoryStore.getState().tradingOwnUser.userId) {
                showAlert(getLocalizationValue('inventory.trading.notification.title'), getLocalizationValue('inventory.trading.info.closed'));
            }

            setTradingState(INVENTORY_TRADING_STATE_CANCELLED);
            stopTrading();
            updateInventoryFurniLocks();
        }),

        on(TradingOtherNotAllowedEventMessage, () => setTradingNotice('other', 'inventory.trading.warning.others_account_disabled')),

        on(TradingYouAreNotAllowedEventMessage, () => setTradingNotice('own', 'inventory.trading.warning.own_account_disabled')),

        on(TradeSilverFeeMessage, data => setTradingSilverFee(data.silverFee)),

        on(TradeSilverSetMessage, data => setTradingSilver(data.playerSilver, data.otherPlayerSilver)),

        on(TradeOpenFailedEventPaserMessage, (data) => {
            const { getLocalizationValue, showAlert } = systemStore.getState();

            if (INVENTORY_TRADING_OPEN_FAIL_ALREADY_OPEN.includes(data.reason)) {
                showAlert(getLocalizationValue('inventory.trading.notification.title'), getLocalizationValue('inventory.trading.info.already_open'));

                return;
            }

            showAlert(getLocalizationValue('inventory.trading.openfail.caption'), getLocalizationValue(`inventory.trading.openfail.${data.reason}`, '', { otherusername: data.otherUserName }));
        }),
    ]);
};
