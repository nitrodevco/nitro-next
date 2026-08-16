import { RoomPreviewerWrapper } from "#base/components/room-preview/RoomPreviewerWrapper";
import { useCatalogSelectors } from "#base/context";
import { ContainerButton } from "#base/theme";

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogPurchaseWidgetView } from "../widgets/CatalogPurchaseWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activeOffer } = useCatalogSelectors();

    return (
        <>
            <div className="catalog-product-preview">
                <RoomPreviewerWrapper />
                {activeOffer && (
                    <div className="catalog-product-preview-rotation-controls">
                        <ContainerButton
                            variant="5"
                            type="button"
                            aria-label="Rotate preview left"
                            className="catalog-product-preview-rotate-button is-left">
                            <span className="habbo-icon icon-arrow-left" />
                        </ContainerButton>
                        <ContainerButton
                            variant="5"
                            type="button"
                            aria-label="Rotate preview right"
                            className="catalog-product-preview-rotate-button is-right">
                            <span className="habbo-icon icon-arrow-right" />
                        </ContainerButton>
                    </div>
                )}
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
