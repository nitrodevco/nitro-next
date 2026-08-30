import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `catalog_promo_info` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoInfoItemProps {
    captionCatalogPromoInfo?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoInfoItem = ({ captionCatalogPromoInfo, colorableTextColor, layout }: CatalogPromoLayoutCatalogPromoInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCatalogPromoInfo ?? t('landing.view.catalogpromo.info')}
            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 300 }}
            name="catalog_promo_info"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, ...layout }}
        />
    );
};
