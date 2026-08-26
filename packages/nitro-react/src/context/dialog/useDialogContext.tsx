import { useContext } from 'react';
import { useStore } from 'zustand';

import { DialogContext } from './DialogContext';
import { DialogContextStore } from './store/DialogContextStore';

export const useDialogContext = <T,>(selector: (state: DialogContextStore) => T) => {
    const store = useContext(DialogContext);

    if (!store) throw new Error('useDialogContext must be used within DialogContextProvider');

    return useStore(store, selector);
}
