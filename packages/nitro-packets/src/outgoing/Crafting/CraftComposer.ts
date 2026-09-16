// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CraftComposerType = {
    objectId: number;
    /** The recipe to make, named as the craftable products listed it. */
    recipeCode: string;
};

export class CraftComposer implements IOutgoingPacket<CraftComposerType> {
    public constructor(private params: CraftComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.recipeCode,
        ];
    }
}
