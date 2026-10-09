/** `RoomThumbnailCameraWidgetHandler`'s one packet. */
import { ThumbnailStatusMessage } from '@nitrodevco/nitro-packets';

import { onThumbnailStatus } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerRoomThumbnailCameraHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(ThumbnailStatusMessage, onThumbnailStatus),
]);
