// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveAllRightsComposerType = {
    roomId: number;
};

export class RemoveAllRightsComposer implements IOutgoingPacket<RemoveAllRightsComposerType> {
    public constructor(private params: RemoveAllRightsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
