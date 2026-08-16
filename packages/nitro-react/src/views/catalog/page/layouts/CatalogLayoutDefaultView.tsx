import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogProductViewWidgetView } from "../widgets/CatalogProductViewWidgetView";
import { CatalogPurchaseWidgetView } from "../widgets/CatalogPurchaseWidgetView";

export const CatalogLayoutDefaultView = () => {
    return (
        <>
            <div className="catalog-product-preview">
                <CatalogProductViewWidgetView />
            </div>
            <div className="catalog-product-grid-region">
                <CatalogItemGridWidgetView />
            </div>
            <div className="catalog-purchase-region">
                <CatalogPurchaseWidgetView />
            </div>
        </>
    );
}
