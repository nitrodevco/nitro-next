/**
 * The games window - Flash's `HabboGameManager` (the toolbar's games icon), `SnowWarEngine`'s
 * account and lobby state, `snowwar/IncomingMessages` (the `Game2*` directory messages and the
 * subscription status), `GamesMainViewController` (`games_main`) and `GameLobbyWindowCtrl` (its
 * `snowwar_lobby_cont`).
 *
 * - The games icon asks the directory (`Game2CheckGameDirectoryStatus`) and the token offers; a
 *   directory status `0` blocks the play button for its `blockLength`, shows the window
 *   (`toggleVisibility`) and sets the games left.
 * - Every subscription status asks the account game status of game type 0; outside a lobby, and
 *   with the game centre off (`game.center.enabled`, or `game.center.enabled.forStaff` for
 *   security 4), it shows the open window's quick play part again (`openMainWindow(false)`).
 * - A created lobby (`Game2GameCreated` / `Game2GameLongData`) opens the lobby part with its
 *   arena's name, slots and players; players join and leave, a countdown starts and stops; the
 *   lobby's cancel leaves the game and goes back to quick play (the game centre off) or closes the
 *   window; a cancelled game goes back to quick play.
 * - A started game whose type is not 0 is a room game of the server's: its players are sent to a
 *   room, so the window closes (inference - Flash knows game type 0 only, whose arena loading view
 *   `Game2GameStarted` shows and whose `Game2EnterArena` closes the window; that arena is not
 *   part of this client).
 */
import type { Game2GameDirectoryStatusMessageType, IGameLobbyData, IGameLobbyPlayerData } from '@nitrodevco/nitro-packets';
import {
    EventLogComposer, Game2CheckGameDirectoryStatusComposer, Game2GetAccountGameStatusComposer, Game2LeaveGameComposer, Game2QuickJoinGameComposer, GetSnowWarGameTokensOfferComposer,
} from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { gameCenterStore, GameLobbyView, GameLobbyWaitText } from '#base/context/game-center';
import { configBoolean, systemStore } from '#base/context/system';
import { ClientGates, hasClientGate } from '#base/context/user';

import { openClubCenter } from '../catalog/catalogClubCommands';
import { buySnowWarTokensOffer } from '../game-tokens/gameTokensCommands';

/** `INSTRUCTION_ASSETS` and `INSTRUCTION_FRAME_COUNTS`: each instruction page's animation. */
export const GAME_INSTRUCTION_PAGES = [ { prefix: 'move_', frames: 4 }, { prefix: 'throw_1_', frames: 4 }, { prefix: 'throw_2_', frames: 5 }, { prefix: 'throw_3_', frames: 5 }, { prefix: 'balls_', frames: 5 } ];

/** `INSTRUCTION_FRAME_LENGTH`. */
export const GAME_INSTRUCTION_FRAME_LENGTH = 1000;

/** `play.button`'s colours: `checkGameAmountStatus` / an unblocked button, and a blocked one. */
export const GAME_PLAY_BUTTON_COLOR = 0x55CC00;
export const GAME_PLAY_BUTTON_BLOCKED_COLOR = 0xCCCCCC;

/** `games_left_stroke`'s text colours: no games left, and some. */
export const GAMES_LEFT_NONE_COLOR = 0xFF0000;
export const GAMES_LEFT_COLOR = 0x1077AC;

/** `GamesMainViewController`'s three buy buttons and the localization id of the offer each buys. */
export const GAME_TOKEN_BUTTONS: Record<string, string> = {
    btn_more_games_10: 'GET_SNOWWAR_TOKENS',
    btn_more_games_100: 'GET_SNOWWAR_TOKENS2',
    btn_more_games_300: 'GET_SNOWWAR_TOKENS3',
};

/** The game type `SnowWarEngine.gamesLeft` and the subscription status's account status are for. */
const SNOWWAR_GAME_TYPE = 0;

/** `Game2JoiningGameFailedMessageParser`'s reasons `onJoiningGameFailed` names. */
const JOINING_FAILED_TEXTS: Record<number, string> = {
    2: 'snowwar.error.duplicate_machineid',
    6: 'snowwar.error.has_active_instance',
    7: 'snowwar.error.has_active_instance',
    8: 'snowwar.error.no_free_games_left',
};

/** `HabboGameManager.gameCenterEnabled`. */
export const isGameCenterEnabled = () => configBoolean('game.center.enabled') || (configBoolean('game.center.enabled.forStaff') && hasClientGate(ClientGates.GameCenterForStaff));

