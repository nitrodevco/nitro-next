import { useWiredStore } from '../useWiredStore';
import { useWiredIsRoomOwnerOrStaff } from './useWiredIsRoomOwnerOrStaff';

/** `WiredMenuController.hasWritePermission`: owner or staff, otherwise what `WiredPermissions` granted. */
export const useWiredHasWritePermission = () => {
    const canModify = useWiredStore(x => x.wiredCanModify);
    const isRoomOwnerOrStaff = useWiredIsRoomOwnerOrStaff();

    return isRoomOwnerOrStaff || canModify;
};
