import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `catalog_promo_info` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoInfoItemProps {
    captionCatalogPromoInfo?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoInfoItem = ({ captionCatalogPromoInfo, colorableTextColor, layout }: CatalogPromoLayoutCatalogPromoInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog_promo_info"
            layout={{ width: 300, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCatalogPromoInfo ?? t('landing.view.catalogpromo.info')}
                textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};
