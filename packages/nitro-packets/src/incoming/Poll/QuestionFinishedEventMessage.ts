import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionFinishedEventMessageType = object;

export class QuestionFinishedEventMessage implements IIncomingPacket<QuestionFinishedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionFinishedEventMessageType {
        const packet: QuestionFinishedEventMessageType = {
        };

        return packet;
    }
}
