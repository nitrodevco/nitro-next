// From the AS3 parser (`_-t1D` in this build): the track, the result - 0 for success, 1-9 the
// failures `reward_track.premium.notification.fail.<code>` names - and the track's points after it.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RewardTrackPremiumPurchaseResultMessageType = {
    trackId: string;
    resultCode: number;
    points: number;
};

export class RewardTrackPremiumPurchaseResultMessage implements IIncomingPacket<RewardTrackPremiumPurchaseResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): RewardTrackPremiumPurchaseResultMessageType {
        const trackId = wrapper.readString();
        const resultCode = wrapper.readInt();
        const points = wrapper.readInt();

        return { trackId, resultCode, points };
    }
}
