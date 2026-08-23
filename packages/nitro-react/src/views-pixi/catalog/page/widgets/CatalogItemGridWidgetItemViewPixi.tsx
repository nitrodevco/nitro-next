import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { useCatalogNavigation, useCatalogOfferProduct, useProductIconUrl } from '#base/hooks';
import { Box, Image } from '#base/theme-pixi';

import { CatalogItemGridWidgetItemPriceViewPixi } from './CatalogItemGridWidgetItemPriceViewPixi';
import { CatalogItemGridWidgetItemSelectedViewPixi } from './CatalogItemGridWidgetItemSelectedViewPixi';

export interface CatalogItemGridWidgetItemViewPixiProps {
    offer: IPurchasableOffer;
}

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetItemView.tsx. */
export const CatalogItemGridWidgetItemViewPixi = ({ offer }: CatalogItemGridWidgetItemViewPixiProps) => {
    const { activeOffer } = useCatalogSelectors();
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);
    const { selectOffer } = useCatalogNavigation();

    if (activeOffer && (activeOffer.offerId == offer.offerId)) return <CatalogItemGridWidgetItemSelectedViewPixi offer={offer} />;

    return (
        <Box layout={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Box
                eventMode="static"
                cursor="pointer"
                onPointerTap={() => selectOffer(offer)}
                layout={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 3, paddingBottom: 3 }}
            >
                <Image
                    src={iconUrl}
                    layout={{ minWidth: 32, minHeight: 32, maxWidth: 32, maxHeight: 32 }}
                />
                <CatalogItemGridWidgetItemPriceViewPixi offer={offer} />
            </Box>
        </Box>
    );
};
