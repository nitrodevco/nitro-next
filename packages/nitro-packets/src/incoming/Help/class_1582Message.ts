import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1582MessageType = object;

export class class_1582Message implements IIncomingPacket<class_1582MessageType> {
    public parse(wrapper: IMessageDataWrapper): class_1582MessageType {
        const packet: class_1582MessageType = {
        };

        return packet;
    }
}
