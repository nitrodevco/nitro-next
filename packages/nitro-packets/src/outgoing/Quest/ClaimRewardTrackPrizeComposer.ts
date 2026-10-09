// From the AS3 `ClaimRewardTrackPrizeMessageComposer`: the track id, then the prize id.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClaimRewardTrackPrizeComposerType = {
    trackId: string;
    prizeId: string;
};

export class ClaimRewardTrackPrizeComposer implements IOutgoingPacket<ClaimRewardTrackPrizeComposerType> {
    public constructor(private params: ClaimRewardTrackPrizeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.trackId,
            this.params.prizeId,
        ];
    }
}
