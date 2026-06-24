import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollAnswerComposerType = object;

export class PollAnswerComposer implements IOutgoingPacket<PollAnswerComposerType> {
    public constructor(private params: PollAnswerComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
