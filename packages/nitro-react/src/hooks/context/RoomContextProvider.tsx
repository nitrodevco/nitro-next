import type { IRoom } from '@nitrodevco/nitro-api';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { createRoomStore } from '#base/stores';

import { RoomContext } from './RoomContext';

type ProviderProps = {
    room: IRoom;
    children: ReactNode;
}

export const RoomContextProvider = ({ room, children }: ProviderProps) => {
    const [roomCtx] = useState(() => createRoomStore(room));

    return (
        <RoomContext value={roomCtx}>
            {children}
        </RoomContext>
    );
};