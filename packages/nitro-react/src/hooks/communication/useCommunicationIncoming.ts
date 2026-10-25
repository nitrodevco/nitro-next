import { IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { useRef } from 'react';

/**
 * The socket's incoming packet registry: which parser class a header maps to, and back. The
 * `WebSocketContextProvider` fills it from the header maps and decodes with it.
 */
export const useCommunicationIncoming = () => {
    const incomingByHeader = useRef<Map<number, IncomingPacketConstructor<object>>>(new Map());
    const incomingCtors = useRef<Set<IncomingPacketConstructor<object>>>(new Set());
    const incomingHeaderByCtor = useRef<Map<IncomingPacketConstructor<object>, number>>(new Map());

    const registerIncoming = <T extends object>(header: number, ctor: IncomingPacketConstructor<T>) => {
        incomingByHeader.current.set(header, ctor);
        incomingCtors.current.add(ctor);
        incomingHeaderByCtor.current.set(ctor, header);
    };

    /** Takes a header's parser out again - a client module's, when the module stops. */
    const unregisterIncoming = (header: number) => {
        const ctor = incomingByHeader.current.get(header);

        if (!ctor) return;

        incomingByHeader.current.delete(header);
        incomingCtors.current.delete(ctor);
        incomingHeaderByCtor.current.delete(ctor);
    };

    const registerManyIncoming = <T extends object>(packets: Record<number, IncomingPacketConstructor<T>>) => {
        for (const [ header, ctor ] of Object.entries(packets)) registerIncoming(Number(header), ctor);
    };

    return { incomingByHeader, incomingCtors, incomingHeaderByCtor, registerIncoming, unregisterIncoming, registerManyIncoming };
};
