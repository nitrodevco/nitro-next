/**
 * The games window - `GamesMainViewController` over `habbo-games-com/games_main`
 * (`WindowUtils.createWindow("games_main", 1)`, centred when built), with `GameLobbyWindowCtrl`
 * in its `snowwar_lobby_cont` (see `gameCenterCommands` for what drives them).
 *
 * - `quick_play_container`: the teaser, or the instructions (`showInstructions`) - five pages, each
 *   an animation (`SnowWarAnimatedWindowElement`, a frame a second, centred in
 *   `instructions_image`), its `snowwar.instructions.<n>` text and its pagination ball lit; the
 *   leaderboard link only with `games.highscores.enabled` (its window, `LeaderboardViewController`,
 *   is not ported yet).
 * - `updateGameStartingStatus`: the games left (hidden when unlimited), red when none are left;
 *   the play button hidden without games, else blocked (`m:ss`, grey) while the directory's block
 *   runs; the three buy buttons swap to their `_hi` bitmap under the pointer.
 * - The lobby: `wait_text` (countdown, queue position or waiting) and one `snowwar_lobby_player`
 *   per slot of `players_grid` - a player's head (direction 2, centred, the name as tooltip) by join
 *   order, the `load_` animation (8 frames, 100 ms) in the free slots.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import {
    buyGameTokens, cancelGameLobby, closeGamesMainWindow, GAME_INSTRUCTION_FRAME_LENGTH, GAME_INSTRUCTION_PAGES, GAME_PLAY_BUTTON_BLOCKED_COLOR, GAME_PLAY_BUTTON_COLOR, GAME_TOKEN_BUTTONS, GAMES_LEFT_COLOR,
    GAMES_LEFT_NONE_COLOR, openGamesClubCenter, playGame, showGameInstructionPage, showGameInstructions,
} from '#base/commands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { useGameCenterStore } from '#base/context/game-center';
import { useConfigBoolean, useSystemStore } from '#base/context/system';
import { Box, TemplateBindings, TemplateItem, TemplateWindow, useTemplate, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-games-com/games_main';
const PLAYER_TEMPLATE = 'habbo-games-com/snowwar_lobby_player';

/** The games library's bitmaps, as the layout's `bitmap_asset_name`s name them. */
const asset = (name: string) => `habbo-games-com-${name}`;

/** `SnowWarAnimatedWindowElement`'s free lobby slot: `load_1` .. `load_8`, 100 ms each. */
const LOAD_FRAMES = 8;
const LOAD_FRAME_LENGTH = 100;

/** The player's head in a lobby slot: `createAvatarImage(figure, "h", gender)`, direction 2. */
const HEAD_DIRECTION = 2;

/**
 * `SnowWarAnimatedWindowElement`'s frame: `update` runs once as it is made, so it starts on its
 * second frame, and moves on one frame each `length` ms. 1-based, as the assets are numbered.
 */
const useAnimationFrame = (frames: number, length: number, key: string) => {
    const [ state, setState ] = useState({ key, tick: 0 });

    // A new animation (`dispose` and a new `SnowWarAnimatedWindowElement`) starts over.
    if (state.key !== key) setState({ key, tick: 0 });

    useEffect(() => {
        const timer = setInterval(() => setState(x => ({ ...x, tick: x.tick + 1 })), length);

        return () => clearInterval(timer);
    }, [ length, key ]);

    return (((state.key === key ? state.tick : 0) + 1) % frames) + 1;
};

