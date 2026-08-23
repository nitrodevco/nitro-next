import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestDailyMessageType = object;

export class QuestDailyMessage implements IIncomingPacket<QuestDailyMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestDailyMessageType {
        const packet: QuestDailyMessageType = {
        };

        return packet;
    }
}
