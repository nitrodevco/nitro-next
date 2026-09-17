import { NitroEvent } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { useRoom } from '#base/context/room';

export const useRoomEventDispatcher = <T extends NitroEvent>(
    type: string | string[],
    handler: (event: T) => void,
    enabled: boolean = true,
) => {
    const room = useRoom();
    const handlerRef = useRef(handler);
    // Callers pass array literals, a new array each render: the listeners follow the names, not the array.
    const typeKey = Array.isArray(type) ? type.join('|') : type;

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!room || !enabled) return;

        /*
         * One stable listener that calls whatever handler the latest render passed. Registering
         * the handler itself would pin the one from the render the effect ran in, so a listener
         * would keep reading that render's props and state - a bubble would go on following the
         * object it was first given.
         */
        const listener = (event: T) => handlerRef.current(event);
        const types = typeKey.split('|');

        for (const name of types) room.eventDispatcher.addEventListener(name, listener);

        return () => {
            for (const name of types) room.eventDispatcher.removeEventListener(name, listener);
        };
    }, [ room, typeKey, enabled ]);
};
