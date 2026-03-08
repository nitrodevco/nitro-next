import type { IOutgoingPacket } from './IOutgoingPacket';

export type OutgoingPacketConstructor<T = any> = new (params: T) => IOutgoingPacket<T>;
