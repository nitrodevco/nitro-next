import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type class_1476MessageType = object;

export class class_1476Message implements IIncomingPacket<class_1476MessageType> {
    public parse(wrapper: IMessageDataWrapper): class_1476MessageType {
        const packet: class_1476MessageType = {
        };

        return packet;
    }
}
