import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IGameLobbyPlayerData {
    userId: number;
    name: string;
    figure: string;
    gender: string;
    teamId: number;
    skillLevel: number;
    totalScore: number;
    scoreToNextLevel: number;
}

export const GameLobbyPlayerDataParser = (wrapper: IMessageDataWrapper): IGameLobbyPlayerData => {
    const data: IGameLobbyPlayerData = {
        userId: 0,
        name: '',
        figure: '',
        gender: '',
        teamId: 0,
        skillLevel: 0,
        totalScore: 0,
        scoreToNextLevel: 0,
    };

    data.userId = wrapper.readInt();
    data.name = wrapper.readString();
    data.figure = wrapper.readString();
    data.gender = wrapper.readString();
    data.teamId = wrapper.readInt();
    data.skillLevel = wrapper.readInt();
    data.totalScore = wrapper.readInt();
    data.scoreToNextLevel = wrapper.readInt();

    return data;
};
