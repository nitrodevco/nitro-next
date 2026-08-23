import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestMessageType = object;

export class QuestMessage implements IIncomingPacket<QuestMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestMessageType {
        const packet: QuestMessageType = {
        };

        return packet;
    }
}
