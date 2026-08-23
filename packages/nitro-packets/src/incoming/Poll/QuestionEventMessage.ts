import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionEventMessageType = object;

export class QuestionEventMessage implements IIncomingPacket<QuestionEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionEventMessageType {
        const packet: QuestionEventMessageType = {
        };

        return packet;
    }
}
