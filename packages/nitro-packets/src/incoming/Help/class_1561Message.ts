import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1561MessageType = object;

export class class_1561Message implements IIncomingPacket<class_1561MessageType> {
    public parse(wrapper: IMessageDataWrapper): class_1561MessageType {
        const packet: class_1561MessageType = {
        };

        return packet;
    }
}
