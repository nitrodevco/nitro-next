import { IGameLobbyPlayerData } from '../../../Data/GameLobbyPlayerDataParser';

/** `GameLobbyData`: a game lobby and the players in it. */
export interface IGameLobbyData {
    gameId: number;
    levelName: string;
    gameType: number;
    fieldType: number;
    numberOfTeams: number;
    maximumPlayers: number;
    owningPlayerName: string;
    levelEntryId: number;
    players: IGameLobbyPlayerData[];
}
