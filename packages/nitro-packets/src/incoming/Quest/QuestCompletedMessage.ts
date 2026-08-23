import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestCompletedMessageType = object;

export class QuestCompletedMessage implements IIncomingPacket<QuestCompletedMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestCompletedMessageType {
        const packet: QuestCompletedMessageType = {
        };

        return packet;
    }
}
