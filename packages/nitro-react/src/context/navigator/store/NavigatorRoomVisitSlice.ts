import { StateCreator } from 'zustand';

/**
 * One room the user has been in this session, as Flash's `RoomVisitHistoryEntry`. The name is
 * filled in from whichever `GetGuestRoomResultMessage` names the room, so a room entered before
 * its info arrived is renamed rather than duplicated.
 */
export interface RoomVisitHistoryEntry {
    roomId: number;
    roomName: string;
}

/** `RoomVisitHistory.MAX_HISTORY_LENGTH` - the oldest entries fall off the front past this. */
const MAX_ROOM_VISIT_HISTORY = 20;

type State = {
    /**
     * Where the user has been this session, oldest first, and where in it they are standing.
     * The room tools' back and forward arrows walk this rather than the server's room history:
     * Flash kept the same list in a process-wide `RoomVisitHistory`.
     */
    roomVisitHistory: RoomVisitHistoryEntry[];
    roomVisitIndex: number;
};

type Actions = {
    /** A room was entered: it becomes the current entry, and anything ahead of it is reordered behind it. */
    recordRoomVisit: (roomId: number, roomName: string) => void;
    /** A room named itself, wherever it sits in the history. */
    renameRoomVisit: (roomId: number, roomName: string) => void;
    /** Steps the cursor and hands back the room to go to, or nothing when there is none that way. */
    stepRoomVisitHistory: (direction: -1 | 1) => RoomVisitHistoryEntry | undefined;
};

export const NavigatorRoomVisitSliceInitialState: State = {
    roomVisitHistory: [],
    roomVisitIndex: -1,
};

export type NavigatorRoomVisitSlice = State & Actions;

export const createNavigatorRoomVisitSlice: StateCreator<NavigatorRoomVisitSlice, [], [], NavigatorRoomVisitSlice> = (set, get) => ({
    ...NavigatorRoomVisitSliceInitialState,
    recordRoomVisit: (roomId, roomName) => set((x) => {
        const history = x.roomVisitHistory.map(entry => ((entry.roomId === roomId) ? { ...entry, roomName } : entry));
        const index = Math.min(Math.max(x.roomVisitIndex, history.length ? 0 : -1), history.length - 1);

        // Standing on it already - only the name can have changed.
        if (history[index]?.roomId === roomId) return { roomVisitHistory: history, roomVisitIndex: index };

        /*
         * Walking back and then somewhere new does not throw the forward entries away, as a
         * browser would: Flash reversed them behind the cursor, so the room you came from is
         * the next one back. `RoomVisitHistory.reverseSuffix(index, length - 1)`.
         */
        if (index >= 0 && index < history.length - 1) {
            const tail = history.slice(index).reverse();

            history.length = index;
            history.push(...tail);
        }

        // The room reversing put at the end is the one we are entering: stand on it.
        if (history.length && (history[history.length - 1].roomId === roomId)) {
            history[history.length - 1] = { roomId, roomName };

            return { roomVisitHistory: history, roomVisitIndex: history.length - 1 };
        }

        history.push({ roomId, roomName });

        const trimmed = history.slice(Math.max(0, history.length - MAX_ROOM_VISIT_HISTORY));

        return { roomVisitHistory: trimmed, roomVisitIndex: trimmed.length - 1 };
    }),
    renameRoomVisit: (roomId, roomName) => set(x => ({
        roomVisitHistory: x.roomVisitHistory.map(entry => ((entry.roomId === roomId) ? { ...entry, roomName } : entry)),
    })),
    stepRoomVisitHistory: (direction) => {
        const { roomVisitHistory, roomVisitIndex } = get();
        const index = roomVisitIndex + direction;

        if (index < 0 || index >= roomVisitHistory.length) return undefined;

        set({ roomVisitIndex: index });

        return roomVisitHistory[index];
    },
});
