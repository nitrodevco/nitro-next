import type { ReactNode } from 'react';
import { useState } from 'react';

import { createSystemStore } from './store';
import { SystemContext } from './SystemContext';

type ProviderProps = {
    children: ReactNode;
}

export const SystemContextProvider = ({ children }: ProviderProps) => {
    const [systemCtx] = useState(() => createSystemStore());

    return (
        <SystemContext value={systemCtx}>
            {children}
        </SystemContext>
    );
};