import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameDirectoryStatusMessageType = {
    status: number;
    blockLength: number;
    gamesPlayed: number;
    freeGamesLeft: number;
};

export class Game2GameDirectoryStatusMessage implements IIncomingPacket<Game2GameDirectoryStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2GameDirectoryStatusMessageType {
        const status = wrapper.readInt();
        const blockLength = wrapper.readInt();
        const gamesPlayed = wrapper.readInt();
        const freeGamesLeft = wrapper.readInt();
        return { status, blockLength, gamesPlayed, freeGamesLeft };
    }
}
