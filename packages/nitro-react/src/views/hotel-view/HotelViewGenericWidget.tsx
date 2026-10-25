/**
 * `GenericWidget`: a reception promo built from two hotel variables into `generic_widget`.
 *
 * `configureContentColumn`: `conf` is the column's elements, one `type,args...` per `;`, each built
 * from its layout (`element_<type>`, or the one its handler names) and wired by its
 * `LandingViewElementType` handler, then added to `content_container` - or, for a floating one, to
 * the widget itself at its own position:
 *
 * - `caption`, `subcaption`, `bodytext` (`TextElementHandler`): the text `${arg}`, optionally a
 *   width. The optional `border` argument draws the layout editor's debug outline and is ignored.
 * - `title` (`TitleElementHandler`, `element_title`): the heading `${arg}`, its line running on
 *   from it (`positionAfterAndStretch`). Floating in a wide slot, or when its second argument says
 *   so, and then as wide as its pane.
 * - `spacing` (`SpacingElementHandler`): an empty row `arg` pixels tall.
 * - `image` (`§_-iB§`, `element_image`): `${image.library.url}<path>`, at the x given.
 * - `rewardbadge` (`§_-PX§`, `element_rewardbadge`): the image library's
 *   `album1584/<badge>.png`, its description emptied.
 * - The buttons (`§_-yz§`'s `element_button`, the caption `${arg}`, then their own arguments):
 *   - `catalogbutton` (`CatalogButtonElementHandler`): opens the catalogue at the page named, or
 *     where it was left.
 *   - `internallinkbutton` (`InternalLinkButtonElementHandler`): follows an in-client link.
 *   - `promotedroombutton` (`§_-t1R§`): a random promoted room of the
 *     category, or of `landing.view.roomcategory` (`HabboLandingView.goToRoom`).
 *   - `gotoroombutton` (`GoToRoomButtonElementHandler`): the room id's room
 *     (`HabboNavigator.goToPrivateRoom`).
 *   - `gotohomeroombutton` (`§_-r3§`): the home room (`HabboNavigator.goToHomeRoom`).
 *   - `gotocompetitionroombutton` (`§_-H1Q§`): a random room of the goal's competition.
 *   - `submitcompetitionroom` (`§_-aV§`): the user's own competition room once the server says there is one
 *     (and then captioned with its second key), else a room they can submit.
 *   - `requestbadgebutton` .. `requestbadgebuttonfifth` (`RequestBadgeButtonElementHandler`): asks
 *     for the badge of its request code, at its own x/y, floating unless its last argument is
 *     `false`, and hidden once the server says the request is fulfilled.
 *   - `credithabbletbutton` (`§_-aS§`): the web shop (`HabboCatalog.openCreditsHabblet`).
 *   - `buyvipbutton` (`§_-f2C§`): the club centre (`HabboCatalog.openClubCenter`).
 * - `link` (`LinkElementHandler`): the "leaving the hotel" alert, and the page.
 * - `customtimer` (`CustomTimerElementHandler`, `element_timer`): a countdown to a hotel time,
 *   captioned with its running or expired text (no caption before the first answer), floating at
 *   its own position when its first argument says so.
 * - `communitygoaltimer` (`§_-q1P§`, an `AbstractTimerElementHandler`): the same, counting
 *   down the community goal's time left - none once it has expired.
 * - `communitygoalscore` (`§_-HO§`, `element_community_goal_score`): the
 *   community's total score on the window manager's running number, its digits and update
 *   frequency given. The first progress after an activation is shown at once (`initialNumber`),
 *   later ones run up to (`number`); `registerHotelViewHandlers` polls for them.
 * - `dailyquest` (`DailyQuestElementHandler`), `concurrentusersinfo`
 *   (`ConcurrentUsersInfoElementHandler`) and `concurrentusersmeter` (`§_-41h§`): see
 *   `useHotelViewQuestElements` - the info element also re-keys the first `caption` and `bodytext`.
 *
 * What each element asks the server in its `refresh` is asked by `registerHotelViewHandlers`, which
 * keeps the answers in `systemStore`. The competition buttons' `HabboQuestEngine.reenableRoomCompetitionWindow`
 * has nothing to re-enable: the room competition window (`RoomCompetitionController`) is not ported.
 * The column leaves out a type `elementItem` has no case for. The tracking calls the handlers make
 * (`trackGoogle`, `trackEventLog`) have no receiver here.
 *
 * `configureLayout` then applies `layout`'s entries in order: the content column at 230 in a wide
 * slot, the widget its pane's width, the `bitmap` and the column placed and sized, and the widget at
 * least `container.height` tall. The widget takes its children's size (`resize_to_accommodate_children`).
 * `WidgetContainerLayout.applyCommonWidgetSettings` colours the `COLORABLE` texts.
 */
