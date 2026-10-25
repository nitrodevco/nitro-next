// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenMysteryTrophyComposerType = {
    objectId: number;
    /** What the winner wants engraved on it; it cannot be changed afterwards. */
    inscription: string;
};

export class OpenMysteryTrophyComposer implements IOutgoingPacket<OpenMysteryTrophyComposerType> {
    public constructor(private params: OpenMysteryTrophyComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.inscription,
        ];
    }
}
