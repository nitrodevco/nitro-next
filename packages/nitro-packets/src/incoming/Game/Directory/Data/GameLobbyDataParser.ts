import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { GameLobbyPlayerDataParser } from '../../../Data/GameLobbyPlayerDataParser';
import { IGameLobbyData } from './IGameLobbyData';

export const GameLobbyDataParser = (wrapper: IMessageDataWrapper): IGameLobbyData => {
    const gameId = wrapper.readInt();
    const levelName = wrapper.readString();
    const gameType = wrapper.readInt();
    const fieldType = wrapper.readInt();
    const numberOfTeams = wrapper.readInt();
    const maximumPlayers = wrapper.readInt();
    const owningPlayerName = wrapper.readString();
    const levelEntryId = wrapper.readInt();
    const players = ParseArray(wrapper, GameLobbyPlayerDataParser);
    return { gameId, levelName, gameType, fieldType, numberOfTeams, maximumPlayers, owningPlayerName, levelEntryId, players };
};
