import type { IOutgoingPacket } from './IOutgoingPacket';

export type OutgoingPacketConstructor<T extends object = object> = new (
    params: T
) => IOutgoingPacket<T>;