import { useState } from 'react';

import { goToCompetitionRoom, goToHomeRoom, goToPrivateRoom, goToPromotedRoom, openCatalogExternalLink, openClientLink, openClubCenter, openCreditsHabblet, requestHotelViewBadge, submitCompetitionRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    hotelViewBadgeRequestCode, hotelViewColorableBindings, hotelViewColorableFormat, HotelViewCommonSettings, hotelViewGenericConf, HotelViewGenericElement, hotelViewPaneWidths, hotelViewProperty, HotelViewSecondsUntil,
    hotelViewTimerTimeStr, isFloatingHotelViewQuestElement,
    isWideHotelViewSlot, LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS, parseHotelViewGenericConf, parseHotelViewGenericLayout, useConfigData, useSystemStore, useWindowActions,
} from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Box, CountdownWidget, RunningNumberWidget, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateLibrary } from '#base/theme';

import { hotelViewInt } from './hotelViewInt';
import { configureHotelViewLayout, HOTEL_VIEW_LIBRARY, hotelViewLayoutBitmap, hotelViewTemplate, hotelViewTemplateId, positionAfterAndStretch } from './hotelViewTemplate';
import { HOTEL_VIEW_QUEST_ELEMENT_LAYOUTS, useHotelViewQuestElements } from './useHotelViewQuestElements';

/** Each drawn element type's layout (`ILayoutNameProvider.layoutName`, else `element_<type>`). */
const ELEMENT_LAYOUTS: Readonly<Record<string, string>> = {
    caption: 'element_caption',
    subcaption: 'element_subcaption',
    bodytext: 'element_bodytext',
    title: 'element_title',
    spacing: 'element_spacing',
    image: 'element_image',
    rewardbadge: 'element_rewardbadge',
    catalogbutton: 'element_button',
    internallinkbutton: 'element_button',
    promotedroombutton: 'element_button',
    gotoroombutton: 'element_button',
    gotohomeroombutton: 'element_button',
    gotocompetitionroombutton: 'element_button',
    submitcompetitionroom: 'element_button',
    credithabbletbutton: 'element_button',
    buyvipbutton: 'element_button',
    requestbadgebutton: 'element_button',
    requestbadgebuttonsecond: 'element_button',
    requestbadgebuttonthird: 'element_button',
    requestbadgebuttonfourth: 'element_button',
    requestbadgebuttonfifth: 'element_button',
    link: 'element_link',
    customtimer: 'element_timer',
    communitygoaltimer: 'element_timer',
    communitygoalscore: 'element_community_goal_score',
    ...HOTEL_VIEW_QUEST_ELEMENT_LAYOUTS,
};

/**
 * `§_-a2C§.isFloating(isWideSlot)`: placed on the widget at its own position rather than in
 * the column - a timer or the score when its argument says so, a title in a wide slot or when its
 * argument says so, a badge button unless its argument says not.
 */
