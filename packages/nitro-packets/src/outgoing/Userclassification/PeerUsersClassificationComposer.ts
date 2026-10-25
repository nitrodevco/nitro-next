// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PeerUsersClassificationComposerType = {
    /** The classification `:uc hotel <type>` asks for, across the hotel. */
    classification: string;
};

export class PeerUsersClassificationComposer implements IOutgoingPacket<PeerUsersClassificationComposerType> {
    public constructor(private params: PeerUsersClassificationComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.classification,
        ];
    }
}
