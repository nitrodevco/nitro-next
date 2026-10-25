// Body filled by hand from the packet generator output - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `GetTalentTrackMessageComposer` (1914): the talent track to send (`helper` or `citizenship`). */
export type GetTalentTrackComposerType = {
    trackName: string;
};

export class GetTalentTrackComposer implements IOutgoingPacket<GetTalentTrackComposerType> {
    public constructor(private params: GetTalentTrackComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.trackName,
        ];
    }
}
