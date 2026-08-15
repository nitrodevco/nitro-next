
import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors } from "#base/context"
import { Border, InfiniteGrid } from "#base/theme"

import { CatalogItemGridWidgetItemView } from "./CatalogItemGridWidgetItemView";

export const CatalogItemGridWidgetView = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    return (
        <Border variant="6" className="size-full">
            <InfiniteGrid<IPurchasableOffer>
                key="catalog-grid"
                items={activePage.offers}
                getKey={x => x.offerId}
                itemWidth={53}
                minHeight={74}
                itemRender={x => <CatalogItemGridWidgetItemView offer={x} />} />
        </Border>
    )
}
