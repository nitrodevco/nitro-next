// From the AS3 composer (`_-A6` in this build, `RewardTrackController.purchasePremium`): the track id.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseRewardTrackPremiumComposerType = {
    trackId: string;
};

export class PurchaseRewardTrackPremiumComposer implements IOutgoingPacket<PurchaseRewardTrackPremiumComposerType> {
    public constructor(private params: PurchaseRewardTrackPremiumComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.trackId,
        ];
    }
}
