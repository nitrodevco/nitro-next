import { RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

import { useOwnIsModerator } from '#base/context/user';

import { useRoomPermissionsSelector } from './useRoomPermissionsSelector';

export const useRoomCanDecorate = () => {
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const isModerator = useOwnIsModerator();

    return isRoomOwner || isModerator || controllerLevel > RoomControllerLevelEnum.Guest;
};
