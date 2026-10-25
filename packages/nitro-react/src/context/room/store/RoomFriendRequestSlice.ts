import { StateCreator } from 'zustand';

/** Somebody in the room asking to be friends - the bubble that pops up over them. */
export interface RoomFriendRequest {
    /** Also the requester's user id: the server sends the same number for both. */
    requestId: number;
    requesterName: string;
}

type State = {
    roomFriendRequests: RoomFriendRequest[];
};

type Actions = {
    addRoomFriendRequest: (requestId: number, requesterName: string) => void;
    removeRoomFriendRequest: (requestId: number) => void;
};

export const RoomFriendRequestSliceInitialState: State = {
    roomFriendRequests: [],
};

export type RoomFriendRequestSlice = State & Actions;

export const createRoomFriendRequestSlice: StateCreator<RoomFriendRequestSlice, [], [], RoomFriendRequestSlice> = set => ({
    ...RoomFriendRequestSliceInitialState,
    addRoomFriendRequest: (requestId, requesterName) => set(x => (x.roomFriendRequests.some(request => request.requestId === requestId)
        ? x
        : { roomFriendRequests: [ ...x.roomFriendRequests, { requestId, requesterName } ] })),
    removeRoomFriendRequest: requestId => set(x => ({ roomFriendRequests: x.roomFriendRequests.filter(request => request.requestId !== requestId) })),
});
