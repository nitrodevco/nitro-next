import { useStore } from 'zustand';

import { AvatarEditorStore, avatarEditorStore } from './store';

/**
 * A slice of the AvatarEditorStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. There is only
 * ever one editor, and what it holds (the wardrobe, the owned figure sets, the tab it was on)
 * survives the window closing.
 */
export function useAvatarEditorStore<T>(selector: (state: AvatarEditorStore) => T) {
    return useStore(avatarEditorStore, selector);
}
