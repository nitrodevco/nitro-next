/**
 * `WiredRoomLogsSlice`'s action: patching the room's wired log window. Read off the store once: a
 * component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredRoomLogs: state.patchWiredRoomLogs,
};

export const useWiredRoomLogsActions = () => actions;
