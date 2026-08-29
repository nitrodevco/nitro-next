import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { SeasonalCalendarLayoutPromoInfoCont, SeasonalCalendarLayoutPromoInfoContProps } from './SeasonalCalendarLayoutPromoInfoCont';

/** Named region `catalog_promo_cont` of SeasonalCalendarLayout - configured through the parent's `catalogPromoCont` prop. */
export interface SeasonalCalendarLayoutCatalogPromoContProps {
    bg?: ReactNode;
    bottom?: ReactNode;
    layout?: BoxLayout;
    promoInfoCont?: SeasonalCalendarLayoutPromoInfoContProps;
    srcFurniPreview?: string;
    srcFurniPreviewBackground?: string;
    tintFurniPreview?: string;
    top?: ReactNode;
}

export const SeasonalCalendarLayoutCatalogPromoCont = ({ bg, bottom, layout, promoInfoCont, srcFurniPreview, srcFurniPreviewBackground, tintFurniPreview, top }: SeasonalCalendarLayoutCatalogPromoContProps) => {
    return (
        <Region
            name="catalog_promo_cont"
            layout={{ position: 'absolute', left: 5, width: 384, top: 1, height: 97, ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#04bdc8"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {bg}
            </Region>
            <Region
                name="top"
                backgroundColor="#95dfe4"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
            >
                {top}
            </Region>
            <Region
                name="bottom"
                backgroundColor="#70d7dd"
                layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
            >
                {bottom}
            </Region>
            <SeasonalCalendarLayoutPromoInfoCont {...promoInfoCont} />
            <ThemeImage
                name="furni_preview_background"
                src={srcFurniPreviewBackground ?? '${image.library.questing.url}calendar_promobg.png'}
                layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
            />
            <ThemeImage
                name="furni_preview"
                src={srcFurniPreview}
                tint={tintFurniPreview}
                layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
            />
        </Region>
    );
};
