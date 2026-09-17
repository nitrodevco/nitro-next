// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * How a question is answered, as `PollContentDialog` switched on it. Only the two choice kinds
 * carry a list of answers; the two text kinds differ only in how much room the field is given.
 */
export enum PollQuestionType {
    SingleChoice = 1,
    MultipleChoice = 2,
    TextLine = 3,
    TextArea = 4,
}

export interface IPollChoice {
    value: string;
    choiceText: string;
    choiceType: number;
}

export interface IPollQuestion {
    questionId: number;
    sortOrder: number;
    questionType: PollQuestionType;
    questionText: string;
    questionCategory: number;
    questionAnswerType: number;
    /** How many choices follow, and for a text question how many lines the answer may run to. */
    questionAnswerCount: number;
    questionChoices: IPollChoice[];
    /** Sub-questions asked on the same page as their parent. */
    children: IPollQuestion[];
}

export type PollContentsEventMessageType = {
    id: number;
    startMessage: string;
    endMessage: string;
    questions: IPollQuestion[];
    /** A net-promoter poll, which Flash drew as one row of numbered buttons. */
    npsPoll: boolean;
};

const parseQuestion = (wrapper: IMessageDataWrapper): IPollQuestion => {
    const question: IPollQuestion = {
        questionId: wrapper.readInt(),
        sortOrder: wrapper.readInt(),
        questionType: wrapper.readInt(),
        questionText: wrapper.readString(),
        questionCategory: wrapper.readInt(),
        questionAnswerType: wrapper.readInt(),
        questionAnswerCount: wrapper.readInt(),
        questionChoices: [],
        children: [],
    };

    if ((question.questionType === PollQuestionType.SingleChoice) || (question.questionType === PollQuestionType.MultipleChoice)) {
        let index = 0;

        while (index < question.questionAnswerCount) {
            question.questionChoices.push({
                value: wrapper.readString(),
                choiceText: wrapper.readString(),
                choiceType: wrapper.readInt(),
            });

            index++;
        }
    }

    return question;
};

export class PollContentsEventMessage implements IIncomingPacket<PollContentsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PollContentsEventMessageType {
        const packet: PollContentsEventMessageType = {
            id: wrapper.readInt(),
            startMessage: wrapper.readString(),
            endMessage: wrapper.readString(),
            questions: [],
            npsPoll: false,
        };

        let count = wrapper.readInt();

        while (count > 0) {
            const question = parseQuestion(wrapper);

            let children = wrapper.readInt();

            while (children > 0) {
                question.children.push(parseQuestion(wrapper));

                children--;
            }

            packet.questions.push(question);

            count--;
        }

        packet.npsPoll = wrapper.readBoolean();

        return packet;
    }
}
