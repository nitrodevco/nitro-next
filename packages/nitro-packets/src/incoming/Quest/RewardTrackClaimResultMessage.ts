// From the AS3 parser (`_-h19` in this build): the track, the prize and the result - 0 for success,
// 1-8 the failures `reward_track.claim.notification.fail.<code>` names.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RewardTrackClaimResultMessageType = {
    trackId: string;
    rewardId: string;
    resultCode: number;
};

export class RewardTrackClaimResultMessage implements IIncomingPacket<RewardTrackClaimResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): RewardTrackClaimResultMessageType {
        const trackId = wrapper.readString();
        const rewardId = wrapper.readString();
        const resultCode = wrapper.readInt();

        return { trackId, rewardId, resultCode };
    }
}
