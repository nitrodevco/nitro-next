import type { ReactNode } from 'react';
import { useState } from 'react';

import { NavigatorContext } from './NavigatorContext';
import { createNavigatorContextStore } from './store';

type ProviderProps = {
    children: ReactNode;
};

export const NavigatorContextProvider = ({ children }: ProviderProps) => {
    const [ ctx ] = useState(() => createNavigatorContextStore());

    return (
        <NavigatorContext value={ctx}>
            {children}
        </NavigatorContext>
    );
};
