import { ReactNode, useState } from 'react';

import { RoomContext } from './RoomContext';
import { createRoomStore } from './store';

type ProviderProps = {
    children: ReactNode;
};

export const RoomContextProvider = ({ children }: ProviderProps) => {
    const [ ctx ] = useState(() => createRoomStore());

    return (
        <RoomContext value={ctx}>
            {children}
        </RoomContext>
    );
};
