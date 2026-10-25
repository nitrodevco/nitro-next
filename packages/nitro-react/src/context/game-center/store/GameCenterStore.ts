/**
 * The games window store - what Flash's `game/snowwar/ui/GamesMainViewController` (the `games_main`
 * window) and its `GameLobbyWindowCtrl` (the window's `snowwar_lobby_cont`) show, with the account
 * state `SnowWarEngine` keeps for them (`freeGamesLeft`, `hasUnlimitedGames`, `gamesPlayed`). The
 * timers (the play block and the lobby countdown) live in `gameCenterCommands`.
 */
import type { IGameLobbyPlayerData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** What `GameLobbyWindowCtrl.updateDialog` last wrote into `wait_text` / `wait_text_stroke`: a text key and its parameters. */
export interface GameLobbyWaitText {
    key: string;
    parameters?: Record<string, string>;
}

/** `GameLobbyWindowCtrl`. */
export interface GameLobbyView {
    /** `levelName`: the arena's name (`getArenaName`). */
    levelName: string;
    numberOfTeams: number;
    /** `maxNumberOfPlayers`: the grid's slot count, fixed once the lobby view is built (`createLobbyView`). */
    maxNumberOfPlayers: number;
    /** The players by join order (`§_-P1R§`, a `Map` by user id). */
    players: IGameLobbyPlayerData[];
    /** The countdown's seconds left; `-1` with no countdown running. */
    countdown: number;
    /** `queuePosition`; `-1` when not queued. */
    queuePosition: number;
    waitText: GameLobbyWaitText;
    visible: boolean;
}

type State = {
    /** `rootWindow` exists: the window is built. */
    open: boolean;
    /** `rootWindow.visible` (`toggleVisibility`). */
    visible: boolean;
    /** `quick_play_container.visible` (`§_-72D§`). */
    quickPlayVisible: boolean;
    /** `showInstructions`: `instructions_container` shown and `teaser_container` hidden. */
    instructions: boolean;
    /** The instruction page (`§_-1i§`), kept by the controller while windows come and go. */
    instructionPage: number;
    freeGamesLeft: number;
    hasUnlimitedGames: boolean;
    gamesPlayed: number;
    /** The seconds the play button stays blocked (`changeBlockStatus`); `0` when it is not. */
    blockSeconds: number;
    lobby: GameLobbyView | undefined;
};

type Actions = {
    setWindow: (window: Partial<Pick<State, 'open' | 'visible' | 'quickPlayVisible' | 'instructions' | 'instructionPage'>>) => void;
    setAccount: (account: Partial<Pick<State, 'freeGamesLeft' | 'hasUnlimitedGames' | 'gamesPlayed'>>) => void;
    setBlockSeconds: (blockSeconds: number) => void;
    setLobby: (lobby: GameLobbyView | undefined) => void;
    updateLobby: (update: Partial<GameLobbyView>) => void;
};

export type GameCenterStore = State & Actions;

export const createGameCenterStore = () => createStore<GameCenterStore>()(set => ({
    open: false,
    visible: false,
    quickPlayVisible: false,
    instructions: false,
    instructionPage: 0,
    freeGamesLeft: 0,
    hasUnlimitedGames: false,
    gamesPlayed: 0,
    blockSeconds: 0,
    lobby: undefined,
    setWindow: window => set(window),
    setAccount: account => set(account),
    setBlockSeconds: blockSeconds => set({ blockSeconds }),
    setLobby: lobby => set({ lobby }),
    updateLobby: update => set(state => (state.lobby ? { lobby: { ...state.lobby, ...update } } : {})),
}));

export const gameCenterStore = createGameCenterStore();
