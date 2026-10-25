import { useRoomStore } from '../useRoomStore';

/** The user, pet or bot standing as a room object (`RoomSession.userDataManager.getUserDataByIndex`), undefined once they have left. */
export const useRoomUserByObjectId = (objectId: number) => useRoomStore(x => x.usersByRoomObjectId[objectId]);
