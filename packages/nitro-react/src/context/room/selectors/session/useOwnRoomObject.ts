import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

import { useRoom } from '../useRoom';
import { useOwnRoomObjectId } from './useOwnRoomObjectId';

/** Your own avatar's room object, found by `useOwnRoomObjectId`; nothing outside a room. */
export const useOwnRoomObject = () => {
    const room = useRoom();
    const ownObjectId = useOwnRoomObjectId();

    return room?.getRoomObject(ownObjectId, RoomObjectCategoryEnum.Unit);
};
