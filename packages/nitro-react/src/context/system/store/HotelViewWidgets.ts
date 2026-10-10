/**
 * The reception's widget configuration, read from the hotel's `landing.view.*` variables the way
 * `WidgetContainerLayout.registerDynamicWidgets`, `WidgetContainerWidget.createWidgetContainer`
 * and `GenericWidget.configureContentColumn` / `configureLayout` read them. Pure functions of the
 * config, shared by the reception's packet handler (what each widget asks the server for) and its
 * views (what each widget draws).
 */
import type { ColorableTextFormat, TemplateBindings } from '#base/theme';

import { hotelViewProperty } from './HotelViewSlice';

/** `LandingViewWidgetType`: the widget names a slot's `.widget` variable can carry. */
export const LandingViewWidgetType = {
    AVATARIMAGE: 'avatarimage',
    EXPIRINGCATALOGPAGE: 'expiringcatalogpage',
    EXPIRINGCATALOGPAGESMALL: 'expiringcatalogpagesmall',
    COMMUNITYGOAL: 'communitygoal',
    COMMUNITYGOALVS: 'communitygoalvsmode',
    COMMUNITYGOALVSVOTE: 'communitygoalvsmodevote',
    CATALOGPROMO: 'catalogpromo',
    CATALOGPROMOSMALL: 'catalogpromosmall',
    ACHIEVEMENTCOMPETITIONHALLOFFAME: 'achievementcompetition_hall_of_fame',
    ACHIEVEMENTCOMPETITIONPRIZES: 'achievementcompetition_prizes',
    DAILYQUEST: 'dailyquest',
    NEXTLIMITEDRARECOUNTDOWN: 'nextlimitedrarecountdown',
    HABBOMODERATIONPROMO: 'habbomoderationpromo',
    HABBOTALENTSPROMO: 'habbotalentspromo',
    HABBOWAYPROMO: 'habbowaypromo',
    ROOMHOPPERNETWORK: 'roomhoppernetwork',
    SAFETYQUIZPROMO: 'safetyquizpromo',
    GENERIC: 'generic',
    WIDGETCONTAINER: 'widgetcontainer',
    PROMOARTICLE: 'promoarticle',
    BONUSRARE: 'bonusrare',
} as const;

/**
 * The widget types this port draws in a slot. `LandingViewWidgetType.getWidgetForType` builds
 * every name above; the ones missing here are widgets whose windows are not ported yet (the avatar
 * image, the catalogue promos, daily quest, the competition prizes and hall of fame, the moderation,
 * talents, Habbo Way and safety quiz promos and the room hopper), and a slot naming one stays
 * empty - which `DynamicLayoutManager` treats exactly like an unconfigured slot.
 */
export const PORTED_LANDING_VIEW_WIDGETS: ReadonlySet<string> = new Set([
    LandingViewWidgetType.GENERIC,
    LandingViewWidgetType.WIDGETCONTAINER,
    LandingViewWidgetType.BONUSRARE,
    LandingViewWidgetType.PROMOARTICLE,
    LandingViewWidgetType.COMMUNITYGOAL,
    LandingViewWidgetType.COMMUNITYGOALVS,
    LandingViewWidgetType.COMMUNITYGOALVSVOTE,
    LandingViewWidgetType.EXPIRINGCATALOGPAGE,
    LandingViewWidgetType.EXPIRINGCATALOGPAGESMALL,
    LandingViewWidgetType.NEXTLIMITEDRARECOUNTDOWN,
]);

/**
 * The slots `DynamicLayoutManager` has containers for (`widget_slot_1` .. `_5`).
 * `registerDynamicWidgets` also reads `landing.view.dynamic.slot.6.widget`, but
 * `dynamic_widget_grid` has no `widget_slot_6`, so that widget never initializes; slot 6 is
 * instead the default layout's `widget_placeholder_bottom_slot` (`setupBottomSlotWidgetName`).
 */
export const LANDING_VIEW_DYNAMIC_SLOTS = [ 1, 2, 3, 4, 5 ] as const;

/** `setupBottomSlotWidgetName`: the slot whose widget goes in the default layout's `widget_placeholder_bottom_slot`. */
export const HOTEL_VIEW_BOTTOM_SLOT = 6;

/**
 * The widgets the port draws in the bottom slot. Only `WidgetContainerLayout`'s fixed widgets can go
 * there (the placeholder is renamed after the type, and only a fixed widget looks for one by name);
 * of those, these are ported. A bottom slot naming any other type stays empty.
 */
export const BOTTOM_SLOT_LANDING_VIEW_WIDGETS: ReadonlySet<string> = new Set([
    LandingViewWidgetType.EXPIRINGCATALOGPAGE,
    LandingViewWidgetType.EXPIRINGCATALOGPAGESMALL,
    LandingViewWidgetType.COMMUNITYGOAL,
    LandingViewWidgetType.NEXTLIMITEDRARECOUNTDOWN,
]);

