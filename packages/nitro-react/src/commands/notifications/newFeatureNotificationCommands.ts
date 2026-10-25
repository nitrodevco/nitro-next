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
import { GetSecondsUntilComposer, HasClaimedProductComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { singularNotificationStore } from '#base/context/singular-notifications';
import { configString, systemStore } from '#base/context/system';
import { openHabboMainPage } from '#base/utils';

import { hasRewardTrack, isRewardTrackComplete } from '../reward-track/rewardTrackCommands';
import { openClientLink } from '../system/clientLinkCommands';

/** `setTimeout(maybeShowNewFeatureNotificationByKey, 2000, key, attempt + 1)` while `attempt < 3`. */
const RETRY_DELAY_MS = 2000;
const MAX_RETRIES = 3;

const CONDITION_REWARD_TRACK_INCOMPLETE = 'reward_track_incomplete';

const ACTIVE_KEY = 'notifications.new_feature.active';

/** `getProperty`: the hotel's value as text, read when it is asked for. */

/** `getNewFeatureConditionState`: 1 show, 0 don't, -1 not known yet. */
const getConditionState = (key: string): number => {
    const condition = configString(`notifications.new_feature.condition.${key}`);

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
    for (const key of configString(ACTIVE_KEY).split(',')) {
        if (key.length) maybeShowByKey(key, 0);
    }
};

/** Not Flash's: Turbo's extension that puts a notice up or takes it down while the client runs (`TurboNoticeMessage`). */
export const TURBO_LIVE_NOTICES_CAPABILITY = 'notices.live';

/** The variable names each live notice was last given, by key: one it is no longer given is cleared. */
const liveNoticeVariables = new Map<string, string[]>();

/**
 * Not Flash's (`notices.live`): a notice the server puts up while the client runs - the countdown
 * of a restart, say - taken in as the hotel's own: its variables
 * (`notifications.new_feature.<name>.<key>`), its text (`notifications.new_feature.<key>.desc`) and
 * its key in `notifications.new_feature.active`, then shown as `maybeShowNewFeatureNotificationByKey`
 * shows one, conditions and all. Taken down, it leaves the active list and the toolbar.
 */
export const applyLiveNewFeatureNotification = (key: string, shown: boolean, variables: Record<string, string>, desc: string) => {
    if (!key.length || key.includes(',')) return;

    const { setConfigValue, setLocalization } = systemStore.getState();
    const active = configString(ACTIVE_KEY).split(',').filter(entry => entry.length && (entry !== key));

    if (!shown) {
        setConfigValue(ACTIVE_KEY, active.join(','));
        singularNotificationStore.getState().closeNewFeatureNotification(key);

        return;
    }

    for (const name of liveNoticeVariables.get(key) ?? []) {
        if (!(name in variables)) setConfigValue(`notifications.new_feature.${name}.${key}`, '');
    }

    for (const [ name, value ] of Object.entries(variables)) setConfigValue(`notifications.new_feature.${name}.${key}`, value);

    liveNoticeVariables.set(key, Object.keys(variables));
    setLocalization({ [`notifications.new_feature.${key}.desc`]: desc });
    setConfigValue(ACTIVE_KEY, [ ...active, key ].join(','));
    maybeShowByKey(key, 0);
};

/** `openConfiguredLink`. */
export const openNewFeatureLink = (send: Send, key: string) => {
    const internalLink = configString(`notifications.new_feature.internal_link.${key}`);

    if (internalLink !== '') {
        openClientLink(send, internalLink);

        return;
    }

    const externalLink = configString(`notifications.new_feature.external_link.${key}`);

    openHabboMainPage(externalLink);
};

/** `NewFeatureNotification`'s constructor: how long until its expiry, or its countdown's end (`GetSecondsUntilMessageComposer`). */
export const requestNewFeatureSecondsUntil = (send: Send, timeStr: string) => send(new GetSecondsUntilComposer({ timeStr }));

/** `NewFeatureNotification.initializeAutoOpen`: whether the auto-open condition's product is claimed. */
export const requestNewFeatureClaimState = (send: Send, claimId: string) => send(new HasClaimedProductComposer({ claimId }));

/**
 * Not Flash's: the keys a player closed for good (`notifications.new_feature.close.<key>` `forever`),
 * kept in this browser per user. Flash's cancel link only takes a notification down until the
 * client starts again.
 */
const closedForeverStorageKey = (userId: number) => `nitro.new_feature.closed.${userId}`;

const readClosedForever = (userId: number): string[] => {
    try {
        const value = JSON.parse(window.localStorage.getItem(closedForeverStorageKey(userId)) ?? '[]') as unknown;

        return Array.isArray(value) ? value.filter((x): x is string => typeof x === 'string') : [];
    } catch {
        return [];
    }
};

export const isNewFeatureClosedForever = (userId: number, key: string) => readClosedForever(userId).includes(key);

export const rememberNewFeatureClosedForever = (userId: number, key: string) => {
    const closed = readClosedForever(userId);

    if (closed.includes(key)) return;

    try {
        window.localStorage.setItem(closedForeverStorageKey(userId), JSON.stringify([ ...closed, key ]));
    } catch {
        // A browser that keeps nothing closes it until the next start, as Flash does.
    }
};
