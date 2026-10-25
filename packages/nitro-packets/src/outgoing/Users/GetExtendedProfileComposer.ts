// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetExtendedProfileComposerType = {
    userId: number;
    /** Whether the profile window should open with the answer; the client always asks for it. */
    openProfile?: boolean;
};

export class GetExtendedProfileComposer implements IOutgoingPacket<GetExtendedProfileComposerType> {
    public constructor(private params: GetExtendedProfileComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
            this.params.openProfile ?? true,
        ];
    }
}
