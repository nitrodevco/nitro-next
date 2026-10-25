/**
 * The reception's packets. `WidgetContainerLayout.activate` refreshes every widget and asks the
 * background schedule's timing code on each activation; each widget's `refresh` then asks the
 * server for what it shows:
 *
 * - `WidgetContainerWidget.refresh`: the timing code of the slot's own schedule. The answer picks
 *   the configuration code the slot shows (`onTimingCode` -> `switchCurrentWidget`), and the widget
 *   that code names is refreshed in turn (`refreshContent`).
 * - `GenericWidget.refresh`: each element's. `CustomTimerElementHandler` asks the seconds until its
 *   time string; `RequestBadgeButtonElementHandler` whether its badge request is fulfilled, and asks
 *   again on every `WiredRewardResultMessageEvent` once it exists; the `submitcompetitionroom`
 *   element whether the user is part of its goal's competition; the `communitygoaltimer` and
 *   `communitygoalscore` elements the community goal's progress - the score element again every
 *   `<pollMillis>` from then on (its `Timer`, which only `disable` - the games centre - stops);
 *   `DailyQuestElementHandler` the first easy daily quest; `ConcurrentUsersInfoElementHandler` the
 *   concurrent users goal's progress, and again every five seconds while the reception shows until
 *   a progress says the goal is reached (`onUpdateTimer`, stopped in `updateLocalization`).
 * - `DailyQuestWidget.refresh`: the first easy daily quest. The widget and the element ask for the
 *   next one, another difficulty, accept and cancel from their views.
 * - `CommunityGoalHallOfFameWidget.refresh`: the timing code of `landing.view.dynamic.slot.6.conf`;
 *   its answer asks for that code's hall of fame (`onTimingCode`). `CommunityGoalPrizesWidget` asks
 *   nothing - it draws the community goal's progress whoever asked for it.
 * - `BonusRarePromoWidget`: the bonus rare, from `initialize` and again from `refresh`, so twice
 *   on the first activation as in Flash.
 * - `PromoArticleWidget.refresh`: the articles, at most once in ten minutes.
 * - `CommunityGoalWidget.requestCommunityGoalProgress`: the progress, unless a request is pending.
 * - `HabboWayPromoWidget.refresh`: the community goal's progress too, for its counter - every time.
 * - `ExpiringCatalogPageWidget` (and its small one): the page that expires first, at most once in
 *   thirty seconds.
 * - `NextLimitedRareCountdownWidget`: the next limited rare, from `initialize` and from `refresh`
 *   (at most once in thirty seconds), unless `next.limited.rare.countdown.widget.disabled`; and again
 *   a second after the countdown it was told runs out (`setModeSwitchTimer`).
 *
 * The background schedule's answer also gives `MovingBackgroundObjects` its timing code. A visit
 * to an invisible catalogue page activates a visible reception again (`onExpiredLinkClick`).
 *
 * Every answer is filtered on what was asked (the scheduling or time string), as each listener
 * does. The listeners survive entering a room, as do the Flash layout and its current art.
 */
import {
    BonusRareInfoMessage, CatalogPageWithEarliestExpiryMessage, CommunityGoalHallOfFameMessage, CommunityGoalProgressMessage, CommunityVoteReceivedMessage, ConcurrentUsersGoalProgressMessage, CurrentTimingCodeMessage, GetBonusRareInfoComposer,
    GetCatalogPageWithEarliestExpiryComposer, GetCommunityGoalHallOfFameComposer, GetCommunityGoalProgressComposer, GetConcurrentUsersGoalProgressComposer, GetCurrentTimingCodeComposer, GetDailyQuestComposer, GetIsBadgeRequestFulfilledComposer, GetIsUserPartOfCompetitionComposer, GetLimitedOfferAppearingNextComposer, GetPromoArticlesComposer, GetSecondsUntilComposer,
    IsBadgeRequestFulfilledEventMessage, IsUserPartOfCompetitionMessage, LimitedOfferAppearingNextMessage, PromoArticlesMessage, QuestDailyMessage, SecondsUntilMessage, WiredRewardResultMessage,
} from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import {
    applyHotelViewTiming, BOTTOM_SLOT_LANDING_VIEW_WIDGETS, CONCURRENT_USERS_UPDATE_INTERVAL_MS, configBoolean, hallOfFameSchedule, HOTEL_VIEW_BOTTOM_SLOT, hotelViewBadgeRequestCode, hotelViewCodeWidget, hotelViewCommunityGoalScorePollMillis, hotelViewCompetitionGoalCode, hotelViewGenericConf, HotelViewGenericElement, hotelViewProperty, hotelViewSlotSchedule, hotelViewSlotWidget, hotelViewTimerTimeStr, initialHotelViewBackgrounds, isConcurrentUsersGoalReached, LANDING_VIEW_DYNAMIC_SLOTS,
    LANDING_VIEW_ELEMENT_COMMUNITYGOALSCORE, LANDING_VIEW_ELEMENT_COMMUNITYGOALTIMER, LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO, LANDING_VIEW_ELEMENT_CUSTOMTIMER,
    LANDING_VIEW_ELEMENT_DAILYQUEST,
    LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS, LANDING_VIEW_ELEMENT_SUBMITCOMPETITIONROOM, LandingViewWidgetType, parseHotelViewGenericConf, systemStore,
} from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `PromoArticleWidget.refresh`: a new request only once the last is ten minutes old. */
const PROMO_ARTICLES_REQUEST_INTERVAL_MS = 600000;