/** `SnowWarEngine.logGameEvent`. */
const logGameEvent = (send: Send, action: string) => send(new EventLogComposer({ event: 'GameFramework', data: 'SnowStorm', action, extraString: '', extraInt: gameCenterStore.getState().freeGamesLeft }));

/** `SnowWarEngine.alert`'s dialog (`§_-O2H§`), replaced by the next one. */
let alertId: number | undefined;

/** `SnowWarEngine.alert`: the previous alert taken down (`removeOldAlert`) and a new one raised. */
const alert = (key: string) => {
    const { closeDialog, interpolate, showAlert } = systemStore.getState();

    if (alertId !== undefined) closeDialog(alertId);

    alertId = showAlert('SnowWar Alert', interpolate(`\${${key}}`), { onClose: () => (alertId = undefined) });
};

// --- The play block (`changeBlockStatus` / `onTick` / `disposeCounter`) ---

/** `§_-Y1C§`: a `Timer(1000, seconds)` and the ticks it has left. */
let blockTimer: ReturnType<typeof setInterval> | undefined;

const disposeBlockCounter = () => {
    if (blockTimer !== undefined) clearInterval(blockTimer);

    blockTimer = undefined;
    gameCenterStore.getState().setBlockSeconds(0);
};

/** `GamesMainViewController.changeBlockStatus`: the play button blocked for `seconds`, counted down each second. */
export const changeGameBlockStatus = (seconds: number) => {
    if (seconds <= 0) return;

    gameCenterStore.getState().setBlockSeconds(seconds);

    if (blockTimer !== undefined) return;

    let ticks = seconds;

    blockTimer = setInterval(() => {
        const { blockSeconds, setBlockSeconds } = gameCenterStore.getState();

        if (blockSeconds > 0) setBlockSeconds(blockSeconds - 1);
        if (gameCenterStore.getState().blockSeconds <= 0) disposeBlockCounter();
        else if (--ticks <= 0) {
            clearInterval(blockTimer);
            blockTimer = undefined;
        }
    }, 1000);
};

// --- The lobby (`GameLobbyWindowCtrl`) ---

/** `§_-b1l§`: the lobby's countdown `Timer(1000, seconds)`. */
let countdownTimer: ReturnType<typeof setInterval> | undefined;

/** `updateDialog`'s `wait_text`: the countdown, else the queue position, else waiting for players. */
const waitText = (countdown: number, queuePosition: number): GameLobbyWaitText => {
    if (countdown >= 0) return { key: 'snowwar.lobby_game_start_countdown', parameters: { seconds: String(countdown) } };
    if (queuePosition >= 0) return { key: 'snowwar.lobby_arena_queue_position', parameters: { position: String(queuePosition) } };

    return { key: 'snowwar.lobby_waiting_for_more_players' };
};

/** `updateDialog`: the wait text from the lobby's countdown and queue position as they are now. */
const updateLobbyDialog = (update: Partial<GameLobbyView> = {}) => {
    const { lobby, updateLobby } = gameCenterStore.getState();

    if (!lobby) return;

    const next = { ...lobby, ...update };

    updateLobby({ ...update, waitText: waitText(next.countdown, next.queuePosition) });
};

/** `disposeCountdownTimer`: the timer stopped and the countdown cleared. */
const disposeCountdownTimer = () => {
    if (countdownTimer !== undefined) clearInterval(countdownTimer);

    countdownTimer = undefined;
    gameCenterStore.getState().updateLobby({ countdown: -1 });
};

/** `GameLobbyWindowCtrl.onClose`: the game left (`Game2LeaveGame`) when asked, the countdown and the queue position cleared. */
const closeLobby = (send: Send, leave: boolean) => {
    if (leave) send(new Game2LeaveGameComposer({}));

    disposeCountdownTimer();
    gameCenterStore.getState().updateLobby({ queuePosition: -1 });
};

/** `GameLobbyWindowCtrl.startCountdown`. */
const startLobbyCountdown = (seconds: number) => {
    disposeCountdownTimer();
    updateLobbyDialog({ countdown: seconds });

    let ticks = seconds;

    countdownTimer = setInterval(() => {
        const countdown = gameCenterStore.getState().lobby?.countdown ?? -1;

        if (countdown > 0) updateLobbyDialog({ countdown: countdown - 1 });
        if (--ticks <= 0) {
            clearInterval(countdownTimer);
            countdownTimer = undefined;
        }
    }, 1000);
};

// --- The window (`GamesMainViewController`) ---

