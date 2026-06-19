import type { IncomingPacketConstructor } from "@nitrodevco/nitro-api";
import { useRef } from "react";

export const useCommunicationIncoming = () => {
    const incomingByHeader = useRef<Map<number, IncomingPacketConstructor<object>>>(new Map());
    const incomingCtors = useRef<Set<IncomingPacketConstructor<object>>>(new Set());
    const incomingHeaderByCtor = useRef<Map<IncomingPacketConstructor<object>, number>>(new Map());

    const registerIncoming = <T extends object,>(header: number, ctor: IncomingPacketConstructor<T>) => {
        incomingByHeader.current.set(header, ctor);
        incomingCtors.current.add(ctor);
        incomingHeaderByCtor.current.set(ctor, header);
    }

    const registerManyIncoming = <T extends object,>(packets: Record<number, IncomingPacketConstructor<T>>) => {
        for (const [header, ctor] of Object.entries(packets)) registerIncoming(Number(header), ctor);
    }

    return { incomingByHeader, incomingCtors, incomingHeaderByCtor, registerIncoming, registerManyIncoming };
}