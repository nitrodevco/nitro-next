// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenComposerType = {
    id: number;
};

export class OpenComposer implements IOutgoingPacket<OpenComposerType> {
    public constructor(private params: OpenComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.id,
        ];
    }
}
