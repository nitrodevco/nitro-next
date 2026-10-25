/**
 * The room thumbnail camera - Flash `RoomThumbnailCameraWidget` and its handler: the
 * `roomThumbnailCamera/open` link (room info's `add_thumbnail_region`) opens it at normal zoom only,
 * and `ThumbnailStatusMessage` takes it down with the server's answer.
 */
import type { ThumbnailStatusMessageType } from '@nitrodevco/nitro-packets';

import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { reloadTextureUrl } from '#base/theme';
import { configReader } from '#base/utils';

/** `startTakingPhoto`: not while zoomed out or turned over - Flash's own text, not a localisation. */
export const startRoomThumbnailCamera = () => {
    const { showWindow, showAlert } = systemStore.getState();
    const canvas = getRoom()?.canvas;

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

/**
 * `RoomThumbnailCameraWidgetHandler.onThumbnailStatus`: the camera goes, then the answer's alert. On
 * success the room's thumbnail (`navigator.thumbnail.url_base` + `<flatId>.png`) is fetched anew, so
 * the room info shows the new picture rather than what the browser kept from before it was taken.
 */
export const onThumbnailStatus = (data: ThumbnailStatusMessageType) => {
    const { hideWindow, showAlert, interpolate, config } = systemStore.getState();

    hideWindow('room_thumbnail_camera');

    const base = configReader(config).configString('navigator.thumbnail.url_base');
    const roomId = getRoom()?.roomId;

    if (data.isOk && base.length && roomId) void reloadTextureUrl(`${base}${roomId}.png`);

    if (data.isOk) showAlert(interpolate('${navigator.thumbnail.camera.title}'), interpolate('${navigator.thumbnail.camera.success}'));
    else if (data.isRenderLimitHit) showAlert(interpolate('${generic.alert.title}'), interpolate('${camera.render.count.info}'));
};
