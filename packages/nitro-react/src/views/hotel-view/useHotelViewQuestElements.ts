/**
 * The generic widget's quest-package elements - `DailyQuestElementHandler` (`dailyquest`),
 * `ConcurrentUsersInfoElementHandler` (`concurrentusersinfo`) and the concurrent users meter
 * (`concurrentusersmeter`, the obfuscated `_-41h`) - for `HotelViewGenericWidget`: each one's window
 * as a `TemplateItem`, the parameters their texts are registered with, and the text keys the
 * concurrent users element gives the widget's other elements. What each asks in its `refresh` is
 * asked by `registerHotelViewHandlers`.
 *
 * - `dailyquest`: `DailyQuestWidget`'s quest, accept, another quest, difficulty, go and cancel over
 *   `element_dailyquest` (see `hotelViewDailyQuest`), at the x/y of its fourth and fifth arguments,
 *   floating when its third says so. Its last two arguments (a campaign and a chain code) are read
 *   and never used. Each element keeps its own place in the quest list (`_index`).
 * - `concurrentusersinfo`: `${<arg>}` with `userCount` and `userGoal`; once the goal is reached
 *   (`STATE_REDEEM`) the reward badge (`album1584/<badge>.png`, `ConcurrentUsersReward` unless named)
 *   and the redeem button, which asks for the reward and the progress again; once rewarded
 *   (`STATE_REWARDED`), the badge alone. It also re-keys the widget's first `caption` and `bodytext`
 *   elements (`getElementByName`, `TextElementHandler.localizationKey`) to
 *   `landing.view.concurrentusers.caption` / `.bodytext` - `.success` once the goal is reached - and
 *   registers `userCount`, `userGoal` and the hotel's domain for that body text. Flash does that in
 *   `initialize` for the elements built before it, and for all of them on each progress. The
 *   click's `state.active.disable()` is not drawn: that container is hidden whenever the button shows.
 * - `concurrentusersmeter`: floating at its x/y, the bitmap its first argument names until a
 *   progress arrives, then `reception/challenge_meter_<n>.png` for the share of the goal reached.
 */
import { useState } from 'react';

import { activateDailyQuest, cancelDailyQuest, goToPromotedRoom, redeemConcurrentUsersReward, requestDailyQuest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    CONCURRENT_USERS_BODYTEXT_KEY, CONCURRENT_USERS_STATE_REDEEM, concurrentUsersBadgeAsset, concurrentUsersMeterAsset, concurrentUsersTextKeys, hotelViewColorableBindings, HotelViewCommonSettings, HotelViewGenericElement, hotelViewProperty,
    isConcurrentUsersGoalReached, LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO, LANDING_VIEW_ELEMENT_CONCURRENTUSERSMETER, LANDING_VIEW_ELEMENT_DAILYQUEST, useConfigData, useSystemStore, useTranslation,
} from '#base/context/system';
import type { Template, TemplateItem } from '#base/theme';

import { arrangeDailyQuestDifficulty, DAILY_QUEST_COLORABLE, dailyQuestBindings, dailyQuestParameters } from './hotelViewDailyQuest';
import { hotelViewInt } from './hotelViewInt';

/** The layout each element is built from (`element_<type>`). */
export const HOTEL_VIEW_QUEST_ELEMENT_LAYOUTS: Readonly<Record<string, string>> = {
    [LANDING_VIEW_ELEMENT_DAILYQUEST]: 'element_dailyquest',
    [LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO]: 'element_concurrentusersinfo',
    [LANDING_VIEW_ELEMENT_CONCURRENTUSERSMETER]: 'element_concurrentusersmeter',
};

/** The texts `element_concurrentusersinfo` tags `COLORABLE`. */
const CONCURRENT_USERS_COLORABLE = [ 'users_desc', 'badge_desc' ] as const;

