import { RoomObjectUserType } from '@nitrodevco/nitro-api';

import { roomUserWebIdKey } from '../store/RoomUsersSlice';
import { useRoomStore } from '../useRoomStore';

/** The room object a user, pet or bot stands as, by its server id - undefined once they have left. */
export const useRoomObjectIdByWebId = (webId: number, userType: RoomObjectUserType): number | undefined =>
    useRoomStore(x => x.objectIdsByWebId[roomUserWebIdKey(userType, webId)]);
