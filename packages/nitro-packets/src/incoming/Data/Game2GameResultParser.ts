import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IGame2GameResult {
    isDeathMatch: boolean;
    resultType: number;
    winnerId: number;
}

export const Game2GameResultParser = (wrapper: IMessageDataWrapper): IGame2GameResult => {
    const data: IGame2GameResult = {
        isDeathMatch: false,
        resultType: 0,
        winnerId: 0,
    };

    data.isDeathMatch = wrapper.readBoolean();
    data.resultType = wrapper.readInt();
    data.winnerId = wrapper.readInt();

    return data;
}
