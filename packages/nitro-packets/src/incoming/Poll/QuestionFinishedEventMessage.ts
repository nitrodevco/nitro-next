// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionFinishedEventMessageType = {
    questionId: number;
    /** The final tally, keyed by choice value. */
    answerCounts: Record<string, number>;
};

export class QuestionFinishedEventMessage implements IIncomingPacket<QuestionFinishedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionFinishedEventMessageType {
        const packet: QuestionFinishedEventMessageType = {
            questionId: wrapper.readInt(),
            answerCounts: {},
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const key = wrapper.readString();

            packet.answerCounts[key] = wrapper.readInt();

            count--;
        }

        return packet;
    }
}
