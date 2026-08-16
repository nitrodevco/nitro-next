import { useCatalogSelectors, useTranslation } from "#base/context";
import { BitmapText, Border } from "#base/theme";

export const CatalogPurchaseWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const t = useTranslation();

    if (activeOffer) return null;

    return (
        <div className="catalog-purchase-empty">
            <Border variant="6" className="catalog-purchase-empty-surface" />
            <BitmapText
                recipe="bold-14"
                color="#666666"
                align="center"
                className="catalog-purchase-empty-label">
                {t('catalog.purchase.select.info')}
            </BitmapText>
        </div>
    );
}
