import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useCatalogSelectors } from '#base/context';
import { useCatalogNavigation, useCatalogOfferProduct, useProductIconUrl } from '#base/hooks';
import { Box, ThemeImage } from '#base/theme';

import { CatalogItemGridWidgetItemPriceView } from './CatalogItemGridWidgetItemPriceView';
import { CatalogItemGridWidgetItemSelectedView } from './CatalogItemGridWidgetItemSelectedView';

export interface CatalogItemGridWidgetItemViewProps {
    offer: IPurchasableOffer;
}

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetItemView.tsx. */
export const CatalogItemGridWidgetItemView = ({ offer }: CatalogItemGridWidgetItemViewProps) => {
    const { activeOffer } = useCatalogSelectors();
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);
    const { selectOffer } = useCatalogNavigation();

    if (activeOffer && (activeOffer.offerId == offer.offerId)) return <CatalogItemGridWidgetItemSelectedView offer={offer} />;

    return (
        <Box layout={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <Box
                onPointerTap={() => selectOffer(offer)}
                layout={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 3, paddingBottom: 3 }}
            >
                <Box layout={{ width: 32, height: 32, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                    <ThemeImage
                        src={iconUrl}
                        showLoadingPlaceholder
                    />
                </Box>
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </Box>
        </Box>
    );
};
