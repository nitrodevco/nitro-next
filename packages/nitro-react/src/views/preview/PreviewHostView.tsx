/**
 * The preview host's desktop (`previewHost`): the game's own windows, drawn from what an admin
 * panel posts instead of from the server. Not a Flash feature.
 *
 * Only a message from an origin `preview.allowed_origins` names is read; any other is dropped
 * unread, and nothing is ever sent back to an origin it does not name. Once up, the host says
 * `ready` to each of them. A message is `{ type: 'nitro-preview', window, data, ... }`:
 *
 * - `window: 'rewardtrack'`: `data` is a `RewardTracksMessage` as JSON. It goes through
 *   `onRewardTracks` as the packet would, and the track `trackId` names - else the first - is opened
 *   as `reward_track/open/<id>` opens it. `figure` and `gender` stand in for the own avatar.
 *
 * - `window: 'design'`: `template` names a window of the game - a template's id (`<library>/<asset>`,
 *   one window of it with `part`) or a frame Nitro draws itself by its frame id - drawn with `draft`,
 *   an appearance editor's unsaved patch files, style values, variables and texts (`base`: Habbo's
 *   own, none of them), `items` sample rows for the lists its code fills; a window with named states
 *   (`ready`'s `states`: the catalogue's pages per layout) is drawn by the game's own view with sample
 *   content in the one `state` names. Answered after with `report` (what its patches did, and every
 *   template drawn: `parts`), and a press on it with `select` (the window, the part the element is in
 *   - a grid item built from another template - the template and key naming it, the path to it); `{ window:
 *   'design', highlight: '<key>' }` outlines an element and changes nothing else (`DesignPreviewView`) - one of
 *   the template `in` names when it is not the window's own (`hud`, the room screen, is many windows),
 *   answered with `rect` (where it is drawn) each time it moves; `{ window: 'design', pick: { x, y } }`
 *   picks the element at that point of the page as a press there would (the panel's handles cover it);
 *   `{ window: 'design', boxes: true }` answers with `boxes` - every element a key reaches, where each
 *   drawing of it is - each time one moves, until `boxes: false` (a window editor's outlines and guides);
 *   `{ window: 'design', source: '<template id>' }` is answered with `source`, the template as the client
 *   draws it with the draft's patches (null for none): what a new window duplicated from it starts as.
 *
 * - `window: 'chatbubble'`: `style` is a chat style's draft as the panel edits it (`assetId`,
 *   `regPoints`, its flags), `files` its bitmaps by file name (`chat_bubble_base`, ...: addresses,
 *   `data:` urls for ones not saved), and `text`, `name`, `figure`, `color` and `width` a line said in
 *   it: drawn as the room draws it (`ChatBubblePreviewView`) and answered with `bubble` (its size, the
 *   files that did not load).
 *
 * Each shown window is answered with `shown` and the desktop's size; a message the host cannot use,
 * with `error`. Pressing a prize or a button sends nothing: there is no connection.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { loadHabbiconAssets, onRewardTracks, openRewardTrack } from '#base/commands';
import { useConfigValue } from '#base/context/system';
import { useUserInfoActions } from '#base/context/user';
import { ModalLayer, readTemplateSource, Template, TooltipLayer, WindowLayer } from '#base/theme';
import { parsePreviewAllowedOrigins, PREVIEW_ALLOWED_ORIGINS_KEY, PREVIEW_MESSAGE_TYPE } from '#base/utils';
import { RewardTrackPremiumConfirmationView } from '#base/views/reward-track/RewardTrackPremiumConfirmationView';
import { RewardTrackView } from '#base/views/reward-track/RewardTrackView';
import { SystemDialogsView } from '#base/views/system/SystemDialogsView';
import { ViewErrorBoundaries } from '#base/views/system/ViewErrorBoundary';

import { ChatBubbleReport, showChatBubble } from './chatBubblePreview';
import { ChatBubblePreviewView } from './ChatBubblePreviewView';
import { boxDesign, DesignReply, highlightDesign, pickDesign, showDesign } from './designPreview';
import { DesignPreviewView } from './DesignPreviewView';
import { designStateList } from './designStates';
import { toChatBubbleMessage, toDesignMessage, toRewardTracksMessage } from './previewMessages';

/** The windows the host can show. */
const PREVIEW_WINDOWS = [ 'rewardtrack', 'design', 'chatbubble' ];

type PreviewReply = { event: 'ready'; windows: string[]; states: ReturnType<typeof designStateList> } | { event: 'shown'; window: string; width: number; height: number } | { event: 'error'; message: string } | { event: 'source'; template: string; source: Template | null } | DesignReply | ChatBubbleReport;

const reply = (target: MessageEventSource | null, origin: string, message: PreviewReply) => {
    if (!target || !('postMessage' in target)) return;

    (target as Window).postMessage({ type: PREVIEW_MESSAGE_TYPE, ...message }, origin);
};

type SetFigure = ReturnType<typeof useUserInfoActions>['setFigure'];

