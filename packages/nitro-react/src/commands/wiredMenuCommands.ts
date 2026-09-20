/**
 * The wired menu's controller and its three plain tabs - `WiredMenuController` (the view's
 * life, tab selection, play test mode, the menu's error notifications), `WiredMenuMonitorTab`,
 * `WiredMenuSettingsTab` and `WiredMenuChestsTab`. The inspection and variable overview tabs are
 * in `wiredMenuInspectionCommands.ts` / `wiredMenuOverviewCommands.ts`, the room log window in
 * `wiredRoomLogsCommands.ts`. The state is `WiredMenuSlice`.
 *
 * Flash's tabs poll in `update()` every frame and compare `getTimer()` with their last request;
 * here the tab's view ticks `pollWiredMenuTab` while it is up and the same comparisons are made.
 *
 * Play test mode reaches the room through `RoomSessionSlice.playTestMode` (`IRoomSession.playTestMode`):
 * `setWiredPlayTestMode` writes it on every call, as Flash's `setPlayTestMode` does before it
 * compares, and `bridgeWiredRoomLifecycle` on each new room. What reads it: the session's
 * controller level (`None` while testing), `useRoomObjectModify` / `useRoomObjectInteraction`
 * (`RoomObjectEventHandler.modifyRoomObject` / `changeRoomObjectState`) and the furni, pet and
 * rentable bot infostands' buttons.
 */
