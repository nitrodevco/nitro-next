// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnignoreUserComposerType = {
    userId: number;
};

export class UnignoreUserComposer implements IOutgoingPacket<UnignoreUserComposerType> {
    public constructor(private params: UnignoreUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
        ];
    }
}
