/**
 * The habbicon controller's packets - Flash `HabbiconController.initComponent`, which subscribes
 * only when `habbicons.enabled` is on (and then also starts `HabbiconAssetManager.preload`):
 *
 * - `UserHabbicons` (`onUserHabbicons`): the owned list is replaced. Once a list has been seen,
 *   a habbicon that is new in a stored state, or one that went from claimable to owned, is
 *   `handleNewOwnedHabbicon`'d: marked unseen and announced with a `habbicon_received` bubble
 *   (`notification.new.habbicon`, its preview as the icon, `habbicons/open` on click).
 * - `UserHabbiconStatusChanged`: one habbicon's state; a stored state keeps it (a new one, or a
 *   claimed one, is announced), any other drops it, and the shop data follows
 *   (`updateCachedShopItemState`).
 * - `HabbiconShopData`, `HabbiconInfo`: the shop's sets, one shop habbicon.
 * - `RoomUseHabbicon`: Flash dispatches `hce_room_use_habbicon`, and `RoomUI.onRoomUseHabbicon`
 *   plays the habbicon over the user (`updateObjectUserAction(..., "figure_habbicon", id)`); that
 *   listener is folded in here. The avatar logic writes the `figure_habbicon*` variables and spins
 *   the spinning duck, but nothing draws the habbicon yet: `HabbiconBubble` (the avatar
 *   visualization's stacked addition) is not ported - see `AvatarVisualization.ADDITION_ID_HABBICON_BUBBLE`.
 * - `PurchaseOK` / `PurchaseError` / `PurchaseNotAllowed`: after a buy or claim of the
 *   controller's own (`_pendingPurchaseRefresh`), an OK closes the purchase confirmation and asks
 *   for the shop data again; a failure lets the confirmation be pressed again after its delay.
 *
 * The server this client talks to (turbo-cloud) has every habbicon packet as an empty stub.
 */
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { HabbiconInfoMessage, HabbiconShopDataMessage, PurchaseErrorMessage, PurchaseNotAllowedMessage, PurchaseOKMessage, RoomUseHabbiconMessage, UserHabbiconsMessage, UserHabbiconStatusChangedMessage } from '@nitrodevco/nitro-packets';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

import { closeHabbiconPurchaseConfirmation, getHabbiconShopData, habbiconPreviewAssetName, habbiconsEnabled, loadHabbiconAssets } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { habbiconsStore, isClaimedHabbiconTransition, isStoredHabbiconState } from '#base/context/habbicons';
import { notificationStore } from '#base/context/notifications';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `showNewHabbiconNotification`: the name the asset manager's key resolves to (else the id), and
 * the preview when it has loaded - Flash passes a null bitmap then too.
 */
const showNewHabbiconNotification = (habbiconId: number) => {
    const { getLocalizationValue } = systemStore.getState();
    const { nameKeys, previews } = habbiconsStore.getState();
    const nameKey = nameKeys[habbiconId];
    const name = (nameKey && nameKey.length) ? getLocalizationValue(`habbicon_${nameKey}_name`, nameKey) : habbiconId.toString();
    const text = getLocalizationValue('notification.new.habbicon', '', { habbicon_name: name });
    const image = (previews[habbiconId] && GetAssetManager().getTexture(habbiconPreviewAssetName(habbiconId))) ? habbiconPreviewAssetName(habbiconId) : undefined;

    notificationStore.getState().addNotification(text, 'habbicon_received', image, 'habbicons/open');
};

/** `handleNewOwnedHabbicon`. */
const handleNewOwnedHabbicon = (habbiconId: number) => {
    habbiconsStore.getState().addUnseenHabbicon(habbiconId);
    showNewHabbiconNotification(habbiconId);
};

export const registerHabbiconHandlers = ({ send, subscribe }: WebSocketConnection) => {
    if (!habbiconsEnabled()) return () => {};

    void loadHabbiconAssets();

    const { setOwnedHabbicons, setHabbiconStatus, setShopData, setShopItem, setPendingPurchaseRefresh, failHabbiconPurchase, notifyHabbiconChange } = habbiconsStore.getState();

    /** `onPurchaseFailed`. */
    const onPurchaseFailed = () => {
        if (!habbiconsStore.getState().pendingPurchaseRefresh) return;

        setPendingPurchaseRefresh(false);
        failHabbiconPurchase();
    };

    return subscribeAll(subscribe, [
        on(UserHabbiconsMessage, (data) => {
            const { hasLoadedOwnedHabbicons, ownedHabbicons: previous } = habbiconsStore.getState();
            const owned: Record<number, number> = {};
            const announced: number[] = [];

            for (const habbicon of data.habbicons) {
                const before = previous[habbicon.habbiconId];

                owned[habbicon.habbiconId] = habbicon.habbiconState;

                if (hasLoadedOwnedHabbicons && isStoredHabbiconState(habbicon.habbiconState) && ((before === undefined) || isClaimedHabbiconTransition(before, habbicon.habbiconState))) announced.push(habbicon.habbiconId);
            }

            setOwnedHabbicons(owned, data.recentHabbiconIds);

            for (const habbiconId of announced) handleNewOwnedHabbicon(habbiconId);

            notifyHabbiconChange('owned');
            notifyHabbiconChange('shop');
        }),

        on(UserHabbiconStatusChangedMessage, (data) => {
            const before = habbiconsStore.getState().ownedHabbicons[data.habbiconId];
            let announce = false;

            if (isStoredHabbiconState(data.habbiconState)) announce = (before === undefined) || isClaimedHabbiconTransition(before, data.habbiconState);

            setHabbiconStatus(data.habbiconId, data.habbiconState);

            // A new one and a claimed one are both announced, a claimed new one (Flash's `0` before) only once.
            if (announce) handleNewOwnedHabbicon(data.habbiconId);

            notifyHabbiconChange('status', data.habbiconId);
            notifyHabbiconChange('owned', data.habbiconId);
            notifyHabbiconChange('shop', data.habbiconId);
        }),

        on(HabbiconShopDataMessage, (data) => {
            setShopData(data.collections);
            notifyHabbiconChange('shop');
        }),

        on(HabbiconInfoMessage, (data) => {
            setShopItem(data.habbicon);
            notifyHabbiconChange('shop', data.habbicon.habbiconId, data.habbicon.collectionId);
        }),

        // `RoomUI.onRoomUseHabbicon`.
        on(RoomUseHabbiconMessage, (data) => {
            if ((data.roomIndex < 0) || (data.habbiconId <= 0)) return;

            getRoom()?.updateRoomObjectUserAction(data.roomIndex, RoomObjectVariableEnum.FigureHabbicon, data.habbiconId);
        }),

        // `onPurchaseOk`.
        on(PurchaseOKMessage, () => {
            if (!habbiconsStore.getState().pendingPurchaseRefresh) return;

            setPendingPurchaseRefresh(false);
            closeHabbiconPurchaseConfirmation();
            getHabbiconShopData(send, true);
        }),

        on(PurchaseErrorMessage, onPurchaseFailed),
        on(PurchaseNotAllowedMessage, onPurchaseFailed),
    ]);
};