import type { IWiredErrorLogsError, IWiredTransactionLogList } from '@nitrodevco/nitro-packets';
import { GetExtendedProfileComposer, LockAllChestsComposer, ProgressTreasureHuntComposer, WiredClearErrorLogsComposer, WiredGetErrorLogsComposer, WiredGetRoomSettingsComposer, WiredGetRoomStatsComposer, WiredSetRoomSettingsComposer, WiredTransactionGetRoomLogsComposer, WiredTransactionLogListType, WiredUpdateRoomComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { WIRED_MENU_NOTIFIED_ERRORS, WIRED_MENU_TAB_CHESTS, WIRED_MENU_TAB_INSPECTION, WIRED_MENU_TAB_MONITOR, WIRED_MENU_TAB_OVERVIEW, WIRED_MENU_TABS, WIRED_ROOM_LOGS_FRAME_ID, WiredMenuWindowParams, WiredPreferences, wiredStore } from '#base/context/wired';

import { clearWiredInspectionHighlights, inspectWiredFurni, inspectWiredUser, pollWiredInspection, startViewingWiredInspection, stopViewingWiredInspection } from './wiredMenuInspectionCommands';
import { jumpToWiredVariableByName, pollWiredOverview, startViewingWiredOverview, stopViewingWiredOverview } from './wiredMenuOverviewCommands';
import { sendWiredPreferences, setWiredUiStyle } from './wiredPreferencesCommands';
import { openWiredRoomLogs } from './wiredRoomLogsCommands';

type Send = WebSocketConnection['send'];

/** `WiredMenuMonitorTab.POLL_MONITOR_MS`. */
const POLL_MONITOR_MS = 500;
/** `WiredMenuMonitorTab.CLEAR_LOGS_TIMEOUT`. */
const CLEAR_LOGS_TIMEOUT_MS = 4000;
/** `WiredMenuChestsTab.POLL_PREVIEW_MS`. */
const POLL_PREVIEW_MS = 20000;
/** `WiredMenuChestsTab._-E1S` - how long the chest buttons wait after a lock or unlock. */
const LOCK_TIMEOUT_MS = 500;
/** `WiredMenuChestsTab.TRANSACTIONS_PREVIEW_AMOUNT` / `TRANSACTIONS_FIRST_PAGE`. */
export const WIRED_CHESTS_PREVIEW_AMOUNT = 10;
const TRANSACTIONS_FIRST_PAGE = 1;
/** `TransactionConfig.PAGE_SIZE` - what "view in detail" asks the transaction log window for. */
const TRANSACTIONS_PAGE_SIZE = 25;

const notifyPlayTest = (key: string) => notificationStore.getState().addNotification(`\${${key}}`, 'info', 'icon_wired_notification_png', 'wiredmenu/open/settings');

/**
 * `WiredMenuView.initialize` - the first time the menu is shown in a room every tab is built,
 * and building the settings tab asks for the room's settings. Nothing else is asked for until a
 * tab is viewed.
 */
export const initializeWiredMenu = (send: Send) => {
    const { menuInitialized, patchWiredMenu } = wiredStore.getState();

    if (menuInitialized) return;

    patchWiredMenu({ menuInitialized: true });

    send(new WiredGetRoomSettingsComposer({}));
};

/** `WiredMenuView.selectTab` - an unknown or disabled tab is ignored. */
export const selectWiredMenuTab = (tabId: string) => {
    const config = WIRED_MENU_TABS.find(tab => tab.id === tabId);

    if (!config || !config.enabled) return;

    wiredStore.getState().patchWiredMenu({ menuActiveTab: tabId });
};

/**
 * The rest of `WiredMenuController.linkReceived`, once `showView` has put the menu up: the linked
 * tab is selected, and the link routed into it - `routeInspectionLink` inspects a furni (source 0)
 * or a user (source 1), pinned; `routeOverviewLink` jumps to a variable by name. Both only act
 * when the tab really is the active one afterwards. `wiredmenu/logs` asks for the room log, or
 * brings its window to the front when it is already up.
 */
export const routeWiredMenuLink = (send: Send, { tab, inspect, variableName, logs }: WiredMenuWindowParams) => {
    if (tab !== undefined) selectWiredMenuTab(tab);

    const activeTab = wiredStore.getState().menuActiveTab;

    if (inspect && (tab === WIRED_MENU_TAB_INSPECTION) && (activeTab === WIRED_MENU_TAB_INSPECTION)) {
        if (inspect.sourceType === 0) inspectWiredFurni(send, inspect.id, true);
        else if (inspect.sourceType === 1) inspectWiredUser(send, inspect.id, true);
    }

    if ((variableName !== undefined) && (tab === WIRED_MENU_TAB_OVERVIEW) && (activeTab === WIRED_MENU_TAB_OVERVIEW)) jumpToWiredVariableByName(send, variableName);

    if (logs) {
        if (wiredStore.getState().roomLogsVisible) systemStore.getState().bringWindowToFront(WIRED_ROOM_LOGS_FRAME_ID);
        else openWiredRoomLogs(send);
    }
};

/** `WiredMenuView.show` / `hide` - the window went on or off the desktop. */
export const setWiredMenuViewing = (menuViewing: boolean) => wiredStore.getState().patchWiredMenu({ menuViewing });

/** Whether `tabId` is being viewed: the window is up and the tab is the active one (`isViewing`). */
export const isViewingWiredMenuTab = (tabId: string): boolean => {
    const { menuViewing, menuActiveTab } = wiredStore.getState();

    return menuViewing && (menuActiveTab === tabId);
};

/**
 * `WiredMenuController.onWiredPermissions` / `REE_DISPOSED`: the view is disposed - the window
 * goes, the tabs forget everything and whatever they lit up in the room goes dark.
 */
export const disposeWiredMenu = () => {
    const { menuInitialized, resetWiredMenu } = wiredStore.getState();

    systemStore.getState().hideWindow('wired_menu');

    if (!menuInitialized) return;

    clearWiredInspectionHighlights();
    getRoom()?.objectHighLighter.clearVariableHolders();
    resetWiredMenu();
};

/** A tab's `startViewing`. */
export const startViewingWiredMenuTab = (send: Send, tabId: string) => {
    switch (tabId) {
        case WIRED_MENU_TAB_MONITOR: startViewingWiredMonitor(send); break;
        case WIRED_MENU_TAB_OVERVIEW: startViewingWiredOverview(send); break;
        case WIRED_MENU_TAB_INSPECTION: startViewingWiredInspection(send); break;
        case WIRED_MENU_TAB_CHESTS: startViewingWiredChests(send); break;
    }
};

/** A tab's `stopViewing`. */
export const stopViewingWiredMenuTab = (tabId: string) => {
    switch (tabId) {
        case WIRED_MENU_TAB_OVERVIEW: stopViewingWiredOverview(); break;
        case WIRED_MENU_TAB_INSPECTION: stopViewingWiredInspection(); break;
    }
};

/** A tab's `update` - its poll. */
export const pollWiredMenuTab = (send: Send, tabId: string) => {
    if (!isViewingWiredMenuTab(tabId)) return;

    switch (tabId) {
        case WIRED_MENU_TAB_MONITOR: pollWiredMonitor(send); break;
        case WIRED_MENU_TAB_OVERVIEW: pollWiredOverview(send); break;
        case WIRED_MENU_TAB_INSPECTION: pollWiredInspection(send); break;
        case WIRED_MENU_TAB_CHESTS: pollWiredChests(send); break;
    }
};

/**
 * `WiredMenuController.setPlayTestMode`. `notify` is the settings tab and `:playtest` changing it
 * (with a notification that links back to the settings), `save` also sends the preferences.
 */
export const setWiredPlayTestMode = (send: Send, playTestMode: boolean, notify: boolean = false, save: boolean = false) => {
    const state = wiredStore.getState();

    if (getRoom()) roomStore.getState().setPlayTestMode(playTestMode);

    if ((state.playTestMode === playTestMode) || !notify) return;

    state.setWiredPreferences({ playTestMode });

    notifyPlayTest(`wiredmenu.settings.preferences.notification.playtest.${playTestMode ? 'enabled' : 'disabled'}`);

    if (save) sendWiredPreferences(send);
};

/** `HabboUserDefinedRoomEvents.switchPlayTestMode` - the `:playtest` chat command. */
export const switchWiredPlayTestMode = (send: Send) => setWiredPlayTestMode(send, !wiredStore.getState().playTestMode, true, true);

/** `WiredMenuController.onControllerMessageEvent` - rights in a room while testing: a reminder that play test mode is on. */
export const onWiredYouAreController = () => {
    if (getRoom() && wiredStore.getState().playTestMode) notifyPlayTest('wiredmenu.settings.preferences.notification.playtest');
};

/** `WiredMenuController.onWiredMenuErrorEvent` - only the codes Flash lists are shown. */
export const onWiredMenuError = (errorCode: number) => {
    if (!WIRED_MENU_NOTIFIED_ERRORS.includes(errorCode)) return;

    notificationStore.getState().addNotification(`\${wiredmenu.error_message.${errorCode}}`, 'info', 'icon_wired_error_png');
};

/**
 * `WiredMenuSettingsTab.onPreferencesChanged` - a preference checkbox or the style menu changed.
 * Flash reads every widget back, sets the play test mode through `setPlayTestMode(value, true)`
 * and sends the lot.
 */
export const changeWiredMenuPreferences = (send: Send, changes: Partial<Pick<WiredPreferences, 'wiredMenuButton' | 'wiredInspectButton' | 'playTestMode' | 'showAllNotifications' | 'wiredUiStyle'>>) => {
    const state = wiredStore.getState();
    const { playTestMode, wiredUiStyle, ...rest } = changes;

    state.setWiredPreferences(rest);

    if (playTestMode !== undefined) setWiredPlayTestMode(send, playTestMode, true);
    if (wiredUiStyle !== undefined) setWiredUiStyle(wiredUiStyle);

    sendWiredPreferences(send);
};

/* ------------------------------------------------------------------ monitor */

const requestWiredMonitorData = (send: Send) => {
    wiredStore.getState().patchWiredMenu({ monitorRequestedAt: performance.now() });

    send(new WiredGetRoomStatsComposer({}));
    send(new WiredGetErrorLogsComposer({}));
};

/** `WiredMenuMonitorTab.startViewing` - the statistics and the error log are fetched afresh, behind the loading view. */
const startViewingWiredMonitor = (send: Send) => {
    wiredStore.getState().patchWiredMenu({ monitorStats: null, monitorErrors: null });

    requestWiredMonitorData(send);
};

/** `WiredMenuMonitorTab.update`. */
const pollWiredMonitor = (send: Send) => {
    if (wiredStore.getState().monitorRequestedAt < (performance.now() - POLL_MONITOR_MS)) requestWiredMonitorData(send);
};

/**
 * `WiredMenuMonitorTab.onClearButtonClicked`. The button stays disabled for `CLEAR_LOGS_TIMEOUT`;
 * Flash checks that when the next error log arrives or 500 ms after the timeout, whichever comes
 * first - the next poll, in practice - so it is timed here directly.
 */
export const clearWiredErrorLogs = (send: Send) => {
    const { patchWiredMenu } = wiredStore.getState();

    patchWiredMenu({ monitorClearing: true });

    send(new WiredClearErrorLogsComposer({}));

    setTimeout(() => wiredStore.getState().patchWiredMenu({ monitorClearing: false }), CLEAR_LOGS_TIMEOUT_MS);
};

/** `onClickMonitor` - a click on the panicking Frank's face is a step of the `wf15` treasure hunt, named by the bitmap. */
export const progressWiredMonitorTreasureHunt = (send: Send) => send(new ProgressTreasureHuntComposer({ huntId: 'wf15', token: 'wired_monitor_element2_png' }));

/** `ErrorDataTableObject.onLinkClicked` -> `onErrorLinkClicked`: the error's details, in `WiredErrorInfoView`. */
export const showWiredErrorInfo = (error: IWiredErrorLogsError | undefined) => wiredStore.getState().patchWiredMenu({ monitorErrorInfo: error });

/* ------------------------------------------------------------------ settings */

/** `WiredMenuSettingsTab.onPermissionsChanged` - one bit of either mask, saved at once. */
export const setWiredPermission = (send: Send, mask: 'modify' | 'read', level: number, selected: boolean) => {
    const { settingsModifyMask, settingsReadMask, settingsTimezone, patchWiredMenu } = wiredStore.getState();
    const bit = (1 << level);
    const current = (mask === 'modify') ? settingsModifyMask : settingsReadMask;
    const next = selected ? (current | bit) : (current & ~bit);
    const modifyPermissionMask = (mask === 'modify') ? next : settingsModifyMask;
    const readPermissionMask = (mask === 'read') ? next : settingsReadMask;

    patchWiredMenu({ settingsModifyMask: modifyPermissionMask, settingsReadMask: readPermissionMask });

    send(new WiredSetRoomSettingsComposer({ modifyPermissionMask, readPermissionMask, timezone: settingsTimezone ?? '' }));
};

/** `WiredMenuSettingsTab.onSelectTimezone`. */
export const setWiredTimezone = (send: Send, timezone: string) => {
    const { settingsModifyMask, settingsReadMask, patchWiredMenu } = wiredStore.getState();

    patchWiredMenu({ settingsTimezone: timezone });

    send(new WiredSetRoomSettingsComposer({ modifyPermissionMask: settingsModifyMask, readPermissionMask: settingsReadMask, timezone }));
};

/** `WiredMenuSettingsTab.onClickReload` - the room's wired is reloaded, no questions asked. */
export const reloadWiredRoom = (send: Send) => send(new WiredUpdateRoomComposer({ rollback: false }));

/**
 * `WiredMenuSettingsTab.onClickRollback` - after a confirmation, the room goes back to how it
 * was at the last reload. Flash paints the confirmation's title bar red (`titleBarColor`); the
 * system dialogs have one look.
 */
export const rollbackWiredRoom = (send: Send) => {
    const { showConfirm, interpolate } = systemStore.getState();

    showConfirm(interpolate('${wiredmenu.settings.room_state.roll_back}'), interpolate('${wiredmenu.settings.room_state.roll_back.warning}'), () => send(new WiredUpdateRoomComposer({ rollback: true })));
};

/* ------------------------------------------------------------------ chests */

const requestWiredChestsPreview = (send: Send) => {
    wiredStore.getState().patchWiredMenu({ chestsRequestedAt: performance.now() });

    send(new WiredTransactionGetRoomLogsComposer({ pageSize: WIRED_CHESTS_PREVIEW_AMOUNT, page: TRANSACTIONS_FIRST_PAGE }));
};

/** `WiredMenuChestsTab.startViewing`. */
const startViewingWiredChests = (send: Send) => {
    wiredStore.getState().patchWiredMenu({ chestsPreview: null });

    requestWiredChestsPreview(send);
};

/** `WiredMenuChestsTab.update` - the preview every 20 s, and the chest buttons back once a lock has had its time. */
const pollWiredChests = (send: Send) => {
    const { chestsRequestedAt, chestsLockPending, chestsLockAt, chestsPreview, patchWiredMenu } = wiredStore.getState();
    const now = performance.now();

    if (chestsRequestedAt < (now - POLL_PREVIEW_MS)) requestWiredChestsPreview(send);

    if ((chestsPreview !== null) && chestsLockPending && (chestsLockAt < (now - LOCK_TIMEOUT_MS))) patchWiredMenu({ chestsLockPending: false });
};

/** `WiredMenuChestsTab.onLogListResults` - only the first page of the room's log at the preview's size is the preview. */
export const onWiredChestsTransactionLogs = (logs: IWiredTransactionLogList) => {
    if ((logs.amount !== WIRED_CHESTS_PREVIEW_AMOUNT) || (logs.currentPage !== TRANSACTIONS_FIRST_PAGE) || (Number(logs.logListType) !== Number(WiredTransactionLogListType.Room))) return;

    wiredStore.getState().patchWiredMenu({ chestsPreview: logs.logs });
};

/** `startLockTimeout`. */
const startWiredChestsLockTimeout = () => wiredStore.getState().patchWiredMenu({ chestsLockPending: true, chestsLockAt: performance.now() });

/** `onLockChestsClick` / `onUnlockChestsClick` - the user's own chests in this room. */
export const lockOwnWiredChests = (send: Send, lock: boolean) => {
    send(new LockAllChestsComposer({ lock, all: false }));

    startWiredChestsLockTimeout();
};

/** `onLockAllChestsClick` - every chest in the room, after a confirmation. */
export const lockAllWiredChests = (send: Send) => {
    const { showConfirm, interpolate } = systemStore.getState();

    showConfirm(interpolate('${wiredmenu.chests.chest_control.lock_all.warning.title}'), interpolate('${wiredmenu.chests.chest_control.lock_all.warning.desc}'), () => {
        send(new LockAllChestsComposer({ lock: true, all: true }));

        startWiredChestsLockTimeout();
    });
};

/** `onViewInDetailClick` - the room's transaction log, in the transaction log window. */
export const viewWiredChestsLogsInDetail = (send: Send) => send(new WiredTransactionGetRoomLogsComposer({ pageSize: TRANSACTIONS_PAGE_SIZE, page: 1 }));

/** `TransactionPreviewTableObject.onClickUsername` and the other name links of the menu's tables: the user's profile. */
export const openWiredUserProfile = (send: Send, userId: number) => send(new GetExtendedProfileComposer({ userId, openProfile: true }));
