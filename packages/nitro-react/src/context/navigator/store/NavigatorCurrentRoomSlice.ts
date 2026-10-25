import { IRoomInfo } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * The room the user is actually standing in - Flash's `NavigatorData.enteredGuestRoom`. A
 * `GetGuestRoomResultMessage` with `enterRoom` set writes it, and a plain one for the same room
 * (the refetch after `RoomInfoUpdatedMessage`) replaces it; looking up another room's info does
 * not, which is why it is its own record.
 */
export interface EnteredRoom {
    info: IRoomInfo;
    /** Whether we own it - the favourite buttons are not offered on your own rooms. */
    isOwner: boolean;
    /** From `GetGuestRoomResultMessage`, not from the room settings. */
    isStaffPicked: boolean;
    canMute: boolean;
    allInRoomMuted: boolean;
}

/** `NavigatorData`'s current room: which it is, its info, its rating, and the favourites list the room tools mark it against. */
type State = {
    enteredRoom: EnteredRoom | undefined;
    /**
     * `NavigatorData.currentRoomId` / `currentRoomOwner`: `RoomEntryInfoMessage`'s room and owner
     * flag. Leaving keeps the id, as Flash does, so it is also `HabboGroupsManager._roomId`, which
     * is set and kept the same way.
     */
    currentRoomId: number;
    currentRoomOwner: boolean;
    /** `RoomRatingMessage`: the room's score, and whether this visit may still add to it. */
    currentRoomRating: number;
    canRateCurrentRoom: boolean;
    /** `FavouritesMessage` - which rooms are favourited, and how many may be. */
    favouriteRoomIds: number[];
    favouriteRoomLimit: number;
};

type Actions = {
    setEnteredRoom: (enteredRoom: EnteredRoom | undefined) => void;
    /** Merges into the room already entered; a no-op when it is a different room or none. */
    updateEnteredRoom: (roomId: number, changes: Partial<Omit<EnteredRoom, 'info'>>) => void;
    /** `NavigatorData.onRoomEnter`: the room and owner flag; its info is dropped until `GetGuestRoomResultMessage` names it. */
    setCurrentRoom: (roomId: number, owner: boolean) => void;
    /** `NavigatorData.onRoomExit`: the info and owner flag go, the room id stays. */
    exitCurrentRoom: () => void;
    setRoomRating: (rating: number, canRate: boolean) => void;
    setFavouriteRooms: (favouriteRoomIds: number[], favouriteRoomLimit: number) => void;
    setRoomFavourite: (roomId: number, favourite: boolean) => void;
};

export const NavigatorCurrentRoomSliceInitialState: State = {
    enteredRoom: undefined,
    currentRoomId: 0,
    currentRoomOwner: false,
    currentRoomRating: 0,
    canRateCurrentRoom: false,
    favouriteRoomIds: [],
    favouriteRoomLimit: 0,
};

export type NavigatorCurrentRoomSlice = State & Actions;

export const createNavigatorCurrentRoomSlice: StateCreator<NavigatorCurrentRoomSlice, [], [], NavigatorCurrentRoomSlice> = set => ({
    ...NavigatorCurrentRoomSliceInitialState,
    setEnteredRoom: enteredRoom => set({ enteredRoom }),
    updateEnteredRoom: (roomId, changes) => set(x => ((x.enteredRoom && (x.enteredRoom.info.roomId === roomId))
        ? { enteredRoom: { ...x.enteredRoom, ...changes } }
        : x)),
    setCurrentRoom: (currentRoomId, currentRoomOwner) => set({ currentRoomId, currentRoomOwner, enteredRoom: undefined }),
    exitCurrentRoom: () => set({ enteredRoom: undefined, currentRoomOwner: false }),
    setRoomRating: (currentRoomRating, canRateCurrentRoom) => set({ currentRoomRating, canRateCurrentRoom }),
    setFavouriteRooms: (favouriteRoomIds, favouriteRoomLimit) => set({ favouriteRoomIds, favouriteRoomLimit }),
    setRoomFavourite: (roomId, favourite) => set(x => ({
        favouriteRoomIds: favourite
            ? (x.favouriteRoomIds.includes(roomId) ? x.favouriteRoomIds : [ ...x.favouriteRoomIds, roomId ])
            : x.favouriteRoomIds.filter(id => id !== roomId),
    })),
});
