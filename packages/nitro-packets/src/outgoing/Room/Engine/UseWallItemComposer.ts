// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UseWallItemComposerType = {
    objectId: number;
    param: number;
};

export class UseWallItemComposer implements IOutgoingPacket<UseWallItemComposerType> {
    public constructor(private params: UseWallItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.param,
        ];
    }
}
