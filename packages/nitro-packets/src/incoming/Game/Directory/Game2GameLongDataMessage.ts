import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { GameLobbyDataParser } from './Data/GameLobbyDataParser';
import { IGameLobbyData } from './Data/IGameLobbyData';

export type Game2GameLongDataMessageType = {
    gameLobbyData: IGameLobbyData;
};

export class Game2GameLongDataMessage implements IIncomingPacket<Game2GameLongDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2GameLongDataMessageType {
        const gameLobbyData = GameLobbyDataParser(wrapper);
        return { gameLobbyData };
    }
}
