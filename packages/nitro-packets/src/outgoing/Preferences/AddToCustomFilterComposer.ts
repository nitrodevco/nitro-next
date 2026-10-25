// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddToCustomFilterComposerType = {
    word: string;
};

export class AddToCustomFilterComposer implements IOutgoingPacket<AddToCustomFilterComposerType> {
    public constructor(private params: AddToCustomFilterComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.word,
        ];
    }
}
