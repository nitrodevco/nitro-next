/**
 * The wired chest - Flash `wired_trading/chests/WiredChestController` with the state of its two
 * sub controllers (`FurniChestSubController`'s storages, `CoinChestSubController`'s balance) and
 * of the windows `WiredChestWrapperView` opens over the chest (settings, notification settings,
 * capacity upgrade).
 *
 * The chest's own options (name, description, lock, capacity, access, ...) are not packet data:
 * Flash reads them from the chest furni's map stuff data every time it draws. `chestFurni` is
 * that read, taken when the window opens and again on each of Flash's `REOE_UPDATED` for the
 * viewed chest (a data update of that furni), so the window draws from the store.
 *
 * The reference server (turbo-cloud) implements none of the chest packets; Flash's behaviour is
 * the specification.
 */
import type { IChestStorage } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

import { EMPTY_WIRED_CHEST_ITEM_GROUPS, initializeWiredChestItemGroups, updateWiredChestItemGroups, WiredChestItemGroups } from '#base/utils';

/** Flash `wired_trading/chests/§_-He§`: which sub controller shows a chest. */
export const WIRED_CHEST_TYPE_FURNI = 0;
export const WIRED_CHEST_TYPE_COIN = 1;

/** `WiredChestController.STATUS_*`. */
export const WIRED_CHEST_STATUS_CLOSED = 0;
export const WIRED_CHEST_STATUS_OPENING = 1;
export const WIRED_CHEST_STATUS_OPEN = 2;

/** The keys of the chest furni's map stuff data - `WiredChestWrapperView`'s constants plus the notification ones `ChestNotificationSettingsUI` reads. */
export const WIRED_CHEST_KEY_LOCKED = 'locked';
export const WIRED_CHEST_KEY_AUTO_LOCK = 'auto_lock';
export const WIRED_CHEST_KEY_CAPACITY = 'capacity';
export const WIRED_CHEST_KEY_CONTENTS_COUNT = 'contents_count';
export const WIRED_CHEST_KEY_CAPACITY_LEVEL = 'capacity_level';
export const WIRED_CHEST_KEY_NAME = 'chest_name';
export const WIRED_CHEST_KEY_DESC = 'chest_desc';
export const WIRED_CHEST_KEY_EVERYONE_CAN_OPEN = 'everyone_can_open';
export const WIRED_CHEST_KEY_EVERYONE_CAN_DONATE = 'everyone_can_donate';
export const WIRED_CHEST_KEY_STATE_CONTROL_MODE = 'state_control_mode';
export const WIRED_CHEST_KEY_IS_WIRED_ENABLED = 'is_wired_enabled';
export const WIRED_CHEST_KEY_NOTIFY_MODE = 'notify_mode';
export const WIRED_CHEST_KEY_PREVIEW_MODE = 'preview_mode';
export const WIRED_CHEST_KEY_PREVIEW_AMOUNT = 'preview_amount';
export const WIRED_CHEST_KEY_NOTIFICATION_CHEST_FULL = 'notification_chest_full';
export const WIRED_CHEST_KEY_NOTIFICATION_DONATION = 'notification_donation';
export const WIRED_CHEST_KEY_NOTIFICATION_WITHDRAWS = 'notification_someone_withdraws';
export const WIRED_CHEST_KEY_NOTIFICATION_CHEST_EMPTY = 'notification_chest_empty';
export const WIRED_CHEST_KEY_NOTIFICATION_WIRED_TRANSACTION = 'notification_wired_transaction';

/** What `WiredChestWrapperView.show` is given: the chest, its sub controller and who is looking. */
export interface WiredChestView {
    chestId: number;
    chestType: number;
    /** `§_-y1G§`: the viewer owns the chest furni. */
    isOwner: boolean;
    /** `§_-I2M§`: the viewer owns the room. */
    isRoomOwner: boolean;
}

/** What `WiredChestWrapperView` reads off the chest furni: its map stuff data, type and owner. */
export interface WiredChestFurniData {
    data: Record<string, string>;
    furniTypeId: number;
    ownerId: number;
}

/** `ChestSettingsUI.onEdit`'s arguments that are not read from the furni again. */
export interface WiredChestSettingsRequest {
    chestId: number;
    chestType: number;
    /** The chest furni's type id - the wired upgrade confirmation renders it. */
    furniTypeId: number;
    isStarterChest: boolean;
}

/** `ChestNotificationSettingsUI.onEdit`'s arguments that are not read from the furni again. */
export interface WiredChestNotificationSettingsRequest {
    chestId: number;
    chestType: number;
}

/** `WiredChestUpgradeConfirmationView.initialize`. */
export interface WiredChestUpgradeRequest {
    chestId: number;
    chestType: number;
    furniTypeId: number;
    /** `capacity_level` when the window opened. */
    capacityLevel: number;
}

type State = {
    chestStatus: number;
    /** `§_-r1r§`: the chest asked for with `OpenChestAndGetContents`, 0 once it opened. */
    chestRequestedId: number;
    /** `§_-d1n§`: the chest the server has open for us - the one `CloseChest` is sent for. */
    chestActiveId: number;
    /** The chest window, while it is up. */
    chestView: WiredChestView | undefined;
    /** `FurniChestSubController._storages` while the chunks come in, before they are grouped. */
    chestLoadingStorages: IChestStorage[];
    /** `FurniChestSubController._storages`, grouped as `FurniChestView` shows them. */
    chestItems: IChestStorage[];
    chestItemGroups: WiredChestItemGroups;
    /** `CoinChestSubController.§_-XS§`. */
    chestCoins: number;
    /** The viewed chest furni's data, as last read. */
    chestFurni: WiredChestFurniData | undefined;
    chestSettings: WiredChestSettingsRequest | undefined;
    chestNotificationSettings: WiredChestNotificationSettingsRequest | undefined;
    chestUpgrade: WiredChestUpgradeRequest | undefined;
};

