// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetClothingChangeDataComposerType = {
    objectId: number;
    /** Which of the booth's two outfits is being replaced: "M" or "F". */
    gender: string;
    /** The outfit itself. The booth keeps one per gender and only this one changes. */
    figure: string;
};

export class SetClothingChangeDataComposer implements IOutgoingPacket<SetClothingChangeDataComposerType> {
    public constructor(private params: SetClothingChangeDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.gender,
            this.params.figure,
        ];
    }
}
