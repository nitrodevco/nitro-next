// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PollRejectComposerType = {
    pollId: number;
};

export class PollRejectComposer implements IOutgoingPacket<PollRejectComposerType> {
    public constructor(private params: PollRejectComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pollId,
        ];
    }
}