type Actions = {
    /** `open`: remember which chest was asked for. */
    setChestRequested: (chestId: number) => void;
    setChestOpening: (chestId: number) => void;
    /** `setOpenStatus` - the window itself is shown with `showChestView`. */
    setChestOpen: (chestId: number) => void;
    setChestClosed: () => void;
    /** `WiredChestWrapperView.show`: a different sub controller than before is cleared, and the chest's other windows close. */
    showChestView: (view: WiredChestView) => void;
    /** `WiredChestWrapperView.hide` minus the `CloseChest` packet, which the command sends. */
    hideChestView: () => void;
    /** `onItemsChunk` fragment 0. */
    startChestItems: () => void;
    appendChestItems: (storages: IChestStorage[]) => void;
    /** The last fragment: `itemsInitialize`. */
    initializeChestItems: () => void;
    /** `onItemsUpdated`. */
    updateChestItems: (removedIds: number[], added: IChestStorage[]) => void;
    setChestCoins: (coins: number) => void;
    setChestFurni: (furni: WiredChestFurniData | undefined) => void;
    setChestSettings: (request: WiredChestSettingsRequest | undefined) => void;
    setChestNotificationSettings: (request: WiredChestNotificationSettingsRequest | undefined) => void;
    setChestUpgrade: (request: WiredChestUpgradeRequest | undefined) => void;
};

export const WiredChestSliceInitialState: State = {
    chestStatus: WIRED_CHEST_STATUS_CLOSED,
    chestRequestedId: 0,
    chestActiveId: 0,
    chestView: undefined,
    chestLoadingStorages: [],
    chestItems: [],
    chestItemGroups: EMPTY_WIRED_CHEST_ITEM_GROUPS,
    chestCoins: 0,
    chestFurni: undefined,
    chestSettings: undefined,
    chestNotificationSettings: undefined,
    chestUpgrade: undefined,
};

export type WiredChestSlice = State & Actions;

/** `AbstractChestSubController.clear` for both sub controllers. */
const clearedContents: Pick<State, 'chestItems' | 'chestItemGroups' | 'chestCoins'> = {
    chestItems: [],
    chestItemGroups: EMPTY_WIRED_CHEST_ITEM_GROUPS,
    chestCoins: 0,
};

export const createWiredChestSlice: StateCreator<WiredChestSlice, [], [], WiredChestSlice> = set => ({
    ...WiredChestSliceInitialState,
    setChestRequested: chestRequestedId => set({ chestRequestedId }),
    setChestOpening: chestActiveId => set({ chestRequestedId: 0, chestActiveId, chestStatus: WIRED_CHEST_STATUS_OPENING }),
    setChestOpen: chestActiveId => set({ chestRequestedId: 0, chestActiveId, chestStatus: WIRED_CHEST_STATUS_OPEN }),
    setChestClosed: () => set({ chestActiveId: 0, chestStatus: WIRED_CHEST_STATUS_CLOSED }),
    showChestView: view => set((x) => {
        const previous = x.chestView;

        if (!previous || (previous.chestType === view.chestType)) return { chestView: view };

        // The other sub controller's contents go, and so do the windows opened over its chest.
        return {
            chestView: view,
            ...((previous.chestType === WIRED_CHEST_TYPE_FURNI) ? { chestItems: [], chestItemGroups: EMPTY_WIRED_CHEST_ITEM_GROUPS } : { chestCoins: 0 }),
            chestSettings: undefined,
            chestNotificationSettings: undefined,
        };
    }),
    hideChestView: () => set({ chestView: undefined, chestFurni: undefined, ...clearedContents, chestSettings: undefined, chestNotificationSettings: undefined }),
    startChestItems: () => set({ chestLoadingStorages: [], ...clearedContents }),
    appendChestItems: storages => set(x => ({ chestLoadingStorages: [ ...x.chestLoadingStorages, ...storages ] })),
    initializeChestItems: () => set(x => ({
        chestItems: x.chestLoadingStorages,
        chestItemGroups: initializeWiredChestItemGroups(x.chestLoadingStorages, x.chestItemGroups.nextKey),
        chestLoadingStorages: [],
    })),
    updateChestItems: (removedIds, added) => set((x) => {
        const removedSet = new Set(removedIds);
        const kept: IChestStorage[] = [];
        const removed: IChestStorage[] = [];
        const known = new Set<number>();

        for (const storage of x.chestItems) {
            if (removedSet.has(storage.inventoryId)) {
                removed.push(storage);
            } else {
                kept.push(storage);
                known.add(storage.inventoryId);
            }
        }

        const reallyAdded: IChestStorage[] = [];

        for (const storage of added) {
            if (known.has(storage.inventoryId)) continue;

            reallyAdded.push(storage);
            kept.push(storage);
            known.add(storage.inventoryId);
        }

        return { chestItems: kept, chestItemGroups: updateWiredChestItemGroups(x.chestItemGroups, removed, reallyAdded) };
    }),
    setChestCoins: chestCoins => set({ chestCoins }),
    setChestFurni: chestFurni => set({ chestFurni }),
    setChestSettings: chestSettings => set({ chestSettings }),
    setChestNotificationSettings: chestNotificationSettings => set({ chestNotificationSettings }),
    setChestUpgrade: chestUpgrade => set({ chestUpgrade }),
});