export const useHotelViewQuestElements = (elements: readonly HotelViewGenericElement[], settings: HotelViewCommonSettings) => {
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const daily = useSystemStore(x => x.hotelViewDailyQuest);
    const progress = useSystemStore(x => x.hotelViewConcurrentUsers);
    const [ dailyIndices, setDailyIndices ] = useState<Readonly<Record<string, number>>>({});
    const imageLibrary = hotelViewProperty(config, 'image.library.url');
    const infoIndex = elements.findIndex(element => element.type === LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO);
    const info = (infoIndex >= 0) ? elements[infoIndex] : undefined;
    // The parser's `flush` values until the first progress.
    const state = progress?.state ?? -1;
    const counts = { userCount: String(progress?.userCount ?? -1), userGoal: String(progress?.userCountGoal ?? -1) };

    /**
     * `updateLocalization`'s re-keying: the text key of the widget's first `caption` or `bodytext`
     * element, when a `concurrentusersinfo` element gives it one - else `undefined`.
     */
    const textKey = (element: HotelViewGenericElement, index: number): string | undefined => {
        if (!info || ((element.type !== 'caption') && (element.type !== 'bodytext'))) return undefined;
        if (elements.findIndex(other => other.type === element.type) !== index) return undefined;
        if (!progress && (index > infoIndex)) return undefined;

        return concurrentUsersTextKeys(state)[element.type];
    };

    /** The parameters the elements register for their texts. */
    const parameters: Record<string, Record<string, string>> = {
        ...(elements.some(element => element.type === LANDING_VIEW_ELEMENT_DAILYQUEST) ? dailyQuestParameters(daily) : undefined),
        ...(info
            ? {
                    [info.args[0] ?? '']: counts,
                    [CONCURRENT_USERS_BODYTEXT_KEY]: { ...counts, domain: t('landing.view.hotel.domain', 'Habbo') },
                }
            : undefined),
    };

    /** The element's handler `initialize` and what it draws: its window, or `undefined` for any other type. */
    const item = (element: HotelViewGenericElement, key: string, from: Template): TemplateItem | undefined => {
        const { type, args } = element;

        switch (type) {
            case LANDING_VIEW_ELEMENT_DAILYQUEST: {
                const index = dailyIndices[key] ?? 0;
                const bindings = dailyQuestBindings(daily, {
                    accept: questId => activateDailyQuest(send, questId),
                    next: (easy) => {
                        setDailyIndices(indices => ({ ...indices, [key]: index + 1 }));
                        requestDailyQuest(send, easy, index + 1);
                    },
                    cancel: () => cancelDailyQuest(send),
                    go: () => goToPromotedRoom(send, undefined),
                    difficulty: easy => requestDailyQuest(send, easy, index),
                });

                return {
                    key,
                    from,
                    bindings: hotelViewColorableBindings(settings, DAILY_QUEST_COLORABLE, bindings),
                    arrange: (windows) => {
                        const root = windows.root();

                        if (args.length > 2) root?.setX(hotelViewInt(args[2]));
                        if (args.length > 3) root?.setY(hotelViewInt(args[3]));
                        if (daily) arrangeDailyQuestDifficulty(windows);
                    },
                };
            }
            case LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO: {
                const reached = isConcurrentUsersGoalReached(state);
                const known = (state >= 0) && (state <= 3);

                return {
                    key,
                    from,
                    bindings: hotelViewColorableBindings(settings, CONCURRENT_USERS_COLORABLE, {
                        users_desc: { caption: `\${${args[0] ?? ''}}` },
                        badge_image: { asset: concurrentUsersBadgeAsset(imageLibrary, element) },
                        // `updateLocalization`'s states; any other leaves the windows as they are.
                        ...(known ? { 'state.active': { visible: !reached }, 'state.achieved': { visible: reached } } : {}),
                        action_button: { ...(reached ? { visible: state === CONCURRENT_USERS_STATE_REDEEM } : {}), onPointerTap: () => redeemConcurrentUsersReward(send) },
                    }),
                };
            }
            case LANDING_VIEW_ELEMENT_CONCURRENTUSERSMETER:
                return {
                    key,
                    from,
                    bindings: { '': { asset: progress ? concurrentUsersMeterAsset(imageLibrary, progress.userCount, progress.userCountGoal) : (args[0] ?? '') } },
                    arrange: ({ root }) => {
                        root()?.setX((args.length > 1) ? hotelViewInt(args[1]) : 0);
                        root()?.setY((args.length > 2) ? hotelViewInt(args[2]) : 0);
                    },
                };
            default:
                return undefined;
        }
    };

    return { item, textKey, parameters };
};
