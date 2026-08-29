import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { SeasonalCalendarLayoutEntityTemplate, SeasonalCalendarLayoutEntityTemplateProps } from './SeasonalCalendarLayoutEntityTemplate';

/** Named region `calendar_cont` of SeasonalCalendarLayout - configured through the parent's `calendarCont` prop. */
export interface SeasonalCalendarLayoutCalendarContProps {
    entityTemplate?: SeasonalCalendarLayoutEntityTemplateProps;
    layout?: BoxLayout;
    srcBackgroundSlice?: string;
    srcButtonLeft?: string;
    srcButtonRight?: string;
    srcStripeMaskLeft?: string;
    srcStripeMaskRight?: string;
    tintBackgroundSlice?: string;
    tintButtonLeft?: string;
    tintButtonRight?: string;
    tintStripeMaskLeft?: string;
    tintStripeMaskRight?: string;
}

export const SeasonalCalendarLayoutCalendarCont = ({ entityTemplate, layout, srcBackgroundSlice, srcButtonLeft, srcButtonRight, srcStripeMaskLeft, srcStripeMaskRight, tintBackgroundSlice, tintButtonLeft, tintButtonRight, tintStripeMaskLeft, tintStripeMaskRight }: SeasonalCalendarLayoutCalendarContProps) => {
    return (
        <Region
            name="calendar_cont"
            layout={{ position: 'absolute', left: -2, width: 640, top: -3, height: 320, ...layout }}
        >
            <ThemeImage
                name="background_slice"
                src={srcBackgroundSlice}
                tint={tintBackgroundSlice}
                layout={{ position: 'absolute', left: 0, width: 640, top: 0, height: 320 }}
            />
            <SeasonalCalendarLayoutEntityTemplate {...entityTemplate} />
            <ThemeImage
                name="stripe_mask_left"
                src={srcStripeMaskLeft}
                tint={tintStripeMaskLeft}
                layout={{ position: 'absolute', left: 0, width: 43, top: 291, height: 22 }}
            />
            <ThemeImage
                name="stripe_mask_right"
                src={srcStripeMaskRight}
                tint={tintStripeMaskRight}
                layout={{ position: 'absolute', left: 597, width: 43, top: 291, height: 22 }}
            />
            <ThemeImage
                name="button_right"
                src={srcButtonRight}
                tint={tintButtonRight}
                layout={{ position: 'absolute', left: 613, width: 20, top: 287, height: 30 }}
            />
            <ThemeImage
                name="button_left"
                src={srcButtonLeft}
                tint={tintButtonLeft}
                layout={{ position: 'absolute', left: 6, width: 20, top: 287, height: 30 }}
            />
        </Region>
    );
};
