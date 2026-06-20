import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';
import type {
    RoomCameraActions,
    RoomPermissionActions,
    RoomSelectedObjectActions,
    RoomSettingActions,
} from '#base/handlers/room/createRoomHandlerActions';
import {
    extractCameraActions,
    extractPermissionActions,
    extractSelectedObjectActions,
    extractSettingActions,
} from '#base/handlers/room/createRoomHandlerActions';

export const useRoomPermissionActions = (): RoomPermissionActions =>
    useRoomContext(useShallow(extractPermissionActions));

export const useRoomSettingActions = (): RoomSettingActions =>
    useRoomContext(useShallow(extractSettingActions));

export const useRoomCameraActions = (): RoomCameraActions =>
    useRoomContext(useShallow(extractCameraActions));

export const useRoomSelectedObjectActions = (): RoomSelectedObjectActions =>
    useRoomContext(useShallow(extractSelectedObjectActions));
