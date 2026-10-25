/**
 * `CameraWidgetHandler`'s prices (`onInitCameraEvent`, 999 until the server's answer) and the photo
 * lab / "Buy or publish" dialog state (`CameraPhotoLab`, `PhotoPurchaseConfirmationDialog`).
 */
import { createStore } from 'zustand';

import type { RenderRoomMessageSource } from '#base/utils';

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

type State = {
    creditPrice: number;
    ducketPrice: number;
    publishDucketPrice: number;
    /** The photo the lab is editing (`editPhoto`); undefined while it is not open. */
    labPhoto: CameraPhoto | undefined;
    /** The lab is up, or hidden behind the purchase dialog (`hide`). */
    labVisible: boolean;
    purchase: PhotoPurchase | undefined;
};

type Actions = {
    /** `onInitCameraEvent`. */
    setPrices: (creditPrice: number, ducketPrice: number, publishDucketPrice: number) => void;
    /** `CameraWidget.editPhoto`: the lab opens on the photo. */
    openPhotoLab: (photo: CameraPhoto) => void;
    /** `CameraPhotoLab.dispose` with its dialog. */
    closePhotoLab: () => void;
    /** `openPurchaseConfirmationDialog`: the dialog up, the lab hidden behind it. */
    openPhotoPurchase: (purchase: PhotoPurchase) => void;
    /** Merges into the open dialog's state; a no-op when none is open. */
    updatePhotoPurchase: (update: Partial<PhotoPurchase>) => void;
};

const initialState: State = {
    creditPrice: 999,
    ducketPrice: 999,
    publishDucketPrice: 999,
    labPhoto: undefined,
    labVisible: false,
    purchase: undefined,
};

export type CameraStore = State & Actions;

export const createCameraStore = () => createStore<CameraStore>()(set => ({
    ...initialState,
    setPrices: (creditPrice, ducketPrice, publishDucketPrice) => set({ creditPrice, ducketPrice, publishDucketPrice }),
    openPhotoLab: labPhoto => set({ labPhoto, labVisible: true, purchase: undefined }),
    closePhotoLab: () => set({ labPhoto: undefined, labVisible: false, purchase: undefined }),
    openPhotoPurchase: purchase => set({ labVisible: false, purchase }),
    updatePhotoPurchase: update => set(x => (x.purchase ? { purchase: { ...x.purchase, ...update } } : x)),
}));

/**
 * The one CameraStore for the whole client. Components read it through `useCameraStore`, and the
 * camera's commands and handlers through `getState()`, which is always current.
 */
export const cameraStore = createCameraStore();
