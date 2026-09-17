// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionAnsweredEventMessageType = {
    /** Who answered - the room shows their answer over their head. */
    userId: number;
    /** The choice value they picked; the in-room quiz only ever sends "0" or "1". */
    value: string;
    /** The running tally so far, keyed by choice value. */
    answerCounts: Record<string, number>;
};

export class QuestionAnsweredEventMessage implements IIncomingPacket<QuestionAnsweredEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionAnsweredEventMessageType {
        const packet: QuestionAnsweredEventMessageType = {
            userId: wrapper.readInt(),
            value: wrapper.readString(),
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
