/**
 * The wired menu ("wired creator tools") - what `WiredMenuController` and its `WiredMenuView`
 * keep while the view exists, plus the three simplest tabs: `WiredMenuMonitorTab`,
 * `WiredMenuSettingsTab` and `WiredMenuChestsTab`. The inspection and variable overview tabs have
 * slices of their own (`WiredMenuInspectionSlice`, `WiredMenuOverviewSlice`).
 *
 * Flash builds the view the first time the menu is shown in a room and keeps it, tabs and all,
 * until the room goes (`REE_DISPOSED`) or `WiredPermissions` takes the read permission away;
 * closing the window only takes it off the desktop. So everything here is per-room state, reset
 * with the room, and survives the window being closed and reopened.
 *
 * `WiredMenuErrorMessageParser`'s eight codes are mirrored whole below. The client acts on two
 * of them only; the rest are named after their obfuscated constants.
 */
import type { IWiredErrorLogsError, IWiredRoomStatsData, IWiredTransactionInfo } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredMenuTabConfigs.TAB_*_ID`, in the order `WiredMenuTabConfigs.menuTabs` lists them. */
export const WIRED_MENU_TAB_MONITOR = 'monitor';
export const WIRED_MENU_TAB_OVERVIEW = 'variable_overview';
export const WIRED_MENU_TAB_INSPECTION = 'inspection';
export const WIRED_MENU_TAB_CHESTS = 'chests';
export const WIRED_MENU_TAB_SETTINGS = 'settings';
export const WIRED_MENU_TAB_INFO = 'info';

/** `WiredMenuTabConfig` - `isCreateImmediately` and `isReusable` are `true` for every tab, so only `isEnabled` tells them apart. */
export interface WiredMenuTabConfig {
    id: string;
    /** `isEnabled`: the info tab is built but disabled, so its button is hidden and the others share its width. */
    enabled: boolean;
}

export const WIRED_MENU_TABS: readonly WiredMenuTabConfig[] = [
    { id: WIRED_MENU_TAB_MONITOR, enabled: true },
    { id: WIRED_MENU_TAB_OVERVIEW, enabled: true },
    { id: WIRED_MENU_TAB_INSPECTION, enabled: true },
    { id: WIRED_MENU_TAB_CHESTS, enabled: true },
    { id: WIRED_MENU_TAB_SETTINGS, enabled: true },
    { id: WIRED_MENU_TAB_INFO, enabled: false },
];

/** `WiredMenuErrorMessageParser._-Sj`: `WiredMenuInspectionTab` drops a fetch that is still waiting when it arrives. */
export const WIRED_MENU_ERROR_INSPECTION_FAILED = 0;
/** `_-71O`. */
export const WIRED_MENU_ERROR_1 = 1;
/** `_-u1r`. */
export const WIRED_MENU_ERROR_2 = 2;
/** `_-z15`. */
export const WIRED_MENU_ERROR_3 = 3;
/** `_-H1j`. */
export const WIRED_MENU_ERROR_4 = 4;
/** `_-61J`. */
export const WIRED_MENU_ERROR_5 = 5;
/** `_-P2h`. */
export const WIRED_MENU_ERROR_6 = 6;
/** `_-s1D`: the one code `WiredMenuController.SHOW_NOTIFICATION_FOR_ERROR` lists - shown as `wiredmenu.error_message.7`. */
export const WIRED_MENU_ERROR_NOTIFIED = 7;

/** `WiredMenuController.SHOW_NOTIFICATION_FOR_ERROR`. */
export const WIRED_MENU_NOTIFIED_ERRORS: readonly number[] = [ WIRED_MENU_ERROR_NOTIFIED ];

/** `WiredMenuSettingsTab.MODIFY_PERMISSION_OPTIONS` / `READ_PERMISSION_OPTIONS`: the bits of the two masks, `1 << level`. */
export const WIRED_MODIFY_PERMISSION_LEVELS: readonly number[] = [ 1, 2, 3 ];
export const WIRED_READ_PERMISSION_LEVELS: readonly number[] = [ 0, 1, 2, 3 ];

type State = {
    /** The view has been built in this room: `initializeTabs` ran and the settings tab asked for the room's settings. */
    menuInitialized: boolean;
    /** `WiredMenuView._-WO` - the selected tab; the first enabled one until another is picked. */
    menuActiveTab: string;
    /** `_-U24` - the window is on the desktop, so the active tab is being viewed. */
    menuViewing: boolean;

    /** `WiredMenuMonitorTab._-11N`, `null` while loading. */
    monitorStats: IWiredRoomStatsData | null;
    /** `_-M2G`, `null` while loading. */
    monitorErrors: IWiredErrorLogsError[] | null;
    /** The clear button waits out `CLEAR_LOGS_TIMEOUT` after a press. */
    monitorClearing: boolean;
    /** `WiredErrorInfoView`: the error whose details are up, from a click on its type. */
    monitorErrorInfo: IWiredErrorLogsError | undefined;
    /** `_-S2L` - `performance.now()` of the last stats request, for the 500 ms poll. */
    monitorRequestedAt: number;

    /** `WiredMenuSettingsTab._-K1T` / `_-G2l` / `_-R13`: -1 / -1 / `null` until `WiredRoomSettings` arrives. */
    settingsModifyMask: number;
    settingsReadMask: number;
    settingsTimezone: string | null;

    /** `WiredMenuChestsTab._-D1I`, `null` while loading. */
    chestsPreview: IWiredTransactionInfo[] | null;
    /** `_-21g`: the chest buttons stay disabled for `_-E1S` after a lock or unlock. */
    chestsLockPending: boolean;
    /** `_-F1z` / `_-S2L` - when the last lock went out and the preview was last asked for. */
    chestsLockAt: number;
    chestsRequestedAt: number;
};

type Actions = {
    patchWiredMenu: (patch: Partial<State>) => void;
};

export const WiredMenuSliceInitialState: State = {
    menuInitialized: false,
    menuActiveTab: WIRED_MENU_TAB_MONITOR,
    menuViewing: false,
    monitorStats: null,
    monitorErrors: null,
    monitorClearing: false,
    monitorErrorInfo: undefined,
    monitorRequestedAt: 0,
    settingsModifyMask: -1,
    settingsReadMask: -1,
    settingsTimezone: null,
    chestsPreview: null,
    chestsLockPending: false,
    chestsLockAt: 0,
    chestsRequestedAt: 0,
};

export type WiredMenuSlice = State & Actions;

export const createWiredMenuSlice: StateCreator<WiredMenuSlice, [], [], WiredMenuSlice> = set => ({
    ...WiredMenuSliceInitialState,
    patchWiredMenu: patch => set(patch),
});
