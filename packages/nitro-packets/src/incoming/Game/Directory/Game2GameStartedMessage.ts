import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { GameLobbyDataParser } from './Data/GameLobbyDataParser';
import { IGameLobbyData } from './Data/IGameLobbyData';

export type Game2GameStartedMessageType = {
    lobbyData: IGameLobbyData;
};

export class Game2GameStartedMessage implements IIncomingPacket<Game2GameStartedMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2GameStartedMessageType {
        const lobbyData = GameLobbyDataParser(wrapper);
        return { lobbyData };
    }
}