const isFloating = ({ type, args }: HotelViewGenericElement, wide: boolean): boolean => {
    if (LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS.has(type)) return (args.length > 4) ? (args[4] === 'true') : true;

    switch (type) {
        case 'customtimer':
        case 'communitygoaltimer':
            return args[0] === 'true';
        case 'title':
            return wide || ((args.length > 1) && (args[1] === 'true'));
        case 'communitygoalscore':
            return args[3] === 'true';
        default:
            return isFloatingHotelViewQuestElement({ type, args });
    }
};

/**
 * `§_-HO§.onCommunityGoalProgress`: the first progress since `refresh` is
 * the running number's `initialNumber`, shown at once, and each one after it the `number` it runs up
 * to. The element is built when the reception activates, so the first answer since it mounted is
 * the first since `refresh`; until then it shows the last score known, as Flash's widget would.
 */
const CommunityGoalScore = ({ digits, updateFrequency }: { digits: number; updateFrequency: number }) => {
    const goal = useSystemStore(x => x.hotelViewCommunityGoal);
    const [ seen, setSeen ] = useState(() => ({ goal, initial: goal?.communityTotalScore, answered: false }));

    if (goal && (seen.goal !== goal)) setSeen({ goal, initial: seen.answered ? seen.initial : goal.communityTotalScore, answered: true });

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0 }}>
            <RunningNumberWidget
                number={goal?.communityTotalScore ?? 0}
                initialNumber={seen.initial}
                digits={digits}
                updateFrequency={updateFrequency}
            />
        </Box>
    );
};

export interface HotelViewGenericWidgetProps {
    slot: number;
    /** The configuration code a `WidgetContainerWidget` chose, or null for a slot's own generic widget. */
    code: string | null;
    settings: HotelViewCommonSettings;
}

