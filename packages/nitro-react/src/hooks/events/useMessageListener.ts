import type { IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { useCommunicationStore } from '../useCommunicationStore';


export const useMessageListener = <T>(
    event: IncomingPacketConstructor<T>,
    handler: (data: T) => void,
    enabled: boolean = true,
) => {
    const subscribe = useCommunicationStore(state => state.subscribe);

    useEffect(() => {
        if (!enabled) return;

        return subscribe(event, handler);
    }, [event, handler, enabled, subscribe]);
};
