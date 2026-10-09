/**
 * The room thumbnail camera - Flash `RoomThumbnailCameraWidget` and its handler: the
 * `roomThumbnailCamera/open` link (room info's `add_thumbnail_region`) opens it at normal zoom only,
 * and `ThumbnailStatusMessage` takes it down with the server's answer.
 */
import type { ThumbnailStatusMessageType } from '@nitrodevco/nitro-packets';

import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

/** `startTakingPhoto`: not while zoomed out or turned over - Flash's own text, not a localisation. */
export const startRoomThumbnailCamera = () => {
    const { showWindow, showAlert } = systemStore.getState();
    const canvas = roomStore.getState().room?.canvas;

    if (canvas && ((canvas.scale < 1) || canvas.isFlipped)) {
        showAlert('Camera only works on normal zoom!', 'Return to normal zoom level and try again!');

        return;
    }

    showWindow('room_thumbnail_camera');
};

/** `linkReceived`: `roomThumbnailCamera/open`. */
export const openRoomThumbnailCameraLink = (parts: string[]) => {
    if (parts.length < 2) return;

    if (parts[1] === 'open') startRoomThumbnailCamera();
};

/** `RoomThumbnailCameraWidgetHandler.onThumbnailStatus`: the camera goes, then the answer's alert. */
export const onThumbnailStatus = (data: ThumbnailStatusMessageType) => {
    const { hideWindow, showAlert, interpolate } = systemStore.getState();

    hideWindow('room_thumbnail_camera');

    if (data.isOk) showAlert(interpolate('${navigator.thumbnail.camera.title}'), interpolate('${navigator.thumbnail.camera.success}'));
    else if (data.isRenderLimitHit) showAlert(interpolate('${generic.alert.title}'), interpolate('${camera.render.count.info}'));
};
