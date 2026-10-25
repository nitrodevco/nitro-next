/**
 * The campaign calendar's store - the state `HabboCampaigns` keeps:
 *
 * - `calendar` (`calendarData`): the last `CampaignCalendarData`, which the server sends unasked;
 *   the window opens only with one (`showCalendar`). A door opened is added to its `openedDays`
 *   here, not by a new one from the server (`showProductNotification`).
 * - `visible`: the `CalendarView` is up (`openView/calendar`), until its close (`hideCalendar`).
 * - `selected` (`CalendarView`'s selected index): the door the view has in the middle, -1 when none.
 * - `pendingDay` (`_pendingDayIndex`): the door last asked to open, -1 when none.
 * - `received` (`CalendarView.setReceivedProduct`): what the last door opened gave, while the view
 *   that showed it is up - its product's name and the picture drawn in the selected door.
 */
import type { CampaignCalendarDataMessageType } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

export interface CampaignCalendarReceived {
    /** The door it was drawn in: the one selected when it came (`updateThumbnail`). */
    day: number;
    productName: string;
    /** The custom image's url (drawn in `bitmap_icon`), or the furni's icon url (`bitmap_icon2`). */
    image: string;
    furnitureIcon: boolean;
}

type State = {
    calendar: CampaignCalendarDataMessageType | undefined;
    visible: boolean;
    selected: number;
    pendingDay: number;
    received: CampaignCalendarReceived | undefined;
};

type Actions = {
    setCalendar: (calendar: CampaignCalendarDataMessageType) => void;
    /** `showCalendar`: only with a calendar. */
    show: () => void;
    hide: () => void;
    /** `setSelectedIndex`: a door of the calendar; any other index changes nothing. */
    select: (selected: number) => void;
    setPendingDay: (pendingDay: number) => void;
    /** `showProductNotification`, for a product the client knows: the pending door is opened. */
    doorOpened: (received: Omit<CampaignCalendarReceived, 'day'>) => void;
};

export type CampaignCalendarStore = State & Actions;

const INITIAL: State = {
    calendar: undefined,
    visible: false,
    selected: -1,
    pendingDay: -1,
    received: undefined,
};

export const createCampaignCalendarStore = () => createStore<CampaignCalendarStore>()(set => ({
    ...INITIAL,
    setCalendar: calendar => set({ calendar }),
    // A new view starts on today's door (`setSelectedIndex(currentDay)`).
    show: () => set(x => (x.calendar && !x.visible ? { visible: true, received: undefined, selected: -1 } : x)),
    hide: () => set({ visible: false, received: undefined, selected: -1 }),
    select: selected => set(x => ((x.calendar && selected >= 0 && selected < x.calendar.campaignDays) ? { selected, received: undefined } : x)),
    setPendingDay: pendingDay => set({ pendingDay }),
    doorOpened: received => set(x => (x.calendar
        ? { calendar: { ...x.calendar, openedDays: [ ...x.calendar.openedDays, x.pendingDay ] }, pendingDay: -1, received: x.visible ? { ...received, day: x.selected } : undefined }
        : x)),
}));

export const campaignCalendarStore = createCampaignCalendarStore();
