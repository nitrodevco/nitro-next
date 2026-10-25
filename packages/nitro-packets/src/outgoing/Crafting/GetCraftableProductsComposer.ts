// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftableProductsComposerType = {
    objectId: number;
};

export class GetCraftableProductsComposer implements IOutgoingPacket<GetCraftableProductsComposerType> {
    public constructor(private params: GetCraftableProductsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
