import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2AccountGameStatusMessageType = {
    gameTypeId: number;
    freeGamesLeft: number;
    gamesPlayedTotal: number;
};

export class Game2AccountGameStatusMessage implements IIncomingPacket<Game2AccountGameStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2AccountGameStatusMessageType {
        const gameTypeId = wrapper.readInt();
        const freeGamesLeft = wrapper.readInt();
        const gamesPlayedTotal = wrapper.readInt();
        return { gameTypeId, freeGamesLeft, gamesPlayedTotal };
    }
}
