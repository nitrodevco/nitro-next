import { useContext } from 'react';
import { useStore } from 'zustand';

import { AvatarEditorContext } from './AvatarEditorContext';
import { AvatarEditorStore } from './store';

export function useAvatarEditorStore<T>(selector: (state: AvatarEditorStore) => T) {
    const store = useContext(AvatarEditorContext);

    if (!store) throw new Error('useAvatarEditorStore must be used within AvatarEditorContextProvider');

    return useStore(store, selector);
}
