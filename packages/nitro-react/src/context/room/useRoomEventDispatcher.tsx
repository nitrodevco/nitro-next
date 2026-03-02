import type { NitroEvent } from '@nitrodevco/nitro-shared';
import { useEffect } from 'react';

import { useRoomContext } from './useRoomContext';

export const useRoomEventDispatcher = <T extends NitroEvent>(
    type: string | string[],
    handler: (event: T) => void,
    enabled: boolean = true,
) => {
    const { room } = useRoomContext();

    useEffect(() => {
        if (!room || !enabled) return;

        if (Array.isArray(type)) {
            type.map(name => room.eventDispatcher.addEventListener(name, handler));
        } else {
            room.eventDispatcher.addEventListener(type, handler);
        }

        return () => {
            if (Array.isArray(type)) {
                type.map(name => room.eventDispatcher.removeEventListener(name, handler));
            } else {
                room.eventDispatcher.removeEventListener(type, handler);
            }
        };
    }, [room, type, enabled, handler]);
};
