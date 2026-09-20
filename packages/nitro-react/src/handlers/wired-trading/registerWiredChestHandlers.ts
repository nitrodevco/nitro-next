/**
 * The wired chest's packets - Flash `WiredChestController.onOpenChest`, the two sub controllers'
 * `CoinChestSubController.onCoinsMessage` and `FurniChestSubController.onItemsChunk` /
 * `onItemsUpdated`, `ChestSettingsUI` / `ChestNotificationSettingsUI.onUpdateSuccess` and
 * `WiredChestUpgradeConfirmationView.onUpgradeChestResult`.
 *
 * Also the controller's `REOE_REMOVED` / `REOE_UPDATED` listeners, as the furni packets that
 * cause them: the viewed chest leaving the room closes the window, and a change to its data
 * (the chest's options live in its map stuff data) redraws it or, when the viewer may no longer
 * read it, closes it. These run after the room's own furni handlers, so the model is current.
 *
 * The reference server (turbo-cloud) sends none of the chest packets; this follows Flash.
 */
import {
    ChestPreferencesUpdateSuccessMessage, CoinsChestContentsMessage, ItemsChestContentsChunkMessage, ItemsChestContentsUpdatedMessage, ObjectDataUpdateMessage, ObjectRemoveMessage, ObjectRemoveMultipleMessage,
    ObjectsDataUpdateMessage, ObjectUpdateMessage, OpenChestMessage, UpgradeChestResultMessage,
} from '@nitrodevco/nitro-packets';

import { checkWiredChestAccess, closeWiredChest, openWiredChest, readWiredChestFurniData, showWiredChest } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { getWiredHasReadPermission } from '#base/context/wired';
import { WIRED_CHEST_STATUS_OPEN, WIRED_CHEST_TYPE_COIN, WIRED_CHEST_TYPE_FURNI, wiredTradingStore } from '#base/context/wired-trading';

import { on, subscribeAll } from '../packetSubscriptions';

/** `UpgradeChestResultMessageParser.SUCCESS`. */
const UPGRADE_RESULT_SUCCESS = 0;

export const registerWiredChestHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setChestOpening, setChestCoins, startChestItems, appendChestItems, initializeChestItems, updateChestItems, setChestFurni, setChestSettings, setChestNotificationSettings, setChestUpgrade } = wiredTradingStore.getState();
    const { addNotification } = notificationStore.getState();

    /** `roomObjectUpdatedHandler`. */
    const viewedChestUpdated = (objectId: number) => {
        const { chestView, chestStatus } = wiredTradingStore.getState();

        if (!chestView || (chestView.chestId !== objectId) || (chestStatus !== WIRED_CHEST_STATUS_OPEN)) return;

        setChestFurni(readWiredChestFurniData(objectId));
        checkWiredChestAccess(send, getWiredHasReadPermission());
    };

    /** `roomObjectRemovedHandler`. */
    const viewedChestRemoved = (objectId: number) => {
        const { chestView, chestStatus } = wiredTradingStore.getState();

        if (!chestView || (chestView.chestId !== objectId) || (chestStatus !== WIRED_CHEST_STATUS_OPEN)) return;

        closeWiredChest(send);
    };

    return subscribeAll(subscribe, [
        on(OpenChestMessage, data => openWiredChest(send, data.chestId)),

        on(CoinsChestContentsMessage, (data) => {
            const { chestActiveId, chestRequestedId } = wiredTradingStore.getState();

            if (data.isUpdate) {
                if (chestActiveId !== data.chestId) return;

                setChestCoins(data.coins);

                return;
            }

            if (chestRequestedId !== data.chestId) return;

            setChestCoins(data.coins);
            showWiredChest(send, data.chestId, WIRED_CHEST_TYPE_COIN);
        }),

        on(ItemsChestContentsChunkMessage, (data) => {
            if (data.fragmentNo === 0) {
                if (wiredTradingStore.getState().chestRequestedId !== data.chestId) return;

                startChestItems();
                setChestOpening(data.chestId);
            }

            appendChestItems(data.storageChunk);

            if (data.fragmentNo !== (data.totalFragments - 1)) return;

            showWiredChest(send, data.chestId, WIRED_CHEST_TYPE_FURNI);
            initializeChestItems();
        }),

        on(ItemsChestContentsUpdatedMessage, (data) => {
            const { chestActiveId, chestStatus } = wiredTradingStore.getState();

            if ((chestActiveId !== data.chestId) || (chestStatus !== WIRED_CHEST_STATUS_OPEN)) return;

            updateChestItems(data.removedIds, data.addedStorage);
        }),

        on(ChestPreferencesUpdateSuccessMessage, (data) => {
            const { chestSettings, chestNotificationSettings } = wiredTradingStore.getState();

            if (data.isNotificationPreferences) {
                if (chestNotificationSettings?.chestId === data.chestId) setChestNotificationSettings(undefined);
            } else if (chestSettings?.chestId === data.chestId) {
                setChestSettings(undefined);
            }
        }),

        on(UpgradeChestResultMessage, (data) => {
            const { getLocalizationValue } = systemStore.getState();

            if (data.resultCode === UPGRADE_RESULT_SUCCESS) {
                addNotification('${wiredchests.upgrade.result.success}', 'info');
            } else {
                const reasonKey = `wiredchests.upgrade.result.error.${data.resultCode}`;
                const reason = getLocalizationValue(reasonKey, reasonKey);

                addNotification(getLocalizationValue('wiredchests.upgrade.result.error', '', { reason }), 'info');
            }

            setChestUpgrade(undefined);
        }),

        on(ObjectDataUpdateMessage, data => viewedChestUpdated(data.objectId)),

        on(ObjectsDataUpdateMessage, (data) => {
            for (const item of data.stuffDatas) viewedChestUpdated(item.objectId);
        }),

        on(ObjectUpdateMessage, data => viewedChestUpdated(data.floorItem.objectId)),

        on(ObjectRemoveMessage, data => viewedChestRemoved(data.objectId)),

        on(ObjectRemoveMultipleMessage, (data) => {
            for (const objectId of data.objectIds) viewedChestRemoved(objectId);
        }),
    ]);
};
