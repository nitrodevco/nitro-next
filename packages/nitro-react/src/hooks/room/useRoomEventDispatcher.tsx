import { NitroEvent } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { useRoomSelector } from '#base/context';

export const useRoomEventDispatcher = <T extends NitroEvent>(
    type: string | string[],
    handler: (event: T) => void,
    enabled: boolean = true,
) => {
    const room = useRoomSelector();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!room || !enabled) return;

        if (Array.isArray(type)) {
            type.map(name => room.eventDispatcher.addEventListener(name, handlerRef.current));
        } else {
            room.eventDispatcher.addEventListener(type, handlerRef.current);
        }

        return () => {
            if (Array.isArray(type)) {
                type.map(name => room.eventDispatcher.removeEventListener(name, handlerRef.current));
            } else {
                room.eventDispatcher.removeEventListener(type, handlerRef.current);
            }
        };
    }, [room, type, enabled]);
};
