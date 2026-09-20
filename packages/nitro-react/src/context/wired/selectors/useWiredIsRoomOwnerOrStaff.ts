import { SecurityLevelEnum } from '@nitrodevco/nitro-api';

import { useRoomStore } from '#base/context/room';
import { useOwnSecurityLevel } from '#base/context/user';

/** `WiredMenuController.isRoomOwnerOrStaff`: the room's owner, or security level 4 and up; `false` outside a room. */
export const useWiredIsRoomOwnerOrStaff = () => {
    const inRoom = useRoomStore(x => !!x.room);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const securityLevel = useOwnSecurityLevel();

    return inRoom && ((securityLevel >= SecurityLevelEnum.Employee) || isRoomOwner);
};
