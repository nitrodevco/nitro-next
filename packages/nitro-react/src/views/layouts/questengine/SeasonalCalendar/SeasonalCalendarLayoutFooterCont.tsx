import { BoxLayout, Region } from '#base/theme';

import { SeasonalCalendarLayoutCatalogPromoCont, SeasonalCalendarLayoutCatalogPromoContProps } from './SeasonalCalendarLayoutCatalogPromoCont';
import { SeasonalCalendarLayoutRareTeaserCont, SeasonalCalendarLayoutRareTeaserContProps } from './SeasonalCalendarLayoutRareTeaserCont';

/** Named region `footer_cont` of SeasonalCalendarLayout - configured through the parent's `footerCont` prop. */
export interface SeasonalCalendarLayoutFooterContProps {
    catalogPromoCont?: SeasonalCalendarLayoutCatalogPromoContProps;
    layout?: BoxLayout;
    rareTeaserCont?: SeasonalCalendarLayoutRareTeaserContProps;
}

export const SeasonalCalendarLayoutFooterCont = ({ catalogPromoCont, layout, rareTeaserCont }: SeasonalCalendarLayoutFooterContProps) => {
    return (
        <Region
            name="footer_cont"
            layout={{ position: 'absolute', left: 0, width: 636, top: 320, height: 135, ...layout }}
        >
            <SeasonalCalendarLayoutCatalogPromoCont {...catalogPromoCont} />
            <SeasonalCalendarLayoutRareTeaserCont {...rareTeaserCont} />
        </Region>
    );
};
