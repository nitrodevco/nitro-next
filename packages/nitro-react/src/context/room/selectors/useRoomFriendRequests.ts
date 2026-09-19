import { useRoomStore } from '../useRoomStore';

/** Friend requests waiting for an answer, shown over whoever sent them. */
export const useRoomFriendRequests = () => useRoomStore(x => x.roomFriendRequests);
