import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { GameLobbyDataParser } from './Data/GameLobbyDataParser';
import { IGameLobbyData } from './Data/IGameLobbyData';

export type Game2GameCreatedMessageType = {
    gameLobbyData: IGameLobbyData;
};

export class Game2GameCreatedMessage implements IIncomingPacket<Game2GameCreatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2GameCreatedMessageType {
        const gameLobbyData = GameLobbyDataParser(wrapper);
        return { gameLobbyData };
    }
}
