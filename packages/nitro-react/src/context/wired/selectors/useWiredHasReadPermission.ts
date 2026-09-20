import { useWiredStore } from '../useWiredStore';
import { useWiredIsRoomOwnerOrStaff } from './useWiredIsRoomOwnerOrStaff';

/** `WiredMenuController.hasReadPermission`: owner or staff, otherwise what `WiredPermissions` granted. */
export const useWiredHasReadPermission = () => {
    const canRead = useWiredStore(x => x.wiredCanRead);
    const isRoomOwnerOrStaff = useWiredIsRoomOwnerOrStaff();

    return isRoomOwnerOrStaff || canRead;
};