/** `checkBlockStatus`'s caption: minutes and two-digit seconds. */
const blockCaption = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const GamesMainView = () => {
    const open = useGameCenterStore(x => x.open);
    const visible = useGameCenterStore(x => x.visible);
    const quickPlayVisible = useGameCenterStore(x => x.quickPlayVisible);
    const instructions = useGameCenterStore(x => x.instructions);
    const instructionPage = useGameCenterStore(x => x.instructionPage);
    const freeGamesLeft = useGameCenterStore(x => x.freeGamesLeft);
    const hasUnlimitedGames = useGameCenterStore(x => x.hasUnlimitedGames);
    const blockSeconds = useGameCenterStore(x => x.blockSeconds);
    const lobby = useGameCenterStore(x => x.lobby);
    const highscoresEnabled = useConfigBoolean('games.highscores.enabled');
    // The texts the captions read, so they follow them when they come in.
    const getLocalizationValue = useSystemStore(x => x.getLocalizationValue);
    useSystemStore(x => x.localizations);
    const { send } = useWebSocketContext();
    const playerTemplate = useTemplate(PLAYER_TEMPLATE);
    const [ hoveredButton, setHoveredButton ] = useState<string>();
    const frame = useTemplateFrame({ id: 'games_main', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: () => closeGamesMainWindow(send, true) });
    const page = GAME_INSTRUCTION_PAGES[instructionPage];
    const instructionFrame = useAnimationFrame(page.frames, GAME_INSTRUCTION_FRAME_LENGTH, `${instructionPage}/${instructions}`);
    const loadFrame = useAnimationFrame(LOAD_FRAMES, LOAD_FRAME_LENGTH, String(lobby?.maxNumberOfPlayers));

    if (!open || !visible) return null;

    // `checkGameAmountStatus`: whether the block is drawn on the button at all.
    const checksBlock = hasUnlimitedGames || (freeGamesLeft !== 0);
    const blocked = checksBlock && (blockSeconds > 0);
    let playCaption = '${snowwar.play}';

    if (!hasUnlimitedGames && (freeGamesLeft === 0)) playCaption = '${catalog.vip.buy.title}';
    if (blocked) playCaption = blockCaption(blockSeconds);

    const players: TemplateItem[] = (lobby && playerTemplate)
        ? Array.from({ length: lobby.maxNumberOfPlayers }, (_, index): TemplateItem => {
                const player = lobby.players[index];

                return {
                    key: String(index),
                    from: playerTemplate,
                    bindings: player
                        ? {
                                '': { tooltip: player.name },
                                image: {
                                    children: (
                                        <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                            <AvatarImage
                                                figure={player.figure}
                                                gender={(player.gender.toUpperCase() === 'F') ? AvatarGenderType.Female : AvatarGenderType.Male}
                                                headOnly
                                                cropped
                                                direction={HEAD_DIRECTION}
                                            />
                                        </Box>
                                    ),
                                },
                            }
                        : { image: { asset: asset(`load_${loadFrame}`), pivot: 'center' } },
                };
            })
        : [];

    const waitText = lobby ? getLocalizationValue(lobby.waitText.key, '', lobby.waitText.parameters) : '';

    const bindings: TemplateBindings = {
        quick_play_container: { visible: quickPlayVisible },
        teaser_container: { visible: !instructions },
        instructions_container: { visible: instructions },
        instructions_link: { onPointerTap: () => showGameInstructions(true) },
        // `onLeaderboard` (`SnowWarEngine.showLeaderboard`): the leaderboard window is not ported yet.
        leaderboard_link: { visible: highscoresEnabled },
        instructions_back: { onPointerTap: () => showGameInstructions(false) },
        instructions_next: { onPointerTap: () => showGameInstructionPage(instructionPage + 1) },
        instructions_prev: { onPointerTap: () => showGameInstructionPage(instructionPage - 1) },
        instructions_image: { asset: asset(`${page.prefix}${instructionFrame}`), pivot: 'center' },
        instruction_text: { caption: `\${snowwar.instructions.${instructionPage + 1}}` },
        ...Object.fromEntries(GAME_INSTRUCTION_PAGES.map((_, index) => [ `page_${index}`, { onPointerTap: () => showGameInstructionPage(index) } ])),
        ...Object.fromEntries(GAME_INSTRUCTION_PAGES.map((_, index) => [ `page_${index}/@0`, { asset: asset((index === instructionPage) ? 'pagination_ball_hilite' : 'pagination_ball'), pivot: 'center' as const } ])),
        games_left_region: { visible: !hasUnlimitedGames && (freeGamesLeft !== -1) },
        games_left: { caption: String(freeGamesLeft) },
        games_left_stroke: { caption: String(freeGamesLeft), ...(!hasUnlimitedGames && { color: (freeGamesLeft === 0) ? GAMES_LEFT_NONE_COLOR : GAMES_LEFT_COLOR }) },
        ...Object.fromEntries(Object.keys(GAME_TOKEN_BUTTONS).map(name => [ name, {
            asset: asset((hoveredButton === name) ? `${name}_hi` : name),
            onPointerOver: () => setHoveredButton(name),
            onPointerOut: () => setHoveredButton(current => ((current === name) ? undefined : current)),
            onPointerTap: () => buyGameTokens(send, name),
        } ])),
        games_vip_region: { onPointerTap: () => openGamesClubCenter(send) },
        'play.button': {
            visible: freeGamesLeft !== 0,
            disabled: blocked,
            color: blocked ? GAME_PLAY_BUTTON_BLOCKED_COLOR : GAME_PLAY_BUTTON_COLOR,
            onPointerTap: () => playGame(send),
        },
        play_text: { caption: playCaption },
        snowwar_lobby_cont: { visible: !!lobby?.visible },
        wait_text: { caption: waitText },
        wait_text_stroke: { caption: waitText },
        players_grid: { items: players },
        cancel_link_region: { onPointerTap: () => cancelGameLobby(send) },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
