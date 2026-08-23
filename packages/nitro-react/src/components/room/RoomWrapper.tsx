import { OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { RoomContextProvider, useWebSocketContext } from '#base/context';

import { RoomContainer } from './RoomContainer';

export const RoomWrapper = () => {
    const { send } = useWebSocketContext();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roomId = parseInt(params.get('roomId') ?? '-1');

        if (roomId > 0) send(new OpenFlatConnectionComposer({
            roomId,
            password: '',
            unknown1: -1,
        }));
    }, []);

    return (
        <RoomContextProvider>
            <RoomContainer />
        </RoomContextProvider>
    );
};
