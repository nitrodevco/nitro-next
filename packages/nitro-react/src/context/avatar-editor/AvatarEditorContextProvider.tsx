import { ReactNode, useState } from 'react';

import { AvatarEditorContext } from './AvatarEditorContext';
import { createAvatarEditorStore } from './store';

type ProviderProps = {
    children: ReactNode;
};

export const AvatarEditorContextProvider = ({ children }: ProviderProps) => {
    const [ ctx ] = useState(() => createAvatarEditorStore());

    return (
        <AvatarEditorContext value={ctx}>
            {children}
        </AvatarEditorContext>
    );
};
