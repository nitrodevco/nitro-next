import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { GameLobbyPlayerDataParser, IGameLobbyPlayerData } from '../../Data/GameLobbyPlayerDataParser';

export type Game2UserJoinedGameMessageType = {
    user: IGameLobbyPlayerData;
    wasTeamSwitched: boolean;
};

export class Game2UserJoinedGameMessage implements IIncomingPacket<Game2UserJoinedGameMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2UserJoinedGameMessageType {
        const user = GameLobbyPlayerDataParser(wrapper);
        const wasTeamSwitched = wrapper.readBoolean();
        return { user, wasTeamSwitched };
    }
}
