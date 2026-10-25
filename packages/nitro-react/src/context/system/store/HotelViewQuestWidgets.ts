/**
 * The reception's widgets and generic-widget elements over the quest package's packets - the daily
 * quest (`DailyQuestWidget`, `DailyQuestElementHandler`), the concurrent users goal
 * (`ConcurrentUsersInfoElementHandler` and its meter, the obfuscated `_-41h`) and the community goal
 * competition's prizes and hall of fame (`CommunityGoalPrizesWidget`, `CommunityGoalHallOfFameWidget`
 * over `UserListWidget`): what each reads from its element's arguments and the hotel's variables,
 * and the numbers its code works out. Pure functions, shared by the reception's packet handler and
 * its views.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';

import { hotelViewProperty } from './HotelViewSlice';
import type { HotelViewGenericElement } from './HotelViewWidgets';

/** `LandingViewElementType.DAILYQUEST`: `dailyquest,<unused>,<floating>,<x>,<y>,<campaign>,<chain>`. */
export const LANDING_VIEW_ELEMENT_DAILYQUEST = 'dailyquest';

/** `LandingViewElementType.CONCURRENTUSERSINFO`: `concurrentusersinfo,<localizationKey>[,<badgeName>]`. */
export const LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO = 'concurrentusersinfo';

/** `LandingViewElementType.CONCURRENTUSERSMETER`: `concurrentusersmeter,<uri>[,<x>,<y>]` - always floating. */
export const LANDING_VIEW_ELEMENT_CONCURRENTUSERSMETER = 'concurrentusersmeter';

/**
 * `isFloating` of the quest elements: `DailyQuestElementHandler` when its third argument is `true`,
 * the meter always; `ConcurrentUsersInfoElementHandler` has none, so it goes in the column.
 */
export const isFloatingHotelViewQuestElement = (element: HotelViewGenericElement): boolean => {
    switch (element.type) {
        case LANDING_VIEW_ELEMENT_DAILYQUEST: return element.args[1] === 'true';
        case LANDING_VIEW_ELEMENT_CONCURRENTUSERSMETER: return true;
        default: return false;
    }
};

/** `DailyQuestWidget.getChainSpecificText`: `${quests.<campaign>.<chain>.<name>}`. */
export const dailyQuestChainText = (quest: IQuestMessageData, name: string) => `\${quests.${quest.campaignCode}.${quest.chainCode}.${name}}`;

/** `DailyQuestWidget.getQuestName`: `${quests.<campaign>.<localizationCode>.name}` (`getQuestLocalizationKey`). */
export const dailyQuestName = (quest: IQuestMessageData) => `\${quests.${quest.campaignCode}.${quest.localizationCode}.name}`;

/** `DailyQuestWidget.refreshContent`: the next-quest link shows while there is more than one quest of the quest's difficulty. */
export const dailyQuestHasNext = (quest: IQuestMessageData, easyQuestCount: number, hardQuestCount: number) => (quest.easy ? easyQuestCount : hardQuestCount) > 1;

/** `ConcurrentUsersInfoElementHandler.STATE_REDEEM` / `STATE_REWARDED`: the goal is reached, the update timer stops. */
export const CONCURRENT_USERS_STATE_REDEEM = 2;
export const CONCURRENT_USERS_STATE_REWARDED = 3;

/** `ConcurrentUsersInfoElementHandler.UPDATE_INTERVAL_MS`: how often the progress is asked again. */
export const CONCURRENT_USERS_UPDATE_INTERVAL_MS = 5000;

/** `ConcurrentUsersInfoElementHandler.updateLocalization`: past the goal, the texts' `.success` keys. */
export const isConcurrentUsersGoalReached = (state: number) => (state === CONCURRENT_USERS_STATE_REDEEM) || (state === CONCURRENT_USERS_STATE_REWARDED);

/** The keys `updateLocalization` gives the widget's `caption` and `bodytext` elements (`TextElementHandler.localizationKey`). */
export const concurrentUsersTextKeys = (state: number) => {
    const suffix = isConcurrentUsersGoalReached(state) ? '.success' : '';

    return { caption: `landing.view.concurrentusers.caption${suffix}`, bodytext: `landing.view.concurrentusers.bodytext${suffix}` };
};

