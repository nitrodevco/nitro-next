import type { IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context';

export const useMessageListener = <T extends object,>(event: IncomingPacketConstructor<T>, handler: (data: T) => void, enabled: boolean = true) => {
    const { subscribe } = useWebSocketContext();

    useEffect(() => {
        if (!enabled) return;

        return subscribe(event, handler);
    }, [event, enabled, subscribe, handler]);
}
