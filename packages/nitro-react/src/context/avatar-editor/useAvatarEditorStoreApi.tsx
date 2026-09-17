import { useContext } from 'react';

import { AvatarEditorContext } from './AvatarEditorContext';

/** The open editor's store itself, for code that reads and writes it outside a render. */
export const useAvatarEditorStoreApi = () => {
    const store = useContext(AvatarEditorContext);

    if (!store) throw new Error('useAvatarEditorStoreApi must be used within AvatarEditorContextProvider');

    return store;
};
