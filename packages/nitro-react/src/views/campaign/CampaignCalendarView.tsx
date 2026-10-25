/**
 * `campaign/calendar/CalendarView` over `habbo-toolbar-com/campaign_calendar_xml`, built as a modal
 * dialog (`buildModalDialogFromXML`): the campaign calendar, one door per day side by side in
 * `calendar_itemlist`, the selected one in the middle.
 *
 * - The list's items are clones of its first, `btn_slot`, one per day (`CalendarItem.populateItem`):
 *   an opened door shows `campaign_calendar_day_generic_activated` with `bitmap_opened_bg`, one to
 *   open the plain package, a missed or future one the package with `bitmap_lock`
 *   (`CalendarItem.resolveDayState`: opened, else after today future, else missed when the server
 *   lists it, else open to take).
 * - `onResize`: as many doors as the stage holds less 75 px a side, the window as wide as they are,
 *   `btn_forward` as far from the right as `btn_back` is from the left, centred.
 * - `setSelectedIndex` (today's door first): the list scrolled to centre it
 *   (`calculateCenteredItemScrollH`), the doors either side shaded (`CalendarSpinnerUtil`), a door
 *   that can be opened wiggled (`CalendarItemWiggle`), the heading "Day <n>" and the door's text,
 *   and `btn_force_open` - shown at security level 5 - enabled unless the door is opened.
 * - A press on a door's package selects it, or opens it when it is the selected one; the arrows
 *   move the selection; FORCE OPEN opens the selected door as staff.
 * - A door opened (`setReceivedProduct`): "Congratulations! You received:" and the product's name,
 *   and its picture in the selected door raised 6 px, wiggling.
 */
import { Graphics } from 'pixi.js';
import { useEffect, useMemo, useRef, useState } from 'react';

