import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IGame2SnowWarGameStats {
    playerWithMostKills: number;
    playerWithMostHits: number;
}

export const Game2SnowWarGameStatsParser = (wrapper: IMessageDataWrapper): IGame2SnowWarGameStats => {
    const data: IGame2SnowWarGameStats = {
        playerWithMostKills: 0,
        playerWithMostHits: 0,
    };

    data.playerWithMostKills = wrapper.readInt();
    data.playerWithMostHits = wrapper.readInt();

    return data;
};
