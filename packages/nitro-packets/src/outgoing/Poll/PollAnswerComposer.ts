// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollAnswerComposerType = {
    pollId: number;
    questionId: number;
    /** One entry per chosen answer; a text question sends the single line the user typed. */
    answers: string[];
};

export class PollAnswerComposer implements IOutgoingPacket<PollAnswerComposerType> {
    public constructor(private params: PollAnswerComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [];

        data.push(this.params.pollId);
        data.push(this.params.questionId);
        data.push(this.params.answers.length);

        let i = 0;

        while (i < this.params.answers.length) {
            data.push(String(this.params.answers[i]));

            i++;
        }

        return data;
    }
}
