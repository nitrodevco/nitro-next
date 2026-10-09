/**
 * The room camera's opening - `CameraWidget.startTakingPhoto`: the toolbar's camera icon shows the
 * viewfinder, or hides it when it is up. A room that is zoomed or flipped cannot be photographed
 * (`camera.zoom.missing`), and the viewfinder hides itself when the room is zoomed (`onRoomZoomed`).
 */
import { GetConfigValue } from '@nitrodevco/nitro-api';
import type { CameraPublishStatusMessageType, CameraStorageUrlMessageType, InitCameraMessageType } from '@nitrodevco/nitro-packets';
import { createStore, useStore } from 'zustand';

import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import type { RenderRoomMessageSource } from '#base/utils';

/** `getRoomCanvasScale() < 1 || getRoomCanvasIsFlipped()`. */
export const isRoomUnfit = () => {
    const canvas = getRoom()?.canvas;

    return !!canvas && ((canvas.scale < 1) || canvas.isFlipped);
};

export const startTakingPhoto = () => {
    const { getLocalizationValue, showAlert, toggleWindow } = systemStore.getState();

    if (isRoomUnfit()) {
        showAlert(getLocalizationValue('camera.zoom.missing.header'), getLocalizationValue('camera.zoom.missing.body'));

        return;
    }

    toggleWindow('camera');
};

/**
 * `CameraWidgetHandler`'s prices (`onInitCameraEvent`, 999 until the server's answer) and the photo
 * lab / "Buy or publish" dialog state (`CameraPhotoLab`, `PhotoPurchaseConfirmationDialog`).
 */
export type PhotoPurchaseState = 'loading_image' | 'image_loaded' | 'waiting_purchase_to_complete' | 'waiting_publish_to_complete' | 'rendering_failed';

export interface CameraPhoto {
    image: HTMLCanvasElement;
    /** The render data collected when the shutter went (`_renderRoomMessages[slot]`). */
    render: Omit<RenderRoomMessageSource, 'effects' | 'zoom'> | undefined;
}

export interface PhotoPurchase {
    state: PhotoPurchaseState;
    /** `stories.image_url_base` + `CameraStorageUrlMessage.url`, once the server rendered it. */
    imageUrl: string | undefined;
    /** `status_info`'s text key ('' for none). */
    status: string;
    purchaseCount: number;
    /** `_-n1a`: a publish went through or is waiting; the button stays off. */
    publishLocked: boolean;
    published: boolean;
    publishedId: string;
}

interface CameraState {
    creditPrice: number;
    ducketPrice: number;
    publishDucketPrice: number;
    /** The photo the lab is editing (`editPhoto`); undefined while it is not open. */
    labPhoto: CameraPhoto | undefined;
    /** The lab is up, or hidden behind the purchase dialog (`hide`). */
    labVisible: boolean;
    purchase: PhotoPurchase | undefined;
    configRequested: boolean;
}

export const cameraStore = createStore<CameraState>()(() => ({
    creditPrice: 999,
    ducketPrice: 999,
    publishDucketPrice: 999,
    labPhoto: undefined,
    labVisible: false,
    purchase: undefined,
    configRequested: false,
}));

export const useCameraStore = <T>(selector: (state: CameraState) => T) => useStore(cameraStore, selector);

/** `CameraWidget.editPhoto`: the lab opens on the photo. */
export const editPhoto = (photo: CameraPhoto) => cameraStore.setState({ labPhoto: photo, labVisible: true, purchase: undefined });

/** `CameraPhotoLab.dispose` with its dialog (`_-a2n.hide()`). */
export const closePhotoLab = () => cameraStore.setState({ labPhoto: undefined, labVisible: false, purchase: undefined });

/** `startTakingPhoto` from the lab's or the dialog's cancel: the lab goes and the viewfinder comes back. */
export const returnToViewfinder = () => {
    closePhotoLab();
    startTakingPhoto();
};

const updatePurchase = (update: Partial<PhotoPurchase>) => {
    const { purchase } = cameraStore.getState();

    if (purchase) cameraStore.setState({ purchase: { ...purchase, ...update } });
};

export const setPhotoPurchaseState = (state: PhotoPurchaseState, update: Partial<PhotoPurchase> = {}) => updatePurchase({ ...update, state });

/** `openPurchaseConfirmationDialog`: the dialog loading the server's picture, the lab hidden behind it. */
export const openPhotoPurchase = (renderingFailed: boolean) => {
    cameraStore.setState({
        labVisible: false,
        purchase: { state: renderingFailed ? 'rendering_failed' : 'loading_image', imageUrl: undefined, status: renderingFailed ? '' : 'camera.purchase.pleasewait', purchaseCount: 0, publishLocked: false, published: false, publishedId: '' },
    });

    if (renderingFailed) systemStore.getState().showAlert(systemStore.getState().interpolate('${generic.alert.title}'), systemStore.getState().interpolate('${camera.alert.too_much_stuff}'));
};

/** `onInitCameraEvent`. */
export const onInitCamera = (data: InitCameraMessageType) => cameraStore.setState({ creditPrice: data.creditPrice, ducketPrice: data.ducketPrice, publishDucketPrice: data.publishDucketPrice });

/** `onCameraStorageUrlEvent` -> `setImageUrl`: the picture's url, or the 24-hour render limit. */
export const onCameraStorageUrl = (data: CameraStorageUrlMessageType) => {
    if (!cameraStore.getState().purchase) return;

    if (data.url && data.url.length) {
        updatePurchase({ imageUrl: (GetConfigValue<string>('stories.image_url_base') ?? '') + data.url });

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
