import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { Border, InfiniteGrid } from '#base/theme-pixi';

import { CatalogItemGridWidgetItemViewPixi } from './CatalogItemGridWidgetItemViewPixi';

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetView.tsx. */
export const CatalogItemGridWidgetViewPixi = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    return (
        <Border
            variant="6"
            blend={0.5}
            layout={{ width: '100%', height: '100%' }}
        >
            <InfiniteGrid<IPurchasableOffer>
                items={activePage.offers}
                getKey={x => x.offerId}
                itemWidth={55}
                itemRender={x => <CatalogItemGridWidgetItemViewPixi offer={x} />}
            />
        </Border>
    );
};