/** `createWindow`: built, shown and centred, its quick play part hidden until `openMainWindow` shows it. */
const createWindow = () => gameCenterStore.getState().setWindow({ open: true, visible: true, quickPlayVisible: false, instructions: false });

/** `disposeViews`: the window, its lobby and the instructions' animation gone. */
const disposeViews = () => {
    if (countdownTimer !== undefined) clearInterval(countdownTimer);

    countdownTimer = undefined;

    const { setLobby, setWindow } = gameCenterStore.getState();

    setLobby(undefined);
    setWindow({ open: false, visible: false, quickPlayVisible: false, instructions: false });
};

/** `GamesMainViewController.openMainWindow`: the quick play part over the lobby, the window built first if `create`. */
export const openGamesMainWindow = (create: boolean) => {
    const { open, lobby, setWindow, updateLobby } = gameCenterStore.getState();

    if (!open && !create) return;
    if (!open) createWindow();
    if (lobby) updateLobby({ visible: false });

    setWindow({ quickPlayVisible: true });
};

/** `GamesMainViewController.toggleVisibility` (`SnowWarEngine.showGamesMainView`). */
export const toggleGamesMainWindow = () => {
    const { open, visible, setWindow } = gameCenterStore.getState();

    if (open) setWindow({ visible: !visible });
    else openGamesMainWindow(true);
};

/** `GamesMainViewController.close`: an open lobby closed (leaving its game with `leave`), and the window gone. */
export const closeGamesMainWindow = (send: Send, leave: boolean) => {
    if (gameCenterStore.getState().lobby?.visible) closeLobby(send, leave);

    disposeViews();
};

/** `GamesMainViewController.openGameLobbyWindow`: the lobby part shown over quick play, its players cleared when it was shown before. */
const openGameLobbyWindow = (levelName: string, numberOfTeams: number, maxNumberOfPlayers: number) => {
    const { open, lobby, setLobby, setWindow } = gameCenterStore.getState();

    if (!open) createWindow();

    if (!lobby) setLobby({ levelName, numberOfTeams, maxNumberOfPlayers, players: [], countdown: -1, queuePosition: -1, waitText: waitText(-1, -1), visible: false });
    // The grid keeps the slots `createLobbyView` made for the first lobby's `maxNumberOfPlayers`.
    else gameCenterStore.getState().updateLobby({ levelName, numberOfTeams, maxNumberOfPlayers, players: [] });

    setWindow({ quickPlayVisible: false });
    gameCenterStore.getState().updateLobby({ visible: true });
};

/** `GamesMainViewController.showInstructions`. */
export const showGameInstructions = (instructions: boolean) => gameCenterStore.getState().setWindow({ instructions });

/** `onNext` / `onPrevious` / `onSelectPage`: the page, wrapped around the five, and the instructions shown. */
export const showGameInstructionPage = (page: number) => {
    const count = GAME_INSTRUCTION_PAGES.length;

    gameCenterStore.getState().setWindow({ instructionPage: ((page % count) + count) % count, instructions: true });
};

/** `onPlay`: a quick game while games are left, the token offer otherwise (`openGetMoreGames`). */
export const playGame = (send: Send) => {
    if (gameCenterStore.getState().freeGamesLeft !== 0) {
        send(new Game2QuickJoinGameComposer({}));

        return;
    }

    buySnowWarTokensOffer(send, 'GET_SNOWWAR_TOKENS');
    logGameEvent(send, 'gameFramework.onPlay.clicked.frontView');
};

/** `windowEventProc`'s `WME_CLICK` on a buy button. */
export const buyGameTokens = (send: Send, button: string) => {
    const localizationId = GAME_TOKEN_BUTTONS[button];

    if (!localizationId) return;

    buySnowWarTokensOffer(send, localizationId);
    logGameEvent(send, 'gameFramework.buyTokens.clicked.frontView');
};

/** `onOpenClubCenter`. */
export const openGamesClubCenter = (send: Send) => {
    openClubCenter(send);
    logGameEvent(send, 'gameFramework.getVip.clicked.frontView');
};

/** The lobby's `cancel_link_region` (`onCancel`): the game left, then quick play again or, with the game centre on, the window closed. */
export const cancelGameLobby = (send: Send) => {
    closeLobby(send, true);

    if (!isGameCenterEnabled()) openGamesMainWindow(true);
    else closeGamesMainWindow(send, true);
};

// --- The messages (`HabboGameManager.onToolbarClick`, `snowwar/IncomingMessages`) ---

