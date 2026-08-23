import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IBadgeLeaderboardEntryData {
    userId: number;
    userName: string;
    figureString: string;
    rank: number;
    score: number;
}

export const BadgeLeaderboardEntryDataParser = (wrapper: IMessageDataWrapper): IBadgeLeaderboardEntryData => {
    const data: IBadgeLeaderboardEntryData = {
        userId: 0,
        userName: '',
        figureString: '',
        rank: 0,
        score: 0,
    };

    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figureString = wrapper.readString();
    data.rank = wrapper.readInt();
    data.score = wrapper.readInt();

    return data;
};
