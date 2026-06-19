import type { IIncomingPacket } from './IIncomingPacket';

export type IncomingPacketConstructor<T extends object = object> = new () => IIncomingPacket<T>;
