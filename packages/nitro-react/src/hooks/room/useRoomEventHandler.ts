import { RoomEventHandler } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef } from 'react';

import { useRoomContext } from './useRoomContext';

export const useRoomEventHandler = () => {
    const { room } = useRoomContext();
    const handlerRef = useRef<RoomEventHandler | null>(null);

    useEffect(() => {
        if (!room) return;

        const previousHandler = room.eventHandler;
        const handler = new RoomEventHandler(room);

        handlerRef.current = handler;

        room.setEventHandler(handler);

        return () => {
            handlerRef.current = null;

            room.setEventHandler(previousHandler);
        };
    }, [room]);

    return handlerRef.current;
};
