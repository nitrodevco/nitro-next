// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PresentOpenComposerType = {
    objectId: number;
};

export class PresentOpenComposer implements IOutgoingPacket<PresentOpenComposerType> {
    public constructor(private params: PresentOpenComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
