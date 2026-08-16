
import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors } from "#base/context"
import { Border, InfiniteGrid } from "#base/theme"

import { CATALOG_GRID_SPACING, getCatalogGridCellSize } from "./catalogGridItemTemplate";
import { CatalogItemGridWidgetItemView } from "./CatalogItemGridWidgetItemView";

export const CatalogItemGridWidgetView = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    const cellSize = getCatalogGridCellSize(activePage.offers);

    return (
        <Border variant="6" blend={0.5} className="size-full">
            <InfiniteGrid<IPurchasableOffer>
                key="catalog-grid"
                items={activePage.offers}
                getKey={x => x.offerId}
                itemWidth={cellSize.width}
                minHeight={cellSize.height}
                horizontalGap={CATALOG_GRID_SPACING.horizontal}
                verticalGap={CATALOG_GRID_SPACING.vertical}
                itemRender={x => <CatalogItemGridWidgetItemView offer={x} />} />
        </Border>
    )
}
