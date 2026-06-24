export interface IOutgoingPacket<T extends object> {
    compose(): (number | string | boolean)[];
}
