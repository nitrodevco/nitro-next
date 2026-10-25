import { useIsInRoom, useIsRoomOwner } from '#base/context/room';
import { ClientGates, useClientGate } from '#base/context/user';

/** `WiredMenuController.isRoomOwnerOrStaff`: the room's owner, or security level 4 and up; `false` outside a room. */
export const useWiredIsRoomOwnerOrStaff = () => {
    const inRoom = useIsInRoom();
    const isRoomOwner = useIsRoomOwner();
    const isStaff = useClientGate(ClientGates.WiredMenu);

    return inRoom && (isStaff || isRoomOwner);
};
