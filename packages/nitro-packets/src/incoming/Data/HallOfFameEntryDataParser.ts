import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IHallOfFameEntryData {
    userId: number;
    userName: string;
    figure: string;
    rank: number;
    currentScore: number;
}

export const HallOfFameEntryDataParser = (wrapper: IMessageDataWrapper): IHallOfFameEntryData => {
    const data: IHallOfFameEntryData = {
        userId: 0,
        userName: '',
        figure: '',
        rank: 0,
        currentScore: 0,
    };

    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figure = wrapper.readString();
    data.rank = wrapper.readInt();
    data.currentScore = wrapper.readInt();

    return data;
};
