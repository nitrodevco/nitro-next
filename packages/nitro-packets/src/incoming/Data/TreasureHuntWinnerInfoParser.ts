import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ITreasureHuntWinnerInfo {
    huntId: string;
    userId: number;
    userName: string;
    userFigure: string;
    userGender: string;
}

export const TreasureHuntWinnerInfoParser = (wrapper: IMessageDataWrapper): ITreasureHuntWinnerInfo => {
    const data: ITreasureHuntWinnerInfo = {
        huntId: '',
        userId: 0,
        userName: '',
        userFigure: '',
        userGender: '',
    };

    data.huntId = wrapper.readString();
    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.userFigure = wrapper.readString();
    data.userGender = wrapper.readString();

    return data;
};
