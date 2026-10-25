import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuizDataMessageType = object;

export class QuizDataMessage implements IIncomingPacket<QuizDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuizDataMessageType {
        const packet: QuizDataMessageType = {
        };

        return packet;
    }
}
