// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetItemDataComposerType = {
    objectId: number;
};

export class GetItemDataComposer implements IOutgoingPacket<GetItemDataComposerType> {
    public constructor(private params: GetItemDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
