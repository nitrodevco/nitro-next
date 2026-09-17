import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

import { useOwnIsModerator } from '#base/context/user';

import { useRoomStore } from '../../useRoomStore';

export const useRoomCanDecorate = () => {
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const isModerator = useOwnIsModerator();

    return isRoomOwner || isModerator || controllerLevel > RoomControllerLevelEnum.Guest;
};
