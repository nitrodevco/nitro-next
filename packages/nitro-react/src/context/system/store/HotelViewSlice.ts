/**
 * Reception state: the background art `WidgetContainerLayout.setBackgroundGraphics` chose, and
 * what the reception's widgets were told by the server - the timing code each scheduled slot
 * shows (`WidgetContainerWidget.onTimingCode`), the countdowns `CustomTimerElementHandler` asked
 * for, the bonus rare (`BonusRarePromoWidget`), the promo articles and the one shown, the community goal and whether
 * the user's vote on it was taken (`CommunityVoteReceivedEvent`), the catalogue page that expires
 * first (`ExpiringCatalogPageWidget`) and the next limited rare (`NextLimitedRareCountdownWidget`) -
 * and what the generic widget's elements were told: whether each badge request was fulfilled
 * (`RequestBadgeButtonElementHandler`) and whether the user has a competition room (the
 * `submitcompetitionroom` element). `hotelViewReactivations` counts the catalogue's visits to an
 * invisible page (`CATALOG_INVISIBLE_PAGE_VISITED`), on which the reception activates again.
 * Also the daily quest offered (`DailyQuestWidget` and its element), the concurrent users goal
 * (`ConcurrentUsersInfoElementHandler` and the meter) and the competition's hall of fame
 * (`CommunityGoalHallOfFameWidget`).
 * Retained while a room is open, like the Flash window.
 */
import {
    BonusRareInfoMessageType, CatalogPageWithEarliestExpiryMessageType, CommunityGoalProgressMessageType, ConcurrentUsersGoalProgressMessageType, ICommunityGoalHallOfFameData, IsUserPartOfCompetitionMessageType, LimitedOfferAppearingNextMessageType,
    PromoArticleData, QuestDailyMessageType,
} from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

export interface HotelViewBackground {
    uri: string;
    visible: boolean;
}

export type HotelViewBackgrounds = Record<string, HotelViewBackground>;

/** `SecondsUntilMessage`, with when it arrived (`performance.now()`) so a countdown can run on from it. */
export interface HotelViewSecondsUntil {
    seconds: number;
    receivedAt: number;
}

/** A countdown packet's data, with when it arrived (`performance.now()`) so the countdown runs on from it. */
export type HotelViewTimed<T> = T & { receivedAt: number };

