import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ObjectRemoveConfirmMessageType = object;

export class ObjectRemoveConfirmMessage implements IIncomingPacket<ObjectRemoveConfirmMessageType> {
    public parse(wrapper: IMessageDataWrapper): ObjectRemoveConfirmMessageType {
        const packet: ObjectRemoveConfirmMessageType = {
        };

        return packet;
    }
}
