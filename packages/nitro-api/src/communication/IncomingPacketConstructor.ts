import type { IIncomingPacket } from './IIncomingPacket';

export type IncomingPacketConstructor<T = any> = new (...args: any[]) => IIncomingPacket<T>;