export interface HotelViewSlice {
    hotelViewBackgrounds: HotelViewBackgrounds;
    /**
     * The code the background schedule (`landing.view.bgtiming`) last answered, `undefined` until it
     * has - `MovingBackgroundObjects.timingCode`, which picks the moving objects' variables.
     */
    hotelViewBackgroundCode: string | undefined;
    /** The last timing code per scheduling string - a container slot shows the widget its code names. */
    hotelViewTimingCodes: Record<string, string>;
    hotelViewSecondsUntil: Record<string, HotelViewSecondsUntil>;
    hotelViewBonusRare: BonusRareInfoMessageType | undefined;
    hotelViewCommunityGoal: CommunityGoalProgressMessageType | undefined;
    /** When the community goal's progress last arrived (`performance.now()`), so its countdown runs on from it. */
    hotelViewCommunityGoalReceivedAt: number;
    hotelViewPromoArticles: PromoArticleData[];
    /** `PromoArticleWidget`'s current article, which it keeps between visits to the reception. */
    hotelViewPromoArticleIndex: number;
    /** `CommunityVoteReceivedEvent` with `acknowledged`: the vote buttons stay hidden. */
    hotelViewCommunityVoted: boolean;
    hotelViewExpiringPage: HotelViewTimed<CatalogPageWithEarliestExpiryMessageType> | undefined;
    hotelViewNextLimited: HotelViewTimed<LimitedOfferAppearingNextMessageType> | undefined;
    /** `IsBadgeRequestFulfilledEvent` per request code: a fulfilled request's button is hidden. */
    hotelViewBadgeRequestsFulfilled: Record<string, boolean>;
    /** The last `IsUserPartOfCompetitionMessageEvent` - every `submitcompetitionroom` element takes it, whatever goal it asked about. */
    hotelViewCompetitionEntry: IsUserPartOfCompetitionMessageType | undefined;
    /** `CATALOG_INVISIBLE_PAGE_VISITED`s so far - each one reactivates a visible reception (`HabboLandingView.onExpiredLinkClick`). */
    hotelViewReactivations: number;
    /** The last `QuestDailyMessageEvent`: the daily quest widget's and element's `refreshContent`. */
    hotelViewDailyQuest: QuestDailyMessageType | undefined;
    /** The last `ConcurrentUsersGoalProgressMessageEvent`, which the `concurrentusers*` elements draw. */
    hotelViewConcurrentUsers: ConcurrentUsersGoalProgressMessageType | undefined;
    /** The last `CommunityGoalHallOfFameMessageEvent`'s leaders. */
    hotelViewHallOfFame: ICommunityGoalHallOfFameData | undefined;
    setHotelViewBackgrounds: (backgrounds: HotelViewBackgrounds) => void;
    setHotelViewTimingCode: (schedulingStr: string, code: string) => void;
    setHotelViewSecondsUntil: (timeStr: string, value: HotelViewSecondsUntil) => void;
    setHotelViewBonusRare: (info: BonusRareInfoMessageType) => void;
    setHotelViewCommunityGoal: (goal: CommunityGoalProgressMessageType) => void;
    setHotelViewPromoArticles: (articles: PromoArticleData[]) => void;
    setHotelViewPromoArticleIndex: (index: number) => void;
    setHotelViewBackgroundCode: (code: string) => void;
    setHotelViewCommunityVoted: (voted: boolean) => void;
    setHotelViewExpiringPage: (page: HotelViewTimed<CatalogPageWithEarliestExpiryMessageType>) => void;
    setHotelViewNextLimited: (offer: HotelViewTimed<LimitedOfferAppearingNextMessageType>) => void;
    setHotelViewDailyQuest: (dailyQuest: QuestDailyMessageType) => void;
    setHotelViewConcurrentUsers: (progress: ConcurrentUsersGoalProgressMessageType) => void;
    setHotelViewHallOfFame: (hallOfFame: ICommunityGoalHallOfFameData) => void;
    setHotelViewBadgeRequestFulfilled: (requestCode: string, fulfilled: boolean) => void;
    setHotelViewCompetitionEntry: (entry: IsUserPartOfCompetitionMessageType) => void;
    reactivateHotelView: () => void;
}

/** `PromoArticleData.linkType`: a web page, an in-client link, or no link (the button is hidden). */
export const PROMO_ARTICLE_LINK_WEB = 0;
export const PROMO_ARTICLE_LINK_CLIENT = 1;
export const PROMO_ARTICLE_LINK_NONE = 2;

/** `setArticleContent`: the button shows unless the article has no link, or a web link with no page. */
export const promoArticleHasLink = (article: PromoArticleData) => !((article.linkType === PROMO_ARTICLE_LINK_NONE) || ((article.linkType === PROMO_ARTICLE_LINK_WEB) && (article.linkContent === '')));

/** `CoreConfigurationManager` property interpolation for external reception images. */
export const hotelViewProperty = (config: Record<string, unknown>, key: string, fallback = ''): string => {
    const property = (name: string): string | undefined => {
        const value = config[name];

        return (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? String(value) : undefined;
    };
    let value = property(key) ?? fallback;

    for (let pass = 0; pass < 10; pass++) {
        const next = value.replace(/\$\{([^}]+)\}/g, (match, name: string) => property(name) ?? match);

        if (next === value) break;

        value = next;
    }

    return value;
};

/** Initial asset_uri values in `landing_view_default_dynamic_layout_xml`. */
export const initialHotelViewBackgrounds = (config: Record<string, unknown>): HotelViewBackgrounds => ({
    background_gradient_top: { uri: '', visible: true },
    background_gradient: { uri: '', visible: true },
    background_right: { uri: '', visible: true },
    background_horizon: { uri: '', visible: true },
    background_hotel_top: { uri: hotelViewProperty(config, 'image.library.url') + 'reception/reception_backdrop_hotel_top_stretch.png', visible: true },
    background_left: { uri: '', visible: true },
});

