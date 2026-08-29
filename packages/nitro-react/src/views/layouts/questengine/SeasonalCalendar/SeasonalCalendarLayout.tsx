import { BoxLayout, Frame } from '#base/theme';

import { SeasonalCalendarLayoutCalendarCont, SeasonalCalendarLayoutCalendarContProps } from './SeasonalCalendarLayoutCalendarCont';
import { SeasonalCalendarLayoutFooterCont, SeasonalCalendarLayoutFooterContProps } from './SeasonalCalendarLayoutFooterCont';

/** Generated from `127_SeasonalCalendar_xml` (layout "Quest", 642x465) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SeasonalCalendarLayoutProps {
    calendarCont?: SeasonalCalendarLayoutCalendarContProps;
    footerCont?: SeasonalCalendarLayoutFooterContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const SeasonalCalendarLayout = ({ calendarCont, footerCont, layout, onClose }: SeasonalCalendarLayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="TBD"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 642, height: 465, ...layout }}
        >
            <SeasonalCalendarLayoutCalendarCont {...calendarCont} />
            <SeasonalCalendarLayoutFooterCont {...footerCont} />
        </Frame>
    );
};
