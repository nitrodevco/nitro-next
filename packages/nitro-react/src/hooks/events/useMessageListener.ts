import { IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { useWebSocketContext } from '#base/context';

export const useMessageListener = <T extends object>(event: IncomingPacketConstructor<T>, handler: (data: T) => void, enabled: boolean = true) => {
    const { subscribe } = useWebSocketContext();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!enabled) return;

        return subscribe(event, x => handlerRef.current(x));
    }, [ event, enabled, subscribe ]);

    return null;
};