export const HotelViewGenericWidget = ({ slot, code, settings }: HotelViewGenericWidgetProps) => {
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const { showWindow, hideWindow } = useWindowActions();
    const templates = useTemplateLibrary(HOTEL_VIEW_LIBRARY);
    const secondsUntil = useSystemStore(x => x.hotelViewSecondsUntil);
    const communityGoal = useSystemStore(x => x.hotelViewCommunityGoal);
    const communityGoalReceivedAt = useSystemStore(x => x.hotelViewCommunityGoalReceivedAt);
    const badgeRequestsFulfilled = useSystemStore(x => x.hotelViewBadgeRequestsFulfilled);
    const competitionEntry = useSystemStore(x => x.hotelViewCompetitionEntry);
    const now = useSecondsClock();
    const panes = hotelViewPaneWidths(config);
    const wide = isWideHotelViewSlot(slot);
    const paneWidth = wide ? panes.left : panes.right;
    const imageLibrary = hotelViewProperty(config, 'image.library.url');
    const elements = parseHotelViewGenericConf(hotelViewGenericConf(config, slot, code, 'conf'));
    const layout = parseHotelViewGenericLayout(hotelViewGenericConf(config, slot, code, 'layout'));
    const colorable = (bindings: TemplateBindings, names: readonly string[]) => hotelViewColorableBindings(settings, names, bindings);
    const questElements = useHotelViewQuestElements(elements, settings);

    /**
     * `AbstractTimerElementHandler.setTimer` / `setCaption`: the countdown and the caption for its
     * state, from the last answer - none before the first.
     */
    const timerBindings = (args: string[], received: HotelViewSecondsUntil | undefined): TemplateBindings => {
        const seconds = received ? Math.max(0, received.seconds - ((now - received.receivedAt) / 1000)) : 0;
        const caption = received ? ((received.seconds > 0) ? args[3] : args[4]) : '';

        return colorable({
            timer_caption_txt: { visible: !!caption, caption: caption ? `\${${caption}}` : '' },
            countdown_widget: {
                visible: !!received && (received.seconds > 0),
                children: (
                    <CountdownWidget
                        seconds={seconds}
                        colorableFormat={hotelViewColorableFormat(settings)}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                ),
            },
        }, [ 'timer_caption_txt' ]);
    };

    /** `§_-q1P§.onCommunityGoalProgress`: no time left once the goal has expired. */
    const communityGoalTimer: HotelViewSecondsUntil | undefined = communityGoal
        ? { seconds: communityGoal.hasGoalExpired ? 0 : communityGoal.timeRemainingInSeconds, receivedAt: communityGoalReceivedAt }
        : undefined;

    /** A timer's or the score's `initialize`: a floating one at its own x/y. */
    const placeFloating = (element: HotelViewGenericElement, xArg: number) => ({ root }: TemplateWindows) => {
        if (!isFloating(element, wide)) return;

        root()?.setX(hotelViewInt(element.args[xArg]));
        root()?.setY(hotelViewInt(element.args[xArg + 1]));
    };

    /** The button elements' `onClick` (the `§_-yz§` subclasses'), by type. */
    const buttonClick = ({ type, args }: HotelViewGenericElement): (() => void) | undefined => {
        if (LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS.has(type)) return () => requestHotelViewBadge(send, args[1] ?? '');

        switch (type) {
            case 'promotedroombutton':
                return () => goToPromotedRoom(send, args[1]);
            case 'gotoroombutton':
                return () => goToPrivateRoom(send, hotelViewInt(args[1]));
            case 'gotohomeroombutton':
                return () => goToHomeRoom(send);
            case 'gotocompetitionroombutton':
                return () => goToCompetitionRoom(send, args[1] ?? '');
            case 'submitcompetitionroom':
                return () => submitCompetitionRoom(send, competitionEntry);
            case 'credithabbletbutton':
                return () => openCreditsHabblet();
            case 'buyvipbutton':
                return () => openClubCenter(send);
            default:
                return undefined;
        }
    };

    /** The element's handler `initialize`: what it sets on its window, and where it puts it. */
    const elementItem = (element: HotelViewGenericElement, index: number): TemplateItem | undefined => {
        const from = hotelViewTemplate(templates, ELEMENT_LAYOUTS[element.type] ?? '');
        const { type, args } = element;
        const key = `${index}_${type}`;

        if (!from) return undefined;

        if (LANDING_VIEW_ELEMENT_REQUESTBADGEBUTTONS.has(type)) {
            return {
                key,
                from,
                bindings: {
                    // `onInfo`: hidden once the server says this request is fulfilled.
                    '': { caption: `\${${args[0]}}`, visible: !badgeRequestsFulfilled[hotelViewBadgeRequestCode(element)], onPointerTap: buttonClick(element) },
                },
                arrange: ({ root }) => {
                    root()?.setX(hotelViewInt(args[2]));
                    root()?.setY(hotelViewInt(args[3]));
                },
            };
        }

        switch (type) {
            case 'caption':
            case 'subcaption':
            case 'bodytext':
                return {
                    key,
                    from,
                    bindings: colorable({ '': { caption: `\${${questElements.textKey(element, index) ?? args[0]}}` } }, [ '' ]),
                    arrange: ({ root }) => {
                        if (args.length > 1) root()?.setWidth(hotelViewInt(args[1]));
                    },
                };
            case 'title':
                return {
                    key,
                    from,
                    bindings: colorable({ title_txt: { caption: `\${${args[0]}}` } }, [ 'title_txt' ]),
                    arrange: (windows) => {
                        positionAfterAndStretch(windows, 'title_txt', 'hdr_line');

                        // `configureContentColumn`: a floating title is as wide as its pane.
                        if (isFloating(element, wide)) windows.root()?.setWidth(paneWidth);
                    },
                };
            case 'spacing':
                return { key, from, arrange: ({ root }) => root()?.setHeight(hotelViewInt(args[0])) };
            case 'image':
                return {
                    key,
                    from,
                    bindings: { '': { asset: `${imageLibrary}${args[0] ?? ''}` } },
                    arrange: ({ root }) => root()?.setX(hotelViewInt(args[1])),
                };
            case 'rewardbadge':
                return {
                    key,
                    from,
                    bindings: colorable({
                        badge_desc: { caption: '' },
                        badge_image: { asset: `${imageLibrary}album1584/${args[0] ?? ''}.png` },
                    }, [ 'badge_desc' ]),
                };
            case 'catalogbutton':
            case 'internallinkbutton':
                return {
                    key,
                    from,
                    bindings: {
                        '': {
                            caption: `\${${args[0]}}`,
                            onPointerTap: () => {
                                if (type === 'internallinkbutton') {
                                    openClientLink(send, args[1] ?? '');

                                    return;
                                }

                                // `HabboCatalog.openCatalogPage` / `openCatalog`: the normal catalogue replaces the Builders Club one.
                                hideWindow('builders_catalog');

                                if (args[1]) showWindow('catalog', { pageName: args[1] });
                                else showWindow('catalog');
                            },
                        },
                    },
                };
            case 'submitcompetitionroom':
                return {
                    key,
                    from,
                    // `onInfo`: captioned with the submitted key once the user is part of the competition.
                    bindings: { '': { caption: `\${${competitionEntry?.isPartOf ? args[1] : args[0]}}`, onPointerTap: buttonClick(element) } },
                };
            case 'promotedroombutton':
            case 'gotoroombutton':
            case 'gotohomeroombutton':
            case 'gotocompetitionroombutton':
            case 'credithabbletbutton':
            case 'buyvipbutton':
                return { key, from, bindings: { '': { caption: `\${${args[0]}}`, onPointerTap: buttonClick(element) } } };
            case 'link':
                return {
                    key,
                    from,
                    // `LinkElementHandler` sets its procedure on the region, which draws in its parent's graphics
                    // (`parentGraphics`): such a window is hit only where the shared buffer is drawn
                    // (`WindowController.testLocalPointHitAgainstAlpha`, threshold 10), so only its text takes
                    // the press, not the 252 wide row. The text's own box stands for that here.
                    bindings: colorable({
                        link_txt: { caption: `\${${args[0]}}`, onPointerTap: () => openCatalogExternalLink(args[1] ?? '') },
                    }, [ 'link_txt' ]),
                };
            case 'customtimer':
                return { key, from, bindings: timerBindings(args, secondsUntil[hotelViewTimerTimeStr(element)]), arrange: placeFloating(element, 1) };
            case 'communitygoaltimer':
                return { key, from, bindings: timerBindings(args, communityGoalTimer), arrange: placeFloating(element, 1) };
            case 'communitygoalscore':
                return {
                    key,
                    from,
                    bindings: {
                        running_number_widget: {
                            children: (
                                <CommunityGoalScore
                                    digits={hotelViewInt(args[0])}
                                    updateFrequency={hotelViewInt(args[1])}
                                />
                            ),
                        },
                    },
                    arrange: placeFloating(element, 4),
                };
            default:
                // `dailyquest`, `concurrentusersinfo`, `concurrentusersmeter`.
                return questElements.item(element, key, from);
        }
    };

    const items = elements.flatMap((element, index) => {
        const item = elementItem(element, index);

        return item ? [ { item, floating: isFloating(element, wide) } ] : [];
    });
    const bitmapUri = hotelViewLayoutBitmap(layout);

    /** `configureLayout`, once the column is built. */
    const arrange = (windows: TemplateWindows) => configureHotelViewLayout(windows, layout, wide, paneWidth);

    return (
        <TemplateWindow
            id={hotelViewTemplateId('generic_widget')}
            bindings={{
                '': { added: items.filter(entry => entry.floating).map(entry => entry.item) },
                bitmap: { asset: bitmapUri },
                // `addListItem`: each element after the last, the column only lengthened.
                content_container: { items: items.filter(entry => !entry.floating).map(entry => ({ ...entry.item, append: true })) },
            }}
            arrange={arrange}
            parameters={questElements.parameters}
        />
    );
};
