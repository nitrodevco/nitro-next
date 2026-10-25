// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetCustomStackingHeightComposerType = {
    objectId: number;
    /** Hundredths of a tile (a height of 1.5 tiles is 150), or -100 to hand the tile back to normal stacking. */
    height: number;
    /**
     * Whether everything on the helper shares one walkable level. Flash only appends this when
     * the checkbox is on screen, so it stays off the wire otherwise.
     */
    multiWalkMode?: boolean;
};

export class SetCustomStackingHeightComposer implements IOutgoingPacket<SetCustomStackingHeightComposerType> {
    public constructor(private params: SetCustomStackingHeightComposerType) { }

    public compose(): (number | string | boolean)[] {
        const message: (number | string | boolean)[] = [
            this.params.objectId,
            this.params.height,
        ];

        if (this.params.multiWalkMode !== undefined) message.push(this.params.multiWalkMode);

        return message;
    }
}
