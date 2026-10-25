import { useStore } from 'zustand';

import { CameraStore, cameraStore } from './store/CameraStore';

/**
 * A slice of the CameraStore (the camera's prices, photo lab and purchase dialog), re-rendering only
 * when that slice changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useCameraStore<T>(selector: (state: CameraStore) => T) {
    return useStore(cameraStore, selector);
}
