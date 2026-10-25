/**
 * The account's wired preferences and the room's wired permissions, the way
 * `WiredMenuController` keeps them: the preferences arrive in `AccountPreferences` and go back in
 * `WiredSetPreferences`; the permissions arrive in `WiredPermissions` whenever the room's masks
 * or the user's rights change.
 *
 * Neither is cleared on leaving a room - Flash keeps the last `WiredPermissions` until the next
 * one - which is harmless because the owner/staff test in `hasReadPermission` /
 * `hasWritePermission` (see `selectors/`) is always made against the current room.
 *
 * `playTestMode` starts `false` whatever the account says: `onAccountPreferences` calls
 * `setPlayTestMode(value)` without its `notify` flag, and that overload only hands the value to
 * the room session - `_playTestMode` itself changes through `:playtest` and the settings tab.
 */
import { StateCreator } from 'zustand';

/**
 * `UserDefinedRoomEventsCtrl.STYLE_DEFAULT`. The style registry (`#base/wired`) has the same
 * constant; the store keeps its own so that it does not import the wired barrel while loading -
 * that barrel reaches the element views, and they import this store.
 */
const STYLE_DEFAULT = 'illumina';

/** The preferences `WiredSetPreferencesComposer` sends, under the store's names. */
export interface WiredPreferences {
    wiredMenuButton: boolean;
    wiredInspectButton: boolean;
    playTestMode: boolean;
    wiredWhisperDisabled: boolean;
    showAllNotifications: boolean;
    /** `WiredMenuController.uiStyle` - the raw preference, `''` included. */
    wiredUiStyle: string;
}

type State = WiredPreferences & {
    /** `§_-F4§` - the style dialogs open in; follows `wiredUiStyle` only while `wired.ui_picker_enabled` is on. */
    preferredWiredStyle: string;
    /** `WiredPermissionsEventMessage.canModify` - `§_-eB§`. */
    wiredCanModify: boolean;
    /** `WiredPermissionsEventMessage.canRead` - `§_-Pe§`. */
    wiredCanRead: boolean;
};

type Actions = {
    setWiredPreferences: (preferences: Partial<WiredPreferences>) => void;
    setPreferredWiredStyle: (preferredWiredStyle: string) => void;
    setWiredPermissions: (wiredCanModify: boolean, wiredCanRead: boolean) => void;
};

export const WiredPreferencesSliceInitialState: State = {
    wiredMenuButton: false,
    wiredInspectButton: false,
    playTestMode: false,
    wiredWhisperDisabled: false,
    showAllNotifications: false,
    wiredUiStyle: STYLE_DEFAULT,
    preferredWiredStyle: STYLE_DEFAULT,
    wiredCanModify: false,
    wiredCanRead: false,
};

export type WiredPreferencesSlice = State & Actions;

export const createWiredPreferencesSlice: StateCreator<WiredPreferencesSlice, [], [], WiredPreferencesSlice> = set => ({
    ...WiredPreferencesSliceInitialState,
    setWiredPreferences: preferences => set(preferences),
    setPreferredWiredStyle: preferredWiredStyle => set({ preferredWiredStyle }),
    setWiredPermissions: (wiredCanModify, wiredCanRead) => set({ wiredCanModify, wiredCanRead }),
});
