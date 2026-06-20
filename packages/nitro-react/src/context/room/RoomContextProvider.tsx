import type { IRoom } from '@nitrodevco/nitro-api';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { createRoomStore } from '#base/stores';

import { RoomContext } from './RoomContext';

type ProviderProps = {
    room: IRoom;
    children: ReactNode;
}

export const RoomContextProvider = ({ room, children }: ProviderProps) => {
    const [roomCtx] = useState(() => createRoomStore(room));

    useEffect(() => {
        const store = roomCtx.getState();
        if (store.roomId !== room.roomId) {
            roomCtx.setState({ room, roomId: room.roomId });
            roomCtx.getState().resetRoomState();
        }
    }, [room, roomCtx]);

    return (
        <RoomContext value={roomCtx}>
            {children}
        </RoomContext>
    );
};