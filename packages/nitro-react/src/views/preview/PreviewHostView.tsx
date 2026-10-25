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
 * Each shown window is answered with `shown` and the desktop's size; a message the host cannot use,
 * with `error`. Pressing a prize or a button sends nothing: there is no connection.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { loadHabbiconAssets, onRewardTracks, openRewardTrack } from '#base/commands';
import { useConfigValue } from '#base/context/system';
import { useUserInfoActions } from '#base/context/user';
import { ModalLayer, TooltipLayer, WindowLayer } from '#base/theme';
import { parsePreviewAllowedOrigins, PREVIEW_ALLOWED_ORIGINS_KEY, PREVIEW_MESSAGE_TYPE } from '#base/utils';
import { RewardTrackPremiumConfirmationView } from '#base/views/reward-track/RewardTrackPremiumConfirmationView';
import { RewardTrackView } from '#base/views/reward-track/RewardTrackView';
import { SystemDialogsView } from '#base/views/system/SystemDialogsView';
import { ViewErrorBoundaries } from '#base/views/system/ViewErrorBoundary';

import { toRewardTracksMessage } from './previewMessages';

/** The windows the host can show. */
const PREVIEW_WINDOWS = [ 'rewardtrack' ];

type PreviewReply = { event: 'ready'; windows: string[] } | { event: 'shown'; window: string; width: number; height: number } | { event: 'error'; message: string };

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
            const error = (name === 'rewardtrack') ? showRewardTrack(message as Record<string, unknown>, setFigure) : `no window ${String(name)}`;

            if (error) reply(event.source, event.origin, { event: 'error', message: error });
            else reply(event.source, event.origin, { event: 'shown', window: String(name), width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('message', onMessage);

        // A frame's parent may be any of them: a message aimed at another origin is never delivered.
        if (window.parent !== window) for (const origin of origins) reply(window.parent, origin, { event: 'ready', windows: PREVIEW_WINDOWS });

        return () => window.removeEventListener('message', onMessage);
    }, [ allowed, setFigure ]);

    return (
        <WindowLayer>
            <ViewErrorBoundaries>
                <RewardTrackView />
                <RewardTrackPremiumConfirmationView />
                <SystemDialogsView />
                <ModalLayer />
                <TooltipLayer />
            </ViewErrorBoundaries>
        </WindowLayer>
    );
};
