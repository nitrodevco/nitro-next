import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ICommunityGoalData {
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

export const CommunityGoalDataParser = (wrapper: IMessageDataWrapper): ICommunityGoalData => {
    const data: ICommunityGoalData = {
        hasGoalExpired: false,
        personalContributionScore: 0,
        personalContributionRank: 0,
        communityTotalScore: 0,
        communityHighestAchievedLevel: 0,
        scoreRemainingUntilNextLevel: 0,
        percentCompletionTowardsNextLevel: 0,
        goalCode: '',
        timeRemainingInSeconds: 0,
        rewardUserLimits: [],
    };

    data.hasGoalExpired = wrapper.readBoolean();
    data.personalContributionScore = wrapper.readInt();
    data.personalContributionRank = wrapper.readInt();
    data.communityTotalScore = wrapper.readInt();
    data.communityHighestAchievedLevel = wrapper.readInt();
    data.scoreRemainingUntilNextLevel = wrapper.readInt();
    data.percentCompletionTowardsNextLevel = wrapper.readInt();
    data.goalCode = wrapper.readString();
    data.timeRemainingInSeconds = wrapper.readInt();
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        data.rewardUserLimits.push(wrapper.readInt());
        v1--;
    }

    return data;
};
