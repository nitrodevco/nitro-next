import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogOfferProduct, useProductIconUrl } from '#base/hooks';
import { Border, Image } from '#base/theme-pixi';

import { CatalogItemGridWidgetItemPriceView } from './CatalogItemGridWidgetItemPriceView';

export interface CatalogItemGridWidgetItemSelectedViewProps {
    offer: IPurchasableOffer;
}

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetItemSelectedView.tsx. */
export const CatalogItemGridWidgetItemSelectedView = ({ offer }: CatalogItemGridWidgetItemSelectedViewProps) => {
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);

    if (!offer || !product) return null;

    return (
        <Border
            variant="3"
            tintColor="#63c5e9"
            layout={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 2 }}
        >
            <Border
                variant="3"
                layout={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 3, paddingBottom: 3 }}
            >
                <Image
                    src={iconUrl}
                    showLoadingPlaceholder
                    layout={{ minWidth: 32, minHeight: 32, maxWidth: 32, maxHeight: 32 }}
                />
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </Border>
        </Border>
    );
};