/** `landing.view.dynamic.slot.<slot>.widget`. */
export const hotelViewSlotWidget = (config: Record<string, unknown>, slot: number): string => hotelViewProperty(config, `landing.view.dynamic.slot.${slot}.widget`);

/** `WidgetContainerWidget.initialize`: the scheduling string a container slot asks the timing code for. */
export const hotelViewSlotSchedule = (config: Record<string, unknown>, slot: number): string => hotelViewProperty(config, `landing.view.dynamic.slot.${slot}.conf`);

/** `WidgetContainerWidget.createWidgetContainer`: the widget a timing code names. */
export const hotelViewCodeWidget = (config: Record<string, unknown>, code: string): string => hotelViewProperty(config, `landing.view.${code}.widget`);

/**
 * `GenericWidget.getConf`: a generic widget's `conf` or `layout`, under its configuration code
 * when a container chose it, else under its own slot.
 */
export const hotelViewGenericConf = (config: Record<string, unknown>, slot: number, code: string | null, name: 'conf' | 'layout'): string => hotelViewProperty(config, (code !== null) ? `landing.view.${code}.${name}` : `landing.view.dynamic.slot.${slot}.${name}`);

/** `GenericWidget.isWideSlot`: slots 3 and 5 are the right pane, the rest the left. */
export const isWideHotelViewSlot = (slot: number) => (slot !== 3) && (slot !== 5);

/** One `type,arg,arg...` entry of a generic widget's `conf`. */
export interface HotelViewGenericElement {
    type: string;
    args: string[];
}

/** `configureContentColumn`'s split: `;` between elements, `,` between an element's arguments. */
export const parseHotelViewGenericConf = (conf: string): HotelViewGenericElement[] => {
    if (!conf) return [];

    return conf.split(';').map((entry) => {
        const [ type, ...args ] = entry.split(',');

        return { type, args };
    });
};

/** One entry of a generic widget's `layout`: the bitmap's or the content column's placement, or the container's minimum height. */
export interface HotelViewGenericLayoutEntry {
    key: string;
    value: string;
}

/**
 * `configureLayout`'s split: one `key,value` per `;`, in order - each is applied to the built widget
 * in turn (`bitmap.x`, `content.width`, `container.height`...), so a later entry sees an earlier one.
 */
export const parseHotelViewGenericLayout = (layout: string): HotelViewGenericLayoutEntry[] => layout.split(';').map((entry) => {
    const [ key, value ] = entry.split(',');

    return { key, value: value ?? '' };
});

/** `CustomTimerElementHandler`: `customtimer,<floating>,<x>,<y>,<remainingKey>,<expiredKey>,<timeStr>`. */
export const hotelViewTimerTimeStr = (element: HotelViewGenericElement): string => element.args[5] ?? '';

/** `LandingViewElementType.CUSTOMTIMER`. */
export const LANDING_VIEW_ELEMENT_CUSTOMTIMER = 'customtimer';

/**
 * `CommonWidgetSettings`: the hotel-wide colours every `COLORABLE`-tagged widget text is given.
 * An empty variable keeps the class default, and a value equal to that default reads as unset.
 */
export interface HotelViewCommonSettings {
    textColor: number | null;
    etchingColor: number | null;
    etchingPosition: string | null;
}

const TEXTCOLOR_DEFAULT = 0xFF000000;
const ETCHINGCOLOR_DEFAULT = 0xFFFFFFFF;
const ETCHINGPOSITION_DEFAULT = 'bottom';

export const hotelViewCommonSettings = (config: Record<string, unknown>): HotelViewCommonSettings => {
    const textColor = hotelViewProperty(config, 'landing.view.common.textcolor');
    const etchingColor = hotelViewProperty(config, 'landing.view.common.etchingcolor');
    const etchingPosition = hotelViewProperty(config, 'landing.view.common.etchingposition');
    const text = textColor ? (parseInt(textColor, 16) >>> 0) : TEXTCOLOR_DEFAULT;
    const etching = etchingColor ? (parseInt(etchingColor, 16) >>> 0) : ETCHINGCOLOR_DEFAULT;
    const position = etchingPosition || ETCHINGPOSITION_DEFAULT;

    return {
        textColor: (text !== TEXTCOLOR_DEFAULT) ? text : null,
        etchingColor: (etching !== ETCHINGCOLOR_DEFAULT) ? etching : null,
        etchingPosition: (position !== ETCHINGPOSITION_DEFAULT) ? position : null,
    };
};

