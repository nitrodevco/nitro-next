/**
 * `snowwar/IncomingMessages`' directory messages and its subscription status, for the games window
 * (see `gameCenterCommands`).
 */
import {
    Game2AccountGameStatusMessage, Game2GameCancelledMessage, Game2GameCreatedMessage, Game2GameDirectoryStatusMessage, Game2GameLongDataMessage, Game2GameStartedMessage, Game2InArenaQueueMessage,
    Game2JoiningGameFailedMessage, Game2StartCounterMessage, Game2StartingGameFailedMessage, Game2StopCounterMessage, Game2UserBlockedMessage, Game2UserJoinedGameMessage, Game2UserLeftGameMessage,
    ScrSendUserInfoMessage,
} from '@nitrodevco/nitro-packets';

import {
    changeGameBlockStatus, onAccountGameStatus, onGameCancelled, onGameDirectoryStatus, onGameInArenaQueue, onGameLobbyCounterStart, onGameLobbyCounterStop, onGameLobbyCreated, onGamesSubscriptionStatus,
    onGameStarted, onGameUserJoined, onGameUserLeft, onJoiningGameFailed, onStartingGameFailed,
} from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerGameCenterHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(Game2GameDirectoryStatusMessage, data => onGameDirectoryStatus(data)),
    on(Game2AccountGameStatusMessage, data => onAccountGameStatus(data.gameTypeId, data.freeGamesLeft)),
    on(ScrSendUserInfoMessage, () => onGamesSubscriptionStatus(send)),
    on(Game2GameCreatedMessage, data => onGameLobbyCreated(data.gameLobbyData)),
    on(Game2GameLongDataMessage, data => onGameLobbyCreated(data.gameLobbyData)),
    on(Game2GameStartedMessage, data => onGameStarted(send, data.lobbyData)),
    on(Game2UserJoinedGameMessage, data => onGameUserJoined(data.user)),
    on(Game2UserLeftGameMessage, data => onGameUserLeft(data.userId)),
    on(Game2StartCounterMessage, data => onGameLobbyCounterStart(data.countDownLength)),
    on(Game2StopCounterMessage, () => onGameLobbyCounterStop()),
    on(Game2InArenaQueueMessage, data => onGameInArenaQueue(data.position)),
    on(Game2GameCancelledMessage, () => onGameCancelled()),
    on(Game2JoiningGameFailedMessage, data => onJoiningGameFailed(data.reason)),
    on(Game2StartingGameFailedMessage, () => onStartingGameFailed()),
    on(Game2UserBlockedMessage, data => changeGameBlockStatus(data.playerBlockLength)),
]);
