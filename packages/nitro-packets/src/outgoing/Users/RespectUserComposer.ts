// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RespectUserComposerType = {
    userId: number;
};

export class RespectUserComposer implements IOutgoingPacket<RespectUserComposerType> {
    public constructor(private params: RespectUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}