/** `HabboLandingView.dynamicLayoutLeftPaneWidth` / `RightPaneWidth`: `getInteger` with 500 / 250. */
export const hotelViewPaneWidths = (config: Record<string, unknown>) => {
    const read = (key: string, fallback: number) => {
        const value = parseInt(hotelViewProperty(config, key), 10);

        return Number.isNaN(value) ? fallback : value;
    };

    return { left: read('landing.view.dynamic.leftPaneWidth', 500), right: read('landing.view.dynamic.rightPaneWidth', 250) };
};

/** `WidgetContainerLayout.applyCommonWidgetSettings` as ThemeText props, for a `COLORABLE` text. */
export const hotelViewColorableFormat = (settings: HotelViewCommonSettings): ColorableTextFormat => ({
    fill: (settings.textColor !== null) ? `#${(settings.textColor & 0xFFFFFF).toString(16).padStart(6, '0')}` : undefined,
    flashFormat: {
        ...((settings.etchingColor !== null) ? { etchingColor: settings.etchingColor } : {}),
        ...((settings.etchingPosition !== null) ? { etchingPosition: settings.etchingPosition as NonNullable<NonNullable<ColorableTextFormat['flashFormat']>['etchingPosition']> } : {}),
    },
});

/**
 * `WidgetContainerLayout.applyCommonWidgetSettings` over a widget drawn from its template: the
 * hotel's colours on each of the named `COLORABLE`-tagged texts, merged into what else they bind.
 */
export const hotelViewColorableBindings = (settings: HotelViewCommonSettings, names: readonly string[], bindings: TemplateBindings = {}): TemplateBindings => {
    const colorable = {
        ...((settings.textColor !== null) ? { color: settings.textColor & 0xFFFFFF } : {}),
        ...((settings.etchingColor !== null) ? { etchingColor: settings.etchingColor } : {}),
        ...((settings.etchingPosition !== null) ? { etchingPosition: settings.etchingPosition as NonNullable<TemplateBindings[string]['etchingPosition']> } : {}),
    };

    for (const name of names) bindings[name] = { ...colorable, ...bindings[name] };

    return bindings;
};

/** The community goal's data its meter reads - `CommunityGoalData`. */
export interface HotelViewCommunityGoalMeterData {
    communityHighestAchievedLevel: number;
    percentCompletionTowardsNextLevel: number;
    scoreRemainingUntilNextLevel: number;
}

/** `CommunityGoalWidget.CHALLENGE_LEVEL_NEEDLE_BASE_FRAMES`: the needle frame each level starts at. */
export const COMMUNITY_GOAL_NEEDLE_BASE_FRAMES = [ 0, 8, 16, 23 ] as const;

/** `CommunityGoalWidget.getCurrentNeedleFrame`: the level's base frame, plus its share of the way to the next. */
export const communityGoalNeedleFrame = (goal: HotelViewCommunityGoalMeterData): number => {
    const frames = COMMUNITY_GOAL_NEEDLE_BASE_FRAMES;
    const level = goal.communityHighestAchievedLevel;

    if (level >= frames.length - 1) return frames[frames.length - 1];

    const base = frames[level];
    const span = frames[level + 1] - base;

    return base + Math.floor((goal.percentCompletionTowardsNextLevel * (span + 0.001)) / 100);
};

/** `CommunityGoalVsModeWidget`'s `NEEDLE_LEVELS` and `NEEDLE_FRAMES`: a needle that swings either way from the middle. */
const VS_NEEDLE_LEVELS = [ -3, -2, -1, 0, 1, 2, 3 ];
const VS_NEEDLE_FRAMES = [ 0, 0, 4.75, 11.5, 16.25, 23, 23 ];

/** `CommunityGoalVsModeWidget.getCurrentNeedleFrame`: towards the side the score is moving to. */
export const communityGoalVsNeedleFrame = (goal: HotelViewCommunityGoalMeterData): number => {
    const level = goal.communityHighestAchievedLevel;

    if (level <= VS_NEEDLE_LEVELS[0]) return Math.round(VS_NEEDLE_FRAMES[0]);
    if (level >= VS_NEEDLE_LEVELS[VS_NEEDLE_LEVELS.length - 1]) return Math.round(VS_NEEDLE_FRAMES[VS_NEEDLE_FRAMES.length - 1]);

    const direction = (goal.scoreRemainingUntilNextLevel < 0) ? -1 : 1;
    const base = VS_NEEDLE_FRAMES[VS_NEEDLE_LEVELS.indexOf(level)];
    const span = Math.abs(VS_NEEDLE_FRAMES[VS_NEEDLE_LEVELS.indexOf(level + direction)] - base);

    return Math.round(base + ((goal.percentCompletionTowardsNextLevel / 100) * span * direction));
};

/** `CommunityGoalWidget.update`: the meter waits this long after the progress arrives, then builds up over a second. */
export const COMMUNITY_GOAL_METER_DELAY_MS = 1500;
export const COMMUNITY_GOAL_METER_BUILDUP_MS = 1000;
