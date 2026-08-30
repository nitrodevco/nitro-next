import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogPromoLayoutCatalogPromoCaptionItem } from './CatalogPromoLayoutCatalogPromoCaptionItem';
import { CatalogPromoLayoutCatalogPromoInfoItem } from './CatalogPromoLayoutCatalogPromoInfoItem';
import { CatalogPromoLayoutOpenPageButtonItem } from './CatalogPromoLayoutOpenPageButtonItem';

/** Named region `catalog_promo` of CatalogPromoLayout - configured through the parent's `catalogPromo` prop. */
export interface CatalogPromoLayoutCatalogPromoProps {
    captionCatalogPromoStatus?: string;
    colorableTextColor?: string;
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
    srcPicture?: string;
}

export const CatalogPromoLayoutCatalogPromo = ({ captionCatalogPromoStatus, colorableTextColor, itemsInfoContainer, layout, srcPicture }: CatalogPromoLayoutCatalogPromoProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="info_container"
                layout={{ position: 'absolute', left: 11, top: 9, flexDirection: 'column', gap: 5 }}
            >
                {itemsInfoContainer ?? (
                    <>
                        <CatalogPromoLayoutCatalogPromoCaptionItem />
                        <CatalogPromoLayoutCatalogPromoInfoItem />
                        <CatalogPromoLayoutOpenPageButtonItem />
                    </>
                )}
            </Region>
            <Region
                name="picture_container"
                layout={{ position: 'absolute', right: 0, width: 226, top: 11, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCatalogPromoStatus ?? t('landing.view.catalog.promo.picture.text')}
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                    name="catalog_promo_status"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 200, bottom: 4, height: 28, minWidth: 200, maxWidth: 200 }}
                />
                <ThemeImage
                    name="picture"
                    src={srcPicture ?? '${image.library.url}reception/meter_level_0.png'}
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 183, top: 0, height: 144 }}
                />
            </Region>
        </Region>
    );
};
