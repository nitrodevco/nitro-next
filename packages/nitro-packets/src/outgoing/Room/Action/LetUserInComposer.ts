// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LetUserInComposerType = {
    /** Whoever rang - the doorbell names them, not the room. */
    username: string;
    /** True lets them in, false turns them away. */
    canEnter: boolean;
};

export class LetUserInComposer implements IOutgoingPacket<LetUserInComposerType> {
    public constructor(private params: LetUserInComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.username,
            this.params.canEnter,
        ];
    }
}
