import type { ReactNode } from 'react';
import { useState } from 'react';

import { DialogContext } from './DialogContext';
import { createDialogContextStore } from './store';

type ProviderProps = {
    children: ReactNode;
}

export const DialogContextProvider = ({ children }: ProviderProps) => {
    const [ctx] = useState(() => createDialogContextStore());

    return (
        <DialogContext value={ctx}>
            {children}
        </DialogContext>
    );
};
