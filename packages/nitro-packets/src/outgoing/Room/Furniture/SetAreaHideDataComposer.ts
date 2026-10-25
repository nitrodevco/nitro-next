// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetAreaHideDataComposerType = {
    objectId: number;
    /** The near corner of the hidden area, in tiles. */
    rootX: number;
    rootY: number;
    width: number;
    length: number;
    /** Hide whoever stands inside it. */
    invisible: boolean;
    /** Hide the wall items inside it too. */
    wallItems: boolean;
    /** Hide everyone except whoever stands inside it. */
    inverted: boolean;
};

export class SetAreaHideDataComposer implements IOutgoingPacket<SetAreaHideDataComposerType> {
    public constructor(private params: SetAreaHideDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.rootX,
            this.params.rootY,
            this.params.width,
            this.params.length,
            this.params.invisible,
            this.params.wallItems,
            this.params.inverted,
        ];
    }
}
