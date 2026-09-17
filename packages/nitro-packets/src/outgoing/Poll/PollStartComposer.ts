// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollStartComposerType = {
    pollId: number;
};

export class PollStartComposer implements IOutgoingPacket<PollStartComposerType> {
    public constructor(private params: PollStartComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pollId,
        ];
    }
}
