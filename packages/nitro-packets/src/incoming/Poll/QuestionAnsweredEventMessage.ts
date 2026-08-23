import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionAnsweredEventMessageType = object;

export class QuestionAnsweredEventMessage implements IIncomingPacket<QuestionAnsweredEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionAnsweredEventMessageType {
        const packet: QuestionAnsweredEventMessageType = {
        };

        return packet;
    }
}
