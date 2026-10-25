// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/** `CommunityGoalProgressMessageParser` and `CommunityGoalData`: the live campaign meter values. */
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface CommunityGoalProgressMessageType {
    hasGoalExpired: boolean;
    personalContributionScore: number;
    personalContributionRank: number;
    communityTotalScore: number;
    communityHighestAchievedLevel: number;
    scoreRemainingUntilNextLevel: number;
    percentCompletionTowardsNextLevel: number;
    goalCode: string;
    timeRemainingInSeconds: number;
    rewardUserLimits: number[];
}

export class CommunityGoalProgressMessage implements IIncomingPacket<CommunityGoalProgressMessageType> {
    public parse(wrapper: IMessageDataWrapper): CommunityGoalProgressMessageType {
        const packet: CommunityGoalProgressMessageType = {
            hasGoalExpired: wrapper.readBoolean(),
            personalContributionScore: wrapper.readInt(),
            personalContributionRank: wrapper.readInt(),
            communityTotalScore: wrapper.readInt(),
            communityHighestAchievedLevel: wrapper.readInt(),
            scoreRemainingUntilNextLevel: wrapper.readInt(),
            percentCompletionTowardsNextLevel: wrapper.readInt(),
            goalCode: wrapper.readString(),
            timeRemainingInSeconds: wrapper.readInt(),
            rewardUserLimits: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.rewardUserLimits.push(wrapper.readInt());
            count--;
        }

        return packet;
    }
}