/** `ExpiringCatalogPageWidget.refresh` and `NextLimitedRareCountdownWidget.refresh`: a new request only once the last is thirty seconds old. */
const COUNTDOWN_REQUEST_INTERVAL_MS = 30000;

export const registerHotelViewHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const {
        setHotelViewBackgroundCode, setHotelViewBackgrounds, setHotelViewBonusRare, setHotelViewCommunityGoal, setHotelViewCommunityVoted, setHotelViewExpiringPage, setHotelViewNextLimited, setHotelViewPromoArticles,
        setHotelViewSecondsUntil, setHotelViewTimingCode, setHotelViewBadgeRequestFulfilled, setHotelViewCompetitionEntry,
        setHotelViewDailyQuest, setHotelViewConcurrentUsers, setHotelViewHallOfFame,
    } = systemStore.getState();
    /** Whether a `CommunityGoalHallOfFameWidget` was built, which alone listens for its schedule's timing code. */
    let hallOfFameInitialized = false;
    /**
     * Each `ConcurrentUsersInfoElementHandler`'s update timer, by element: started when it is built,
     * and stopped for good (`null`) by the progress that reaches the goal.
     */
    const concurrentUsersPolls = new Map<string, ReturnType<typeof setInterval> | null>();
    let schedulingStr: string | undefined;
    let communityGoalPending = false;
    let nextLimitedTimer: ReturnType<typeof setTimeout> | undefined;
    const promoArticlesRequestedAt = new Map<string, number>();
    const countdownRequestedAt = new Map<string, number>();

    /** A widget's `refresh` throttle: whether the last request under the key is old enough, marking it if so. */
    const countdownDue = (key: string) => {
        const now = Date.now();
        const last = countdownRequestedAt.get(key);

        if ((last !== undefined) && ((now - last) <= COUNTDOWN_REQUEST_INTERVAL_MS)) return false;

        countdownRequestedAt.set(key, now);

        return true;
    };

    /** `NextLimitedRareCountdownWidget.requestNextLimitedRare`. */
    const requestNextLimited = () => {
        if (configBoolean('next.limited.rare.countdown.widget.disabled')) return;

        send(new GetLimitedOfferAppearingNextComposer({}));
    };
    const initializedWidgets = new Set<string>();
    /** The request codes of every `RequestBadgeButtonElementHandler` built so far, each listening for a wired reward. */
    const badgeRequestCodes = new Set<string>();
    /** The running `communitygoalscore` poll timers, by element. */
    const communityGoalScorePolls = new Map<string, ReturnType<typeof setInterval>>();

    /** `GenericWidget.refresh`: one element handler's `refresh`. */
    const refreshElement = (element: HotelViewGenericElement, key: string) => {
        if (element.type === LANDING_VIEW_ELEMENT_CUSTOMTIMER) {
            send(new GetSecondsUntilComposer({ timeStr: hotelViewTimerTimeStr(element) }));
        } else if (LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS.has(element.type)) {
            const requestCode = hotelViewBadgeRequestCode(element);

            badgeRequestCodes.add(requestCode);
            send(new GetIsBadgeRequestFulfilledComposer({ requestCode }));
        } else if (element.type === LANDING_VIEW_ELEMENT_SUBMITCOMPETITIONROOM) {
            send(new GetIsUserPartOfCompetitionComposer({ goalCode: hotelViewCompetitionGoalCode(element) }));
        } else if (element.type === LANDING_VIEW_ELEMENT_DAILYQUEST) {
            send(new GetDailyQuestComposer({ easy: true, index: 0 }));
        } else if (element.type === LANDING_VIEW_ELEMENT_CONCURRENTUSERSINFO) {
            send(new GetConcurrentUsersGoalProgressComposer({}));

            // `onUpdateTimer`: every five seconds while the reception shows.
            if (!concurrentUsersPolls.has(key)) {
                concurrentUsersPolls.set(key, setInterval(() => {
                    if (systemStore.getState().landingViewVisible) send(new GetConcurrentUsersGoalProgressComposer({}));
                }, CONCURRENT_USERS_UPDATE_INTERVAL_MS));
            }
        } else if (element.type === LANDING_VIEW_ELEMENT_COMMUNITYGOALTIMER) {
            send(new GetCommunityGoalProgressComposer({}));
        } else if (element.type === LANDING_VIEW_ELEMENT_COMMUNITYGOALSCORE) {
            const pollMillis = hotelViewCommunityGoalScorePollMillis(element);

            send(new GetCommunityGoalProgressComposer({}));

            // `Timer.start` on a running timer changes nothing. A period of 0 or less is not polled.
            if (!communityGoalScorePolls.has(key) && (pollMillis > 0)) communityGoalScorePolls.set(key, setInterval(() => send(new GetCommunityGoalProgressComposer({})), pollMillis));
        }
    };

    /** `WidgetContainer.refresh`: the widget's `initialize` the first time, then its `refresh`. */
    const refreshWidget = (type: string, slot: number, code: string | null) => {
        const { config } = systemStore.getState();
        const key = `${slot}:${code ?? ''}:${type}`;
        const firstTime = !initializedWidgets.has(key);

        initializedWidgets.add(key);

        switch (type) {
            case LandingViewWidgetType.WIDGETCONTAINER:
                send(new GetCurrentTimingCodeComposer({ slotConfig: hotelViewSlotSchedule(config, slot) }));
                return;
            case LandingViewWidgetType.GENERIC:
                parseHotelViewGenericConf(hotelViewGenericConf(config, slot, code, 'conf')).forEach((element, index) => refreshElement(element, `${key}:${index}`));
                return;
            case LandingViewWidgetType.BONUSRARE:
                if (firstTime) send(new GetBonusRareInfoComposer({}));
                send(new GetBonusRareInfoComposer({}));
                return;
            case LandingViewWidgetType.PROMOARTICLE: {
                const now = Date.now();
                const last = promoArticlesRequestedAt.get(key);

                if ((last === undefined) || ((last + PROMO_ARTICLES_REQUEST_INTERVAL_MS) < now)) {
                    send(new GetPromoArticlesComposer({}));
                    promoArticlesRequestedAt.set(key, now);
                }
                return;
            }
            case LandingViewWidgetType.EXPIRINGCATALOGPAGE:
            case LandingViewWidgetType.EXPIRINGCATALOGPAGESMALL:
                if (countdownDue(key)) send(new GetCatalogPageWithEarliestExpiryComposer({}));
                return;
            case LandingViewWidgetType.NEXTLIMITEDRARECOUNTDOWN:
                // `initialize` asks without marking the time, so the first `refresh` asks again.
                if (firstTime) requestNextLimited();
                if (countdownDue(key)) requestNextLimited();
                return;
            case LandingViewWidgetType.COMMUNITYGOAL:
            case LandingViewWidgetType.COMMUNITYGOALVS:
            case LandingViewWidgetType.COMMUNITYGOALVSVOTE:
                if (!communityGoalPending) {
                    send(new GetCommunityGoalProgressComposer({}));
                    communityGoalPending = true;
                }
                return;
            case LandingViewWidgetType.DAILYQUEST:
                send(new GetDailyQuestComposer({ easy: true, index: 0 }));
                return;
            case LandingViewWidgetType.ACHIEVEMENTCOMPETITIONHALLOFFAME:
                // `refresh`: the timing code of the bottom slot's schedule, whichever slot it is in.
                hallOfFameInitialized = true;
                send(new GetCurrentTimingCodeComposer({ slotConfig: hallOfFameSchedule(config) }));
                return;
            case LandingViewWidgetType.HABBOWAYPROMO:
                // `HabboWayPromoWidget.refresh`: on every refresh, with no pending check of its own.
                send(new GetCommunityGoalProgressComposer({}));
                return;
        }
    };

    const activate = () => {
        const { config } = systemStore.getState();

        if (schedulingStr === undefined) {
            schedulingStr = hotelViewProperty(config, 'landing.view.bgtiming');
            setHotelViewBackgrounds(initialHotelViewBackgrounds(config));
        }

        for (const slot of LANDING_VIEW_DYNAMIC_SLOTS) refreshWidget(hotelViewSlotWidget(config, slot), slot, null);

        // `setupBottomSlotWidgetName`: a fixed widget named for the bottom slot is refreshed with the rest.
        const bottom = hotelViewSlotWidget(config, HOTEL_VIEW_BOTTOM_SLOT);

        if (BOTTOM_SLOT_LANDING_VIEW_WIDGETS.has(bottom)) refreshWidget(bottom, HOTEL_VIEW_BOTTOM_SLOT, null);

        send(new GetCurrentTimingCodeComposer({ slotConfig: schedulingStr }));
    };

    const unsubscribePackets = subscribeAll(subscribe, [
        on(CurrentTimingCodeMessage, (data) => {
            const { config, hotelViewBackgrounds } = systemStore.getState();

            if ((schedulingStr !== undefined) && (data.schedulingStr === schedulingStr)) {
                setHotelViewBackgrounds(applyHotelViewTiming(hotelViewBackgrounds, config, data.code));
                setHotelViewBackgroundCode(data.code);
            }

            for (const slot of LANDING_VIEW_DYNAMIC_SLOTS) {
                if (hotelViewSlotWidget(config, slot) !== LandingViewWidgetType.WIDGETCONTAINER) continue;
                if (hotelViewSlotSchedule(config, slot) !== data.schedulingStr) continue;

                setHotelViewTimingCode(data.schedulingStr, data.code);

                if (data.code !== '') refreshWidget(hotelViewCodeWidget(config, data.code), slot, data.code);
            }

            // `CommunityGoalHallOfFameWidget.onTimingCode`: the code's leaders, its list laid out by the code's variables.
            if (hallOfFameInitialized && (data.schedulingStr === hallOfFameSchedule(config)) && (data.code !== '')) {
                setHotelViewTimingCode(data.schedulingStr, data.code);
                send(new GetCommunityGoalHallOfFameComposer({ code: data.code }));
            }
        }),
        on(QuestDailyMessage, data => setHotelViewDailyQuest(data)),
        on(ConcurrentUsersGoalProgressMessage, (data) => {
            setHotelViewConcurrentUsers(data);

            // `updateLocalization`: a reached goal stops every element's timer.
            if (!isConcurrentUsersGoalReached(data.state)) return;

            for (const [ key, poll ] of concurrentUsersPolls) {
                clearInterval(poll ?? undefined);
                concurrentUsersPolls.set(key, null);
            }
        }),
        on(CommunityGoalHallOfFameMessage, data => setHotelViewHallOfFame(data.data)),
        on(SecondsUntilMessage, data => setHotelViewSecondsUntil(data.timeStr, { seconds: data.secondsUntil, receivedAt: performance.now() })),
        on(BonusRareInfoMessage, data => setHotelViewBonusRare(data)),
        on(PromoArticlesMessage, data => setHotelViewPromoArticles(data.articles.slice(0, 10))),
        on(CommunityGoalProgressMessage, (data) => {
            communityGoalPending = false;
            setHotelViewCommunityGoal(data);
        }),
        on(CommunityVoteReceivedMessage, (data) => {
            if (data.acknowledged) setHotelViewCommunityVoted(true);
        }),
        on(IsBadgeRequestFulfilledEventMessage, data => setHotelViewBadgeRequestFulfilled(data.requestCode, data.fulfilled)),
        // `RequestBadgeButtonElementHandler.onReward`: each badge button asks again.
        on(WiredRewardResultMessage, () => {
            for (const requestCode of badgeRequestCodes) send(new GetIsBadgeRequestFulfilledComposer({ requestCode }));
        }),
        on(IsUserPartOfCompetitionMessage, data => setHotelViewCompetitionEntry(data)),
        on(CatalogPageWithEarliestExpiryMessage, data => setHotelViewExpiringPage({ ...data, receivedAt: performance.now() })),
        on(LimitedOfferAppearingNextMessage, (data) => {
            setHotelViewNextLimited({ ...data, receivedAt: performance.now() });

            // `setModeSwitchTimer`: asked again a second after the countdown runs out.
            if (nextLimitedTimer !== undefined) clearTimeout(nextLimitedTimer);

            nextLimitedTimer = (data.appearsInSeconds > 0) ? setTimeout(requestNextLimited, (data.appearsInSeconds + 1) * 1000) : undefined;
        }),
    ]);
    const unsubscribeStore = systemStore.subscribe((state, previous) => {
        if (state.landingViewVisible && !previous.landingViewVisible) activate();
        // `HabboLandingView.onExpiredLinkClick`: only once initialized, and while the reception shows.
        else if ((state.hotelViewReactivations !== previous.hotelViewReactivations) && state.landingViewVisible && (schedulingStr !== undefined)) activate();
    });

    if (systemStore.getState().landingViewVisible) activate();

    return () => {
        unsubscribePackets();
        unsubscribeStore();
        if (nextLimitedTimer !== undefined) clearTimeout(nextLimitedTimer);
        for (const poll of communityGoalScorePolls.values()) clearInterval(poll);
        for (const poll of concurrentUsersPolls.values()) clearInterval(poll ?? undefined);
        setHotelViewBackgrounds({});
    };
};
