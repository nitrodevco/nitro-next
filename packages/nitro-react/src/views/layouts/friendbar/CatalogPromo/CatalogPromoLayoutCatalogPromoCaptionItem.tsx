import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `catalog_promo_caption` of CatalogPromoLayout - pass real rows through its `items…` slot. */
export interface CatalogPromoLayoutCatalogPromoCaptionItemProps {
    captionCatalogPromoCaption?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CatalogPromoLayoutCatalogPromoCaptionItem = ({ captionCatalogPromoCaption, colorableTextColor, layout }: CatalogPromoLayoutCatalogPromoCaptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCatalogPromoCaption ?? t('landing.view.catalogpromo.caption')}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: colorableTextColor }}
            name="catalog_promo_caption"
            layout={{ alignSelf: 'stretch', height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, ...layout }}
        />
    );
};