import { hideCampaignCalendar, openCalendarDoor, selectCalendarDay } from '#base/commands';
import { useCampaignCalendarStore } from '#base/context/campaign';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useOwnIsAnyRoomController } from '#base/context/user';
import { useViewportSize } from '#base/hooks';
import { ModalDialog, TemplateBindings, TemplateItem, TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-toolbar-com/campaign_calendar_xml';

/** `CalendarView.MARGIN`: the stage's width left free either side. */
const MARGIN = 75;
/** The layout's `btn_slot` width and `calendar_itemlist` spacing (`itemWidth` / `itemGap`). */
const ITEM_WIDTH = 202;
const ITEM_GAP = 4;
/** `btn_back`'s x and `btn_forward`'s width in the layout. */
const BACK_X = 4;
const FORWARD_WIDTH = 33;
/** `CalendarSpinnerUtil`'s shade: `0x0F1020` from 0.6 to 0.2 alpha towards the selected door. */
const SHADE_COLOR = 0x0f1020;
const SHADE_STEP = 2;

/** `CalendarItem.STATE_*`. */
const STATE_UNLOCKED = 1;
const STATE_AVAILABLE = 2;
const STATE_EXPIRED = 3;
const STATE_FUTURE = 4;

const asset = (name: string) => `habbo-window-manager-com-${name}`;

/** `CalendarItem.resolveDayState`. */
const resolveDayState = (openedDays: number[], missedDays: number[], currentDay: number, day: number) => {
    if (openedDays.includes(day)) return STATE_UNLOCKED;
    if (day > currentDay) return STATE_FUTURE;

    return missedDays.includes(day) ? STATE_EXPIRED : STATE_AVAILABLE;
};

const STATE_TEXTS: Record<number, string> = {
    [STATE_UNLOCKED]: 'campaign.calendar.info.unlocked',
    [STATE_AVAILABLE]: 'campaign.calendar.info.available.desktop',
    [STATE_EXPIRED]: 'campaign.calendar.info.expired',
    [STATE_FUTURE]: 'campaign.calendar.info.future',
};

/** `calculateItemListWidth`: `count` doors with the gaps between them. */
const listWidth = (count: number) => (count * ITEM_WIDTH) + (Math.max(0, count - 1) * ITEM_GAP);

/**
 * `CalendarItemWiggle`: the window lifted 10 px, then bounced on an 80 ms timer, each of its 7
 * bounces lower, back where it was. The offset from its place, 0 when still; a new `key` starts it.
 */
const useWiggle = (key: string | undefined) => {
    const [ wiggle, setWiggle ] = useState<{ key: string | undefined; y: number }>({ key: undefined, y: 0 });

    useEffect(() => {
        if (key === undefined) return;

        let y = -10;
        let multiplier = 1;
        let bounces = 0;

        const timer = window.setInterval(() => {
            const height = 10 * ((7 - bounces) / 7);
            const ratio = Math.abs(y) / height;

            y += Math.max(2, Math.sin(ratio) * 40) * multiplier;

            if (multiplier > 0) {
                if (y > 0) {
                    multiplier = -1;
                    y = 0;
                    bounces++;
                }
            } else if (y <= -height) {
                multiplier = 1;
                y = -height;
                bounces++;
            }

            if (bounces >= 7) {
                window.clearInterval(timer);
                y = 0;
            }

            setWiggle({ key, y });
        }, 80);

        return () => window.clearInterval(timer);
    }, [ key ]);

    if (key === undefined) return 0;

    // Lifted until the timer's first tick.
    return (wiggle.key === key) ? wiggle.y : -10;
};

/** A horizontal shade `width` x `height`, `from` alpha at the left to `to` at the right. */
const Shade = ({ width, height, from, to }: { width: number; height: number; from: number; to: number }) => (
    <pixiGraphics
        eventMode="none"
        draw={(graphics: Graphics) => {
            graphics.clear();

            for (let x = 0; x < width; x += SHADE_STEP) {
                const strip = Math.min(SHADE_STEP, width - x);

                graphics.rect(x, 0, strip, height).fill({ color: SHADE_COLOR, alpha: from + ((to - from) * ((x + (strip / 2)) / width)) });
            }
        }}
    />
);

export const CampaignCalendarView = () => {
    const visible = useCampaignCalendarStore(x => x.visible);
    const calendar = useCampaignCalendarStore(x => x.calendar);

    if (!visible || !calendar) return null;

    return <CampaignCalendarWindow />;
};

const CampaignCalendarWindow = () => {
    const calendar = useCampaignCalendarStore(x => x.calendar)!;
    const selected = useCampaignCalendarStore(x => x.selected);
    const received = useCampaignCalendarStore(x => x.received);
    const anyRoomController = useOwnIsAnyRoomController();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { width: stageWidth } = useViewportSize();
    const frame = useTemplateFrame({ id: 'campaign_calendar', modal: true, draggable: false, rememberPosition: false, resizeDirection: 'none', onClose: hideCampaignCalendar });
    const opened = useRef(false);

    // The constructor ends with `setSelectedIndex(currentDay)`.
    useEffect(() => {
        if (opened.current) return;

        opened.current = true;
        selectCalendarDay(calendar.currentDay);
    }, [ calendar.currentDay ]);

    const { openedDays, missedDays, currentDay, campaignDays } = calendar;
    const state = selected >= 0 ? resolveDayState(openedDays, missedDays, currentDay, selected) : 0;

    // `onResize`.
    const itemsOnScreen = Math.max(1, Math.floor((stageWidth - (MARGIN * 2)) / (ITEM_WIDTH + ITEM_GAP)));
    const scrollerWidth = listWidth(itemsOnScreen);
    const maxScroll = Math.max(0, listWidth(campaignDays) - scrollerWidth);
    // `calculateCenteredItemScrollH`, as the list keeps it: from its start to its end.
    const scrollH = (selected >= 0 && maxScroll > 0) ? Math.min(1, Math.max(0, (listWidth(selected) - ((scrollerWidth - ITEM_WIDTH) * 0.5)) / maxScroll)) : 0;
    // `CalendarSpinnerUtil.createGradients`.
    const leftShade = Math.max(1, listWidth(Math.max(0, selected)) - (scrollH * maxScroll));
    const rightShade = Math.max(1, scrollerWidth - (leftShade + ITEM_WIDTH + ITEM_GAP));

    // `updateState` wiggles the selected door when it can be opened; `updateThumbnail` the picture it got.
    const doorWiggle = useWiggle((state === STATE_AVAILABLE && !received) ? `door-${selected}` : undefined);
    const iconWiggle = useWiggle(received ? `icon-${received.day}-${received.image}` : undefined);

    const heading = received ? t('campaign.calendar.heading.product.received') : (selected >= 0 ? (t('campaign.calendar.heading.day') || '').replace('%number%', String(selected + 1)) : '');
    const body = received ? received.productName : (selected >= 0 ? t(STATE_TEXTS[state]) : '');

    const items = useMemo<TemplateItem[]>(() => Array.from({ length: campaignDays }, (_, day) => {
        const dayState = resolveDayState(openedDays, missedDays, currentDay, day);
        const got = (received && received.day === day) ? received : undefined;
        const press = () => {
            if (day !== selected) selectCalendarDay(day);
            else openCalendarDoor(send, day, false);
        };

        return {
            key: `day-${day}`,
            from: 'btn_slot',
            bindings: {
                btn_present: { onPointerDown: press },
                bitmap_bg: { asset: asset((dayState === STATE_UNLOCKED || got) ? 'campaign_calendar_day_generic_activated' : 'campaign_calendar_day_generic_button') },
                bitmap_opened_bg: { visible: dayState === STATE_UNLOCKED || !!got },
                bitmap_lock: (dayState === STATE_EXPIRED || dayState === STATE_FUTURE) ? { asset: asset('campaign_calendar_generic_lock') } : { visible: false },
                // `updateThumbnail`: a custom image in `bitmap_icon`, a furni icon's bitmap in `bitmap_icon2`.
                bitmap_icon: { asset: (got && !got.furnitureIcon) ? got.image : '' },
                bitmap_icon2: { asset: got?.furnitureIcon ? got.image : '' },
            },
            arrange: ({ find }) => {
                if (day !== selected) return;

                const bg = find('bitmap_bg');
                const icons = [ find('bitmap_icon'), find('bitmap_icon2') ];

                if (bg) bg.y += doorWiggle;

                if (got) for (const icon of icons) if (icon) icon.y = -6 + iconWiggle;
            },
        };
    }), [ campaignDays, openedDays, missedDays, currentDay, received, selected, send, doorWiggle, iconWiggle ]);

    const bindings: TemplateBindings = {
        calendar_itemlist: { items },
        gradient1: {
            children: (
                <Shade
                    width={leftShade}
                    height={447}
                    from={0.6}
                    to={0.2}
                />
            ),
        },
        gradient2: {
            children: (
                <Shade
                    width={rightShade}
                    height={447}
                    from={0.2}
                    to={0.6}
                />
            ),
        },
        info_heading: { caption: heading },
        info_body: { caption: body },
        btn_back: { onPointerDown: () => selectCalendarDay(selected - 1) },
        btn_forward: { onPointerDown: () => selectCalendarDay(selected + 1) },
        btn_force_open: {
            visible: anyRoomController,
            disabled: selected < 0 || state === STATE_UNLOCKED,
            onPointerDown: () => openCalendarDoor(send, selected, true),
        },
    };

    return (
        <ModalDialog>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                width={scrollerWidth}
                bindings={bindings}
                arrange={({ find }) => {
                    const forward = find('btn_forward');
                    const right = find('gradient2');
                    const list = find('calendar_itemlist');

                    // The list has no scrollbar for `scrollH` to go through: its doors moved by the scroll.
                    if (list) for (const door of list.children) door.x -= Math.round(scrollH * maxScroll);

                    if (forward) forward.x = scrollerWidth - BACK_X - FORWARD_WIDTH;
                    if (right) right.x = scrollerWidth - rightShade;
                }}
            />
        </ModalDialog>
    );
};
