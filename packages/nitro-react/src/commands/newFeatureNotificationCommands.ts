/**
 * `SingularNotificationController.maybeShowNewFeatureNotification` and `NewFeatureNotification`'s
 * link: the promotions named in `notifications.new_feature.active` (a comma list of keys), each
 * shown unless its `notifications.new_feature.condition.<key>` says otherwise. The one condition
 * Flash knows is `reward_track_incomplete:<track id>`: shown while that track is not complete,
 * tried again every 2 seconds - at most 3 more times - while the track is not in yet.
 *
 * `openConfiguredLink`: `notifications.new_feature.internal_link.<key>` as a client link, else
 * `notifications.new_feature.external_link.<key>` in the browser.
 */
import { WebSocketConnection } from '#base/context/communication';
import { singularNotificationStore } from '#base/context/singular-notifications';
import { systemStore } from '#base/context/system';

import { openClientLink } from './clientLinkCommands';
import { hasRewardTrack, isRewardTrackComplete } from './rewardTrackCommands';

type Send = WebSocketConnection['send'];

/** `setTimeout(maybeShowNewFeatureNotificationByKey, 2000, key, attempt + 1)` while `attempt < 3`. */
const RETRY_DELAY_MS = 2000;
const MAX_RETRIES = 3;

const CONDITION_REWARD_TRACK_INCOMPLETE = 'reward_track_incomplete';

/** `getProperty`: the hotel's value, as text. */
export const getHotelProperty = (key: string): string => {
    const value = systemStore.getState().config[key];

    return ((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '';
};

/** `getNewFeatureConditionState`: 1 show, 0 don't, -1 not known yet. */
const getConditionState = (key: string): number => {
    const condition = getHotelProperty(`notifications.new_feature.condition.${key}`);

    if (!condition.length) return 1;

    const parts = condition.split(':');

    if (parts.length < 2) return 1;

    if (parts[0] === CONDITION_REWARD_TRACK_INCOMPLETE) {
        if (!hasRewardTrack(parts[1])) return -1;

        return isRewardTrackComplete(parts[1]) ? 0 : 1;
    }

    return 1;
};

/** `maybeShowNewFeatureNotificationByKey`. */
const maybeShowByKey = (key: string, attempt: number) => {
    const state = getConditionState(key);

    if (state === 0) return;

    if (state === -1) {
        if (attempt < MAX_RETRIES) setTimeout(() => maybeShowByKey(key, attempt + 1), RETRY_DELAY_MS);

        return;
    }

    singularNotificationStore.getState().showNewFeatureNotification(key);
};

/** `maybeShowNewFeatureNotification`. */
export const maybeShowNewFeatureNotifications = () => {
    for (const key of getHotelProperty('notifications.new_feature.active').split(',')) {
        if (key.length) maybeShowByKey(key, 0);
    }
};

/** `openConfiguredLink`. */
export const openNewFeatureLink = (send: Send, key: string) => {
    const internalLink = getHotelProperty(`notifications.new_feature.internal_link.${key}`);

    if (internalLink !== '') {
        openClientLink(send, internalLink);

        return;
    }

    const externalLink = getHotelProperty(`notifications.new_feature.external_link.${key}`);

    if (externalLink !== '') window.open(externalLink, 'habboMain');
};
