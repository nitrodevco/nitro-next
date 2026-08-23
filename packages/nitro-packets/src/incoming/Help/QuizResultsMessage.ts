import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuizResultsMessageType = object;

export class QuizResultsMessage implements IIncomingPacket<QuizResultsMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuizResultsMessageType {
        const packet: QuizResultsMessageType = {
        };

        return packet;
    }
}
