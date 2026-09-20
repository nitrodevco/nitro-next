/**
 * The wired store - everything the Flash `HabboUserDefinedRoomEvents` component and its
 * controllers keep between packets, one slice per Flash class. An app-wide singleton: the setup
 * dialog, the wired menu and the room's click handling all read the same state, and packet
 * handlers write it without a window having to be open.
 *
 * `resetRoom` is what Flash does on `REE_DISPOSED` / `RSE_ENDED` / `CloseConnection`: the edit in
 * progress, the synchronized variables and the room's environment go; the clipboard, the
 * elements' own memory (`WiredElementMemorySlice`), the preferences, the permissions and the
 * dialog's position stay. A slice with per-room data
 * exports its `...RoomState` (or is listed whole) below - a new slice that is not listed keeps
 * its state across rooms.
 *
 * The wired menu's slices are per-room as a whole; `resetWiredMenu` puts back only them, which is
 * what `WiredPermissions` taking the read permission away does to the menu (Flash disposes its
 * view).
 */
import { createStore } from 'zustand';

import { createWiredClipboardSlice, WiredClipboardSlice } from './WiredClipboardSlice';
import { createWiredElementMemorySlice, WiredElementMemorySlice } from './WiredElementMemorySlice';
import { createWiredEnvironmentSlice, WiredEnvironmentSlice, WiredEnvironmentSliceRoomState } from './WiredEnvironmentSlice';
import { createWiredMenuInspectionSlice, WiredMenuInspectionSlice, WiredMenuInspectionSliceInitialState } from './WiredMenuInspectionSlice';
import { createWiredMenuOverviewSlice, WiredMenuOverviewSlice, WiredMenuOverviewSliceInitialState } from './WiredMenuOverviewSlice';
import { createWiredMenuSlice, WiredMenuSlice, WiredMenuSliceInitialState } from './WiredMenuSlice';
import { createWiredPreferencesSlice, WiredPreferencesSlice } from './WiredPreferencesSlice';
import { createWiredRoomLogsSlice, WiredRoomLogsSlice, WiredRoomLogsSliceInitialState } from './WiredRoomLogsSlice';
import { createWiredSetupSlice, WiredSetupSlice, WiredSetupSliceRoomState } from './WiredSetupSlice';
import { createWiredVariableManagementSlice, WiredVariableManagementSlice, WiredVariableManagementSliceInitialState } from './WiredVariableManagementSlice';
import { createWiredVariablesSlice, WiredVariablesSlice, WiredVariablesSliceInitialState } from './WiredVariablesSlice';

type Actions = {
    resetRoom: () => void;
    resetWiredMenu: () => void;
};

export type WiredStore = Actions & WiredSetupSlice & WiredElementMemorySlice & WiredClipboardSlice & WiredVariablesSlice & WiredEnvironmentSlice & WiredPreferencesSlice
    & WiredMenuSlice & WiredMenuInspectionSlice & WiredMenuOverviewSlice & WiredRoomLogsSlice & WiredVariableManagementSlice;

/** A fresh copy of the wired menu's state - its view, its tabs and the windows it opens. */
const freshWiredMenuState = (): Partial<WiredStore> => structuredClone({
    ...WiredMenuSliceInitialState,
    ...WiredMenuInspectionSliceInitialState,
    ...WiredMenuOverviewSliceInitialState,
    ...WiredRoomLogsSliceInitialState,
    ...WiredVariableManagementSliceInitialState,
});

/** A fresh copy of every slice's per-room state. */
const freshRoomState = (): Partial<WiredStore> => structuredClone({
    ...WiredSetupSliceRoomState,
    ...WiredVariablesSliceInitialState,
    ...WiredEnvironmentSliceRoomState,
    ...freshWiredMenuState(),
});

export const createWiredStore = () => createStore<WiredStore>()((set, get, store) => ({
    resetRoom: () => set(freshRoomState()),
    resetWiredMenu: () => set(freshWiredMenuState()),
    ...createWiredSetupSlice(set, get, store),
    ...createWiredElementMemorySlice(set, get, store),
    ...createWiredClipboardSlice(set, get, store),
    ...createWiredVariablesSlice(set, get, store),
    ...createWiredEnvironmentSlice(set, get, store),
    ...createWiredPreferencesSlice(set, get, store),
    ...createWiredMenuSlice(set, get, store),
    ...createWiredMenuInspectionSlice(set, get, store),
    ...createWiredMenuOverviewSlice(set, get, store),
    ...createWiredRoomLogsSlice(set, get, store),
    ...createWiredVariableManagementSlice(set, get, store),
}));

export const wiredStore = createWiredStore();
