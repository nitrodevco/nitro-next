import { useContext } from 'react';
import { useStore } from 'zustand';

import { AvatarEditorContext } from './AvatarEditorContext';
import { AvatarEditorStore } from './store';

export function useAvatarEditorContext<T>(selector: (state: AvatarEditorStore) => T) {
    const store = useContext(AvatarEditorContext);

    if (!store) throw new Error('useAvatarEditorContext must be used within AvatarEditorContextProvider');

    return useStore(store, selector);
}
