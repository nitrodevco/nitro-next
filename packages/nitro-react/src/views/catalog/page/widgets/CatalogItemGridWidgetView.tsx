import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { Border, InfiniteGrid } from '#base/theme';

import { CatalogItemGridWidgetItemView } from './CatalogItemGridWidgetItemView';

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetView.tsx. */
export const CatalogItemGridWidgetView = () => {
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
                overrideColumnCount={6}
                itemWidth={53}
                itemRender={x => <CatalogItemGridWidgetItemView offer={x} />}
            />
        </Border>
    );
};
