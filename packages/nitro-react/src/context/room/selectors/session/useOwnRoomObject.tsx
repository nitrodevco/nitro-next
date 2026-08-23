import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

import { useRoomSelector } from '../useRoomSelector';
import { useOwnRoomObjectId } from './useOwnRoomObjectId';

export const useOwnRoomObject = () => {
    const room = useRoomSelector();
    const ownObjectId = useOwnRoomObjectId();

    return room?.getRoomObject(ownObjectId, RoomObjectCategoryEnum.Unit);
};
