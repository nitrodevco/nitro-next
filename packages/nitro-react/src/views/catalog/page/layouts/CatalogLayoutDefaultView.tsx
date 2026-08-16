import { RoomPreviewerWrapper } from "#base/components/room-preview/RoomPreviewerWrapper";

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogPurchaseWidgetView } from "../widgets/CatalogPurchaseWidgetView";

export const CatalogLayoutDefaultView = () => {
    return (
        <>
            <div className="catalog-product-preview">
                <RoomPreviewerWrapper />
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