/** The key `updateLocalization` registers the domain for, besides the counts. */
export const CONCURRENT_USERS_BODYTEXT_KEY = 'landing.view.concurrentusers.bodytext';

/** `initialize`: the reward badge, `${image.library.url}album1584/<name>.png`, named by the element's second argument. */
export const concurrentUsersBadgeAsset = (imageLibrary: string, element: HotelViewGenericElement) => `${imageLibrary}album1584/${(element.args.length > 1) ? element.args[1] : 'ConcurrentUsersReward'}.png`;

/**
 * The meter's `onConcurrentUsersGoalProgress`: the share of the goal reached as an AS3 `int` (so
 * 0 for no goal), held to 20..100 and rounded down to tens, names the meter's frame
 * (`${image.library.url}reception/challenge_meter_<n>.png`).
 */
export const concurrentUsersMeterAsset = (imageLibrary: string, userCount: number, userCountGoal: number) => {
    const percent = Math.floor(Math.max(20, Math.min(100, ((userCount / userCountGoal) * 100) | 0)) / 10) * 10;

    return `${imageLibrary}reception/challenge_meter_${percent}.png`;
};

/**
 * `CommunityGoalPrizesWidget.setPrizeRankLimits`: the ranks the `prize`th prize goes to. Each
 * `rewardUserLimits` entry is how many ranks a prize covers, so a prize starts one past the ranks of
 * those before it; an entry past the list reads as 0, as AS3 reads an array's missing index.
 */
export const competitionPrizeRanks = (rewardUserLimits: readonly number[], prize: number) => {
    let start = 1;
    let end = 0;

    for (let index = 0; index < prize; index++) {
        start += rewardUserLimits[prize - index - 2] ?? 0;
        end += rewardUserLimits[prize - index - 1] ?? 0;
    }

    return { start, end };
};

/** `UserListWidget`: how many leaders the list draws (`refreshList`). */
export const HALL_OF_FAME_ENTRY_COUNT = 10;

/** `UserListWidget`'s defaults: the first entry's x, each entry's drop and its figure's direction. */
const HALL_OF_FAME_START_OFFSET = 150;
const HALL_OF_FAME_AVATAR_OFFSETS_Y = [ 0, 10, 5, 0, 5, 10, 0, 10, 5, 10 ];
export const HALL_OF_FAME_AVATAR_DIRECTIONS = [ 2, 4, 2, 2, 4, 2, 2, 2, 4, 2 ];

/** `UserListWidget.setupVariation`: every entry sits this much lower than its drop. */
export const HALL_OF_FAME_ENTRY_TOP = 70;

/** `UserListWidget.showPopup`: the popup's bottom edge. */
export const HALL_OF_FAME_POPUP_BOTTOM = 79;

export interface HallOfFameLayout {
    startOffset: number;
    offsetsY: readonly number[];
    /** Each entry's width; an entry past the list keeps its layout's. */
    widths: readonly number[];
}

/** `CommunityGoalHallOfFameWidget.initialize`: the schedule the hall of fame asks the timing code of. */
export const hallOfFameSchedule = (config: Record<string, unknown>) => hotelViewProperty(config, 'landing.view.dynamic.slot.6.conf');

/**
 * `CommunityGoalHallOfFameWidget.loadConfigurationOverrides`: the code's `avatarlist.*` variables
 * over `UserListWidget`'s defaults, each only where the variable exists (`propertyExists`).
 */
export const hallOfFameLayout = (config: Record<string, unknown>, code: string | undefined): HallOfFameLayout => {
    const exists = (key: string) => config[key] !== undefined;
    const array = (key: string) => hotelViewProperty(config, key).split(',').map(value => parseInt(value, 10));
    const prefix = `landing.view.${code ?? ''}.avatarlist`;

    return {
        startOffset: (code && exists(`${prefix}.startoffset`)) ? parseInt(hotelViewProperty(config, `${prefix}.startoffset`), 10) : HALL_OF_FAME_START_OFFSET,
        offsetsY: (code && exists(`${prefix}.yoffsets.array`)) ? array(`${prefix}.yoffsets.array`) : HALL_OF_FAME_AVATAR_OFFSETS_Y,
        widths: (code && exists(`${prefix}.widths.array`)) ? array(`${prefix}.widths.array`) : [],
    };
};
