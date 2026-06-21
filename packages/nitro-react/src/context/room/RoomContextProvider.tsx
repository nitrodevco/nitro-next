import type { ReactNode } from 'react';
import { useState } from 'react';

import { createRoomStore } from '#base/stores';

import { RoomContext } from './RoomContext';

type ProviderProps = {
    children: ReactNode;
}

export const RoomContextProvider = ({ children }: ProviderProps) => {
    const [ctx] = useState(() => createRoomStore());

    return (
        <RoomContext value={ctx}>
            {children}
        </RoomContext>
    );
};