import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

import { useRoom } from '../useRoom';
import { useOwnRoomObjectId } from './useOwnRoomObjectId';

export const useOwnRoomObject = () => {
    const room = useRoom();
    const ownObjectId = useOwnRoomObjectId();

    return room?.getRoomObject(ownObjectId, RoomObjectCategoryEnum.Unit);
};
