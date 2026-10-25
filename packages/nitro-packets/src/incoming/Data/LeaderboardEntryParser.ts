import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ILeaderboardEntry {
    userId: number;
    score: number;
    rank: number;
    name: string;
    figure: string;
    gender: string;
}

export const LeaderboardEntryParser = (wrapper: IMessageDataWrapper): ILeaderboardEntry => {
    const data: ILeaderboardEntry = {
        userId: 0,
        score: 0,
        rank: 0,
        name: '',
        figure: '',
        gender: '',
    };

    data.userId = wrapper.readInt();
    data.score = wrapper.readInt();
    data.rank = wrapper.readInt();
    data.name = wrapper.readString();
    data.figure = wrapper.readString();
    data.gender = wrapper.readString();

    return data;
};
