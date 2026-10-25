// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveFromCustomFilterComposerType = {
    word: string;
};

export class RemoveFromCustomFilterComposer implements IOutgoingPacket<RemoveFromCustomFilterComposerType> {
    public constructor(private params: RemoveFromCustomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.word,
        ];
    }
}
