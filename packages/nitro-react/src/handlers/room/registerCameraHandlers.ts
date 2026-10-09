/** `CameraWidgetHandler`'s packets. */
import { CameraPublishStatusMessage, CameraPurchaseOKMessage, CameraStorageUrlMessage, InitCameraMessage } from '@nitrodevco/nitro-packets';

import { onCameraPublishStatus, onCameraPurchaseOK, onCameraStorageUrl, onInitCamera } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCameraHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(InitCameraMessage, onInitCamera),
    on(CameraStorageUrlMessage, onCameraStorageUrl),
    on(CameraPurchaseOKMessage, onCameraPurchaseOK),
    on(CameraPublishStatusMessage, onCameraPublishStatus),
]);
