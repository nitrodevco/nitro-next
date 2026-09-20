/**
 * What the wired trading windows do when the room or the wired permissions change - not a packet
 * listener, hence not a `*Handlers`.
 *
 * - Flash's `REE_DISPOSED`: `WiredChestController` hides the chest window (telling the server the
 *   chest is closed), the two transaction controllers hide their windows,
 *   `WiredContractController.clear` closes the contract windows and `RewardNotificationController`
 *   drops its popups. All of that follows the room store's room changing.
 * - `WiredMenuController.onPermissionsChanged` -> `WiredChestController.onPermissionsChanged`: a
 *   viewer who may no longer read the chest loses its window unless it is open to everyone.
 */
import { checkWiredChestAccess, closeWiredChest } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { getWiredHasReadPermission, wiredStore } from '#base/context/wired';
import { wiredTradingStore } from '#base/context/wired-trading';

export const bridgeWiredTradingLifecycle = ({ send }: WebSocketConnection) => {
    const unsubscribeRoom = roomStore.subscribe((state, previous) => {
        if (!previous.room || (state.room === previous.room)) return;

        closeWiredChest(send);
        wiredTradingStore.getState().resetRoom();
    });

    const unsubscribePermissions = wiredStore.subscribe((state, previous) => {
        if ((state.wiredCanRead === previous.wiredCanRead) && (state.wiredCanModify === previous.wiredCanModify)) return;

        checkWiredChestAccess(send, getWiredHasReadPermission());
    });

    return () => {
        unsubscribeRoom();
        unsubscribePermissions();
    };
};