/** `HabboGameManager.onToolbarClick` `HTIE_ICON_GAMES`. */
export const onGamesToolbarClick = (send: Send) => {
    send(new Game2CheckGameDirectoryStatusComposer({}));
    send(new GetSnowWarGameTokensOfferComposer({}));
};

/** `SnowWarEngine.gamesLeft`: game type 0's games left. */
const setGamesLeft = (gameTypeId: number, hasUnlimitedGames: boolean, freeGamesLeft: number) => {
    if (gameTypeId !== SNOWWAR_GAME_TYPE) return;

    gameCenterStore.getState().setAccount({ hasUnlimitedGames, freeGamesLeft });
};

/** `onGameDirectoryStatus`. */
export const onGameDirectoryStatus = (data: Game2GameDirectoryStatusMessageType) => {
    if (data.status !== 0) return;

    changeGameBlockStatus(data.blockLength);
    gameCenterStore.getState().setAccount({ gamesPlayed: data.gamesPlayed });
    // `onGameDirectoryAvailable(true)`.
    toggleGamesMainWindow();
    setGamesLeft(SNOWWAR_GAME_TYPE, data.freeGamesLeft === -1, data.freeGamesLeft);
};

/** `onAccountGameStatus`. */
export const onAccountGameStatus = (gameTypeId: number, freeGamesLeft: number) => setGamesLeft(gameTypeId, freeGamesLeft === -1, freeGamesLeft);

/** `onSubscriptionStatus`. */
export const onGamesSubscriptionStatus = (send: Send) => {
    send(new Game2GetAccountGameStatusComposer({ gameTypeId: SNOWWAR_GAME_TYPE }));

    if (gameCenterStore.getState().lobby?.visible) return;
    if (!isGameCenterEnabled()) openGamesMainWindow(false);
};

/** `SnowWarEngine.getArenaName`. */
const arenaName = (lobby: IGameLobbyData) => {
    const key = `snowwar.field.name.${lobby.fieldType}`;

    return systemStore.getState().getLocalizationValue(key, key);
};

/** `GameLobbyWindowCtrl.playerJoined`: a player not in the lobby yet added after the others. */
const addLobbyPlayer = (player: IGameLobbyPlayerData) => {
    const lobby = gameCenterStore.getState().lobby;

    if (!lobby || lobby.players.some(x => x.userId === player.userId)) return;

    updateLobbyDialog({ players: [ ...lobby.players, player ] });
};

/** `onGameCreated` / `onGameLongData` -> `SnowWarEngine.createLobby`. */
export const onGameLobbyCreated = (lobby: IGameLobbyData) => {
    openGameLobbyWindow(arenaName(lobby), lobby.numberOfTeams, lobby.maximumPlayers);

    for (const player of lobby.players) addLobbyPlayer(player);

    updateLobbyDialog();
};

/** `onUserJoined` -> `userJoined`. */
export const onGameUserJoined = (player: IGameLobbyPlayerData) => addLobbyPlayer(player);

/** `onUserLeft` -> `userLeft`. */
export const onGameUserLeft = (userId: number) => {
    const lobby = gameCenterStore.getState().lobby;

    if (lobby) updateLobbyDialog({ players: lobby.players.filter(x => x.userId !== userId) });
};

/** `onLobbyCounterStart` -> `startLobbyCounter`. */
export const onGameLobbyCounterStart = (seconds: number) => {
    if (gameCenterStore.getState().lobby) startLobbyCountdown(seconds);
};

/** `onLobbyCounterStop` -> `stopLobbyCounter` (`GameLobbyWindowCtrl.stopCountdown`). */
export const onGameLobbyCounterStop = () => {
    if (!gameCenterStore.getState().lobby) return;

    disposeCountdownTimer();
    updateLobbyDialog();
};

/** `onInArenaQueue`: the position kept for the next `updateDialog`. */
export const onGameInArenaQueue = (position: number) => gameCenterStore.getState().updateLobby({ queuePosition: position });

/** `onGameCancelled` -> `gameCancelled(false)` -> `resetSession`: quick play again in an open window. */
export const onGameCancelled = () => openGamesMainWindow(false);

/** `onGameStarted`, for a room game (see the header). */
export const onGameStarted = (send: Send, lobby: IGameLobbyData) => {
    if (lobby.gameType !== SNOWWAR_GAME_TYPE) closeGamesMainWindow(send, false);
};

/** `onJoiningGameFailed`. */
export const onJoiningGameFailed = (reason: number) => alert(JOINING_FAILED_TEXTS[reason] ?? 'snowwar.error.generic');

/** `onStartingGameFailed`. */
export const onStartingGameFailed = () => alert('snowwar.error.generic');
