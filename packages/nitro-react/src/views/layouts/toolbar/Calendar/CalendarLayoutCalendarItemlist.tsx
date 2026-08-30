import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CalendarLayoutBtnSlotItem } from './CalendarLayoutBtnSlotItem';

/** Named region `calendar_itemlist` of CalendarLayout - configured through the parent's `calendarItemlist` prop. */
export interface CalendarLayoutCalendarItemlistProps {
    itemsCalendarItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const CalendarLayoutCalendarItemlist = ({ itemsCalendarItemlist, layout }: CalendarLayoutCalendarItemlistProps) => {
    return (
        <Region
            name="calendar_itemlist"
            layout={{ position: 'absolute', left: 0, right: 0, top: 15, height: 447, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsCalendarItemlist ?? (
                <CalendarLayoutBtnSlotItem />
            )}
            <ThemeImage
                src={layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ width: 202, height: 447, flexShrink: 0 }}
            />
            <ThemeImage
                src={layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ width: 202, height: 447, flexShrink: 0 }}
            />
            <ThemeImage
                src={layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ width: 202, height: 447, flexShrink: 0 }}
            />
            <ThemeImage
                src={layoutImage('campaign_calendar_day_generic_bg.png')}
                layout={{ width: 202, height: 447, flexShrink: 0 }}
            />
        </Region>
    );
};
