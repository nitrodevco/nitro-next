import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogStore } from '#base/context/catalog';
import { Border, InfiniteGrid } from '#base/theme';

import { CatalogItemGridWidgetItemView } from './CatalogItemGridWidgetItemView';

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetView.tsx. */
export const CatalogItemGridWidgetView = () => {
    const activePage = useCatalogStore(x => x.activePage);

    if (!activePage) return null;

    return (
        <Border
            variant="6"
            blend={0.5}
            layout={{ width: '100%', height: '100%', padding: 4 }}
        >
            <InfiniteGrid<IPurchasableOffer>
                items={activePage.offers}
                getKey={x => x.offerId}
                overrideColumnCount={6}
                itemWidth={53}
                itemRender={x => <CatalogItemGridWidgetItemView offer={x} />}
            />
        </Border>
    );
};
