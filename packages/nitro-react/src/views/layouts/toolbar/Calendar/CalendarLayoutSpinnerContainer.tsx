import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { CalendarLayoutCalendarItemlist, CalendarLayoutCalendarItemlistProps } from './CalendarLayoutCalendarItemlist';

/** Named region `spinner_container` of CalendarLayout - configured through the parent's `spinnerContainer` prop. */
export interface CalendarLayoutSpinnerContainerProps {
    calendarItemlist?: CalendarLayoutCalendarItemlistProps;
    layout?: BoxLayout;
    srcGradient1?: string;
    srcGradient2?: string;
    tintGradient1?: string;
    tintGradient2?: string;
}

export const CalendarLayoutSpinnerContainer = ({ calendarItemlist, layout, srcGradient1, srcGradient2, tintGradient1, tintGradient2 }: CalendarLayoutSpinnerContainerProps) => {
    return (
        <Region
            name="spinner_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 106, height: 463, ...layout }}
        >
            <CalendarLayoutCalendarItemlist {...calendarItemlist} />
            <ThemeImage
                name="gradient1"
                src={srcGradient1}
                tint={tintGradient1}
                layout={{ position: 'absolute', left: 0, width: 408, top: 15, bottom: 1 }}
            />
            <ThemeImage
                name="gradient2"
                src={srcGradient2}
                tint={tintGradient2}
                layout={{ position: 'absolute', left: 618, width: 408, top: 15, bottom: 1 }}
            />
        </Region>
    );
};
