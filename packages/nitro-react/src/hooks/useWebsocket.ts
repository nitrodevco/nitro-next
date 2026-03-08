import { GetIncomingPackets } from '@nitrodevco/nitro-shared';
import { useEffect } from 'react';

import { useCommunicationStore } from './useCommunicationStore';
import { useConfigValue } from './useConfigValue';

export const useWebsocket = () => {
    const socketUrl = useConfigValue<string>('socket.url');
    const connect = useCommunicationStore(state => state.connect);
    const registerIncomingPackets = useCommunicationStore(state => state.registerIncomingPackets);
    const registerOutgoingPackets = useCommunicationStore(state => state.registerOutgoingPackets);

    useEffect(() => {
        registerIncomingPackets(GetIncomingPackets());
        //registerOutgoingPackets(GetOutgoingPackets());
    }, []);

    useEffect(() => {
        if (!socketUrl?.length) return;

        return connect(socketUrl);
    }, [socketUrl]);
};
