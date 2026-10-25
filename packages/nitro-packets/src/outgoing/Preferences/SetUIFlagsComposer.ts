// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetUIFlagsComposerType = {
    /** The whole flag word, not one flag: the client keeps it and re-sends it every time a bit moves. */
    flags: number;
};

export class SetUIFlagsComposer implements IOutgoingPacket<SetUIFlagsComposerType> {
    public constructor(private params: SetUIFlagsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.flags,
        ];
    }
}
