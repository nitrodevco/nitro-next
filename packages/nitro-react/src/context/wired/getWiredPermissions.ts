/**
 * `WiredMenuController`'s gates, for code that runs outside React (handlers and commands); the
 * hooks in `selectors/` are the same rules for components.
 *
 * - `isEnabled`: the `wired.menu.enabled` config flag, off unless the hotel turns it on.
 * - `isRoomOwnerOrStaff`: the room's owner, or security level 4 and up.
 * - `hasReadPermission` / `hasWritePermission`: owner or staff, otherwise what the last
 *   `WiredPermissions` packet granted.
 */
import { SecurityLevelEnum } from '@nitrodevco/nitro-api';

import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { wiredStore } from './store/WiredStore';

/** `WiredMenuController.isEnabled`. */
export const getWiredMenuEnabled = (): boolean => systemStore.getState().config['wired.menu.enabled'] === true;

/** `WiredMenuController.isRoomOwnerOrStaff` - `false` outside a room. */
export const getWiredIsRoomOwnerOrStaff = (): boolean => {
    const { room, isRoomOwner } = roomStore.getState();

    if (!room) return false;

    return (userStore.getState().securityLevel >= SecurityLevelEnum.Employee) || isRoomOwner;
};

/** `WiredMenuController.hasReadPermission`. */
export const getWiredHasReadPermission = (): boolean => getWiredIsRoomOwnerOrStaff() || wiredStore.getState().wiredCanRead;

/** `WiredMenuController.hasWritePermission`. */
export const getWiredHasWritePermission = (): boolean => getWiredIsRoomOwnerOrStaff() || wiredStore.getState().wiredCanModify;