/** `WidgetContainerLayout.setBackgroundGraphics`: absent/empty URIs keep the last asset. */
export const applyHotelViewTiming = (previous: HotelViewBackgrounds, config: Record<string, unknown>, code: string): HotelViewBackgrounds => {
    const prefix = `landing.view.${code ? `${code}.` : ''}`;

    return Object.fromEntries(Object.entries(previous).map(([ name, background ]) => {
        const visible = hotelViewProperty(config, `${prefix}${name}.visible`) !== 'false';
        const uri = visible ? hotelViewProperty(config, `${prefix}${name}.uri`) : '';

        return [ name, { visible, uri: uri || background.uri } ];
    }));
};

export const createHotelViewSlice: StateCreator<HotelViewSlice, [], [], HotelViewSlice> = set => ({
    hotelViewBackgrounds: {},
    hotelViewBackgroundCode: undefined,
    hotelViewTimingCodes: {},
    hotelViewSecondsUntil: {},
    hotelViewBonusRare: undefined,
    hotelViewCommunityGoal: undefined,
    hotelViewCommunityGoalReceivedAt: 0,
    hotelViewPromoArticles: [],
    hotelViewPromoArticleIndex: 0,
    hotelViewCommunityVoted: false,
    hotelViewExpiringPage: undefined,
    hotelViewNextLimited: undefined,
    hotelViewBadgeRequestsFulfilled: {},
    hotelViewCompetitionEntry: undefined,
    hotelViewReactivations: 0,
    hotelViewDailyQuest: undefined,
    hotelViewConcurrentUsers: undefined,
    hotelViewHallOfFame: undefined,
    setHotelViewBackgrounds: hotelViewBackgrounds => set({ hotelViewBackgrounds }),
    setHotelViewTimingCode: (schedulingStr, code) => set(state => ({ hotelViewTimingCodes: { ...state.hotelViewTimingCodes, [schedulingStr]: code } })),
    setHotelViewSecondsUntil: (timeStr, value) => set(state => ({ hotelViewSecondsUntil: { ...state.hotelViewSecondsUntil, [timeStr]: value } })),
    setHotelViewBonusRare: hotelViewBonusRare => set({ hotelViewBonusRare }),
    setHotelViewCommunityGoal: hotelViewCommunityGoal => set({ hotelViewCommunityGoal, hotelViewCommunityGoalReceivedAt: performance.now() }),
    setHotelViewPromoArticles: hotelViewPromoArticles => set({ hotelViewPromoArticles }),
    setHotelViewPromoArticleIndex: hotelViewPromoArticleIndex => set({ hotelViewPromoArticleIndex }),
    setHotelViewBackgroundCode: hotelViewBackgroundCode => set({ hotelViewBackgroundCode }),
    setHotelViewCommunityVoted: hotelViewCommunityVoted => set({ hotelViewCommunityVoted }),
    setHotelViewExpiringPage: hotelViewExpiringPage => set({ hotelViewExpiringPage }),
    setHotelViewNextLimited: hotelViewNextLimited => set({ hotelViewNextLimited }),
    setHotelViewDailyQuest: hotelViewDailyQuest => set({ hotelViewDailyQuest }),
    setHotelViewConcurrentUsers: hotelViewConcurrentUsers => set({ hotelViewConcurrentUsers }),
    setHotelViewHallOfFame: hotelViewHallOfFame => set({ hotelViewHallOfFame }),
    setHotelViewBadgeRequestFulfilled: (requestCode, fulfilled) => set(state => ({ hotelViewBadgeRequestsFulfilled: { ...state.hotelViewBadgeRequestsFulfilled, [requestCode]: fulfilled } })),
    setHotelViewCompetitionEntry: hotelViewCompetitionEntry => set({ hotelViewCompetitionEntry }),
    reactivateHotelView: () => set(state => ({ hotelViewReactivations: state.hotelViewReactivations + 1 })),
});
