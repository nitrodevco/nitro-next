/**
 * The room camera's opening - `CameraWidget.startTakingPhoto`: the toolbar's camera icon shows the
 * viewfinder, or hides it when it is up. A room that is zoomed or flipped cannot be photographed
 * (`camera.zoom.missing`), and the viewfinder hides itself when the room is zoomed (`onRoomZoomed`).
 * Also the photo lab's and purchase dialog's flow over `cameraStore`, and the camera's requests
 * (`CameraWidgetHandler`).
 */
import type { CameraPublishStatusMessageType, CameraStorageUrlMessageType, InitCameraMessageType } from '@nitrodevco/nitro-packets';
import { PublishPhotoComposer, PurchasePhotoComposer, RenderRoomComposer, RequestCameraConfigurationComposer } from '@nitrodevco/nitro-packets';
import { SpriteDataCollector } from '@nitrodevco/nitro-renderer';
import type { Rectangle } from 'pixi.js';

import { CameraPhoto, cameraStore, PhotoPurchase, PhotoPurchaseState } from '#base/context/camera';
import { Send } from '#base/context/communication';
import { getRoom } from '#base/context/room';
import { configString, systemStore } from '#base/context/system';

/** `getRoomCanvasScale() < 1 || getRoomCanvasIsFlipped()`. */
export const isRoomUnfit = () => {
    const canvas = getRoom()?.canvas;

    return !!canvas && ((canvas.scale < 1) || canvas.isFlipped);
};

/**
 * `CameraWidgetHandler.collectPhotoData` -> `RoomEngine.getRenderRoomMessage`: the render data of
 * the room under `viewport`, collected as the thumbnail camera does; undefined without a room.
 */
export const collectRoomPhotoData = (viewport: Rectangle, backgroundColor: number, imageLibraryUrl: string, groupBadgeUrl: string, topSecurityLevel: number): CameraPhoto['render'] => {
    const room = getRoom();
    const canvas = room?.canvas;

    if (!room || !canvas) return undefined;

    const collector = new SpriteDataCollector(room, canvas, imageLibraryUrl, groupBadgeUrl);

    return {
        sprites: collector.getFurniData(viewport, -1),
        modifiers: collector.getRoomRenderingModifiers(),
        planes: collector.getRoomPlanes(viewport, backgroundColor),
        roomId: room.roomId,
        topSecurityLevel,
        time: Date.now(),
    };
};

export const startTakingPhoto = () => {
    const { getLocalizationValue, showAlert, toggleWindow } = systemStore.getState();

    if (isRoomUnfit()) {
        showAlert(getLocalizationValue('camera.zoom.missing.header'), getLocalizationValue('camera.zoom.missing.body'));

        return;
    }

    toggleWindow('camera');
};

/** `CameraWidget.editPhoto`: the lab opens on the photo. */
export const editPhoto = (photo: CameraPhoto) => cameraStore.getState().openPhotoLab(photo);

/** `CameraPhotoLab.dispose` with its dialog (`_-a2n.hide()`). */
export const closePhotoLab = () => cameraStore.getState().closePhotoLab();

/** `startTakingPhoto` from the lab's or the dialog's cancel: the lab goes and the viewfinder comes back. */
export const returnToViewfinder = () => {
    closePhotoLab();
    startTakingPhoto();
};

const updatePurchase = (update: Partial<PhotoPurchase>) => cameraStore.getState().updatePhotoPurchase(update);

export const setPhotoPurchaseState = (state: PhotoPurchaseState, update: Partial<PhotoPurchase> = {}) => updatePurchase({ ...update, state });

/** `openPurchaseConfirmationDialog`: the dialog loading the server's picture, the lab hidden behind it. */
export const openPhotoPurchase = (renderingFailed: boolean) => {
    cameraStore.getState().openPhotoPurchase({ state: renderingFailed ? 'rendering_failed' : 'loading_image', imageUrl: undefined, status: renderingFailed ? '' : 'camera.purchase.pleasewait', purchaseCount: 0, publishLocked: false, published: false, publishedId: '' });

    if (renderingFailed) systemStore.getState().showAlert(systemStore.getState().interpolate('${generic.alert.title}'), systemStore.getState().interpolate('${camera.alert.too_much_stuff}'));
};

/** `onInitCameraEvent`. */
export const onInitCamera = (data: InitCameraMessageType) => cameraStore.getState().setPrices(data.creditPrice, data.ducketPrice, data.publishDucketPrice);

/** `onCameraStorageUrlEvent` -> `setImageUrl`: the picture's url, or the 24-hour render limit. */
export const onCameraStorageUrl = (data: CameraStorageUrlMessageType) => {
    if (!cameraStore.getState().purchase) return;

    if (data.url && data.url.length) {
        updatePurchase({ imageUrl: configString('stories.image_url_base') + data.url });

        return;
    }

    setPhotoPurchaseState('rendering_failed', { status: '' });

    const { showAlert, interpolate } = systemStore.getState();

    showAlert(interpolate('${generic.alert.title}'), interpolate('${camera.render.count.info}'));
};

/** `onPurchaseOK` -> `animateIconToToolbar`: the poster bought, another can be. */
export const onCameraPurchaseOK = () => {
    const { purchase } = cameraStore.getState();

    if (!purchase) return;

    setPhotoPurchaseState('image_loaded', { status: 'camera.purchase.successful', purchaseCount: purchase.purchaseCount + 1 });
};

let publishTimer: ReturnType<typeof setTimeout> | undefined;

/** `onPublishStatus` -> `publishingStatus`: published, or how long to wait before the next one. */
export const onCameraPublishStatus = (data: CameraPublishStatusMessageType) => {
    if (!cameraStore.getState().purchase) return;

    if (publishTimer) clearTimeout(publishTimer);

    publishTimer = undefined;

    if (data.isOk) {
        setPhotoPurchaseState('image_loaded', { status: 'camera.publish.successful', published: true, publishedId: data.extraDataId, publishLocked: true });

        return;
    }

    const { showAlert, interpolate, getLocalizationValue } = systemStore.getState();
    const minutes = Math.trunc(data.secondsToWait / 60) + 1;

    showAlert(interpolate('${generic.alert.title}'), getLocalizationValue('camera.publish.wait').replace('%minutes%', String(minutes)));
    setPhotoPurchaseState('image_loaded', { status: '', publishLocked: true });

    // `onPublishTimerComplete`: the button comes back once the wait is over.
    publishTimer = setTimeout(() => {
        publishTimer = undefined;
        updatePurchase({ publishLocked: false });
    }, data.secondsToWait * 1000);
};

/** `CameraWidgetHandler.sendInitCameraMessage`: the camera's prices and settings asked for. */
export const requestCameraConfiguration = (send: Send) => send(new RequestCameraConfigurationComposer({}));

/** `CameraWidgetHandler.sendPhotoData`: the photo's render data, rendered and stored by the server. */
export const sendPhotoRenderData = (send: Send, data: Uint8Array) => send(new RenderRoomComposer({ data }));

/** `CameraWidgetHandler.confirmPhotoPurchase`. */
export const purchasePhoto = (send: Send) => send(new PurchasePhotoComposer({}));

/** `CameraWidgetHandler.confirmPhotoPublish`. */
export const publishPhoto = (send: Send) => send(new PublishPhotoComposer({}));
