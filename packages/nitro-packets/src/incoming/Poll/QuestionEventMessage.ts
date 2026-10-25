// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** The question types the in-room quiz sends; only the two choice kinds carry selections. */
const QUESTION_TYPE_SINGLE_CHOICE = 1;
const QUESTION_TYPE_MULTIPLE_CHOICE = 2;

export type QuestionEventMessageType = {
    pollType: string;
    pollId: number;
    /** The question's own id in the poll - not the same as the one inside `question`. */
    questionId: number;
    /** How long the room has to answer, in milliseconds; zero for a question with no clock. */
    duration: number;
    question: {
        id: number;
        number: number;
        type: number;
        content: string;
        /** How few may be picked, for a multiple-choice question. */
        selectionMin: number;
        /** What each choice is worth on the wire, paired with what it says. */
        selectionValues: string[];
        selections: string[];
    };
};

export class QuestionEventMessage implements IIncomingPacket<QuestionEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): QuestionEventMessageType {
        const packet: QuestionEventMessageType = {
            pollType: wrapper.readString(),
            pollId: wrapper.readInt(),
            questionId: wrapper.readInt(),
            duration: wrapper.readInt(),
            question: {
                id: wrapper.readInt(),
                number: wrapper.readInt(),
                type: wrapper.readInt(),
                content: wrapper.readString(),
                selectionMin: 0,
                selectionValues: [],
                selections: [],
            },
        };

        const { question } = packet;

        if ((question.type === QUESTION_TYPE_SINGLE_CHOICE) || (question.type === QUESTION_TYPE_MULTIPLE_CHOICE)) {
            question.selectionMin = wrapper.readInt();

            let count = wrapper.readInt();

            while (count > 0) {
                question.selectionValues.push(wrapper.readString());
                question.selections.push(wrapper.readString());

                count--;
            }
        }

        return packet;
    }
}