/** `rewardtrack`: the tracks as the packet brings them, then the one to open. */
const showRewardTrack = (message: Record<string, unknown>, setFigure: SetFigure): string | undefined => {
    const data = toRewardTracksMessage(message.data);

    if (!data) return 'data is not a RewardTracks message';

    const trackId = (typeof message.trackId === 'string') ? message.trackId : data.tracks[0]?.id;

    if (!trackId || !data.tracks.some(track => track.id === trackId)) return 'no such track';

    if (typeof message.figure === 'string') setFigure(message.figure, (String(message.gender).toUpperCase() === 'F') ? AvatarGenderType.Female : AvatarGenderType.Male);

    onRewardTracks(data);
    openRewardTrack(trackId);

    return undefined;
};

/** `design`: the window and the draft to draw it with, or only the element to outline. */
const showDesignWindow = (message: Record<string, unknown>, answer: (reply: PreviewReply) => void): string | undefined => {
    const pick = message.pick as { x?: unknown; y?: unknown } | undefined;

    if ((typeof pick === 'object') && (pick !== null) && (message.template === undefined)) {
        if ((typeof pick.x !== 'number') || (typeof pick.y !== 'number')) return 'no point to pick at';

        pickDesign(pick.x, pick.y);

        return undefined;
    }

    // A window of the room screen (`hud`) names its elements in its own template: `in`.
    const highlightIn = ((typeof message.in === 'string') && message.in.length) ? message.in : undefined;

    if (('highlight' in message) && (message.template === undefined)) {
        highlightDesign((typeof message.highlight === 'string') ? message.highlight : null, highlightIn);

        return undefined;
    }

    if (('boxes' in message) && (message.template === undefined)) {
        boxDesign(message.boxes === true);

        return undefined;
    }

    // A window's template as the client draws it, the draft's patches applied: what "Duplicate" copies into a new window.
    if ((typeof message.source === 'string') && (message.template === undefined)) {
        const template = message.source;

        void readTemplateSource(template).then(source => answer({ event: 'source', template, source: source ?? null }));

        return undefined;
    }

    const design = toDesignMessage(message);

    if (!design) return 'no template to draw';

    showDesign(design, answer);

    if ('highlight' in message) highlightDesign((typeof message.highlight === 'string') ? message.highlight : null, highlightIn);

    return undefined;
};

/** `chatbubble`: a chat style's draft and a line said in it. */
const showChatBubbleWindow = (message: Record<string, unknown>, answer: (reply: PreviewReply) => void): string | undefined => {
    const bubble = toChatBubbleMessage(message);

    if (!bubble) return 'no chat style to draw: it needs its reg points (scale9, textFieldMargins) and a chat_bubble_base';

    showChatBubble(bubble, answer, text => answer({ event: 'error', message: text }));

    return undefined;
};

export const PreviewHostView = () => {
    const allowedOrigins = parsePreviewAllowedOrigins(useConfigValue<unknown>(PREVIEW_ALLOWED_ORIGINS_KEY));
    const allowed = allowedOrigins.join(',');
    const { setFigure } = useUserInfoActions();

    // What the session loads as its handlers register (`registerHabbiconHandlers`): the habbicon prizes' previews.
    useEffect(() => {
        void loadHabbiconAssets();
    }, []);

    useEffect(() => {
        const origins = allowed.length ? allowed.split(',') : [];

        const onMessage = (event: MessageEvent<unknown>) => {
            if (!origins.includes(event.origin)) return;

            const message = event.data;

            if ((typeof message !== 'object') || (message === null) || ((message as Record<string, unknown>).type !== PREVIEW_MESSAGE_TYPE)) return;

            const { window: name } = message as Record<string, unknown>;
            const answer = (next: PreviewReply) => reply(event.source, event.origin, next);
            const show = (name === 'rewardtrack') ? () => showRewardTrack(message as Record<string, unknown>, setFigure) : (name === 'design') ? () => showDesignWindow(message as Record<string, unknown>, answer) : (name === 'chatbubble') ? () => showChatBubbleWindow(message as Record<string, unknown>, answer) : undefined;
            const error = show ? show() : `no window ${String(name)}`;

            if (error) reply(event.source, event.origin, { event: 'error', message: error });
            else reply(event.source, event.origin, { event: 'shown', window: String(name), width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('message', onMessage);

        // A frame's parent may be any of them: a message aimed at another origin is never delivered.
        if (window.parent !== window) for (const origin of origins) reply(window.parent, origin, { event: 'ready', windows: PREVIEW_WINDOWS, states: designStateList() });

        return () => window.removeEventListener('message', onMessage);
    }, [ allowed, setFigure ]);

    return (
        <WindowLayer>
            <ViewErrorBoundaries>
                <RewardTrackView />
                <RewardTrackPremiumConfirmationView />
                <DesignPreviewView />
                <ChatBubblePreviewView />
                <SystemDialogsView />
                <ModalLayer />
                <TooltipLayer />
            </ViewErrorBoundaries>
        </WindowLayer>
    );
};
