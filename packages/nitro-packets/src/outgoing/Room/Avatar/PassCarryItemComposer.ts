// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PassCarryItemComposerType = {
    userId: number;
};

export class PassCarryItemComposer implements IOutgoingPacket<PassCarryItemComposerType> {
    public constructor(private params: PassCarryItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}
