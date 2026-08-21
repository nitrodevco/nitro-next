import type { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { CatalogPricingTypeEnum } from '@nitrodevco/nitro-api';

import { Box, getPixiTextStyle, NitroCurrencyIcon } from '#base/theme-pixi';

export interface CatalogItemGridWidgetItemPriceViewPixiProps {
    offer: IPurchasableOffer;
}

/** Pixi port of views/catalog/page/widgets/CatalogItemGridWidgetItemPriceView.tsx. */
export const CatalogItemGridWidgetItemPriceViewPixi = ({ offer }: CatalogItemGridWidgetItemPriceViewPixiProps) => {
    if (!offer || offer.pricingType === CatalogPricingTypeEnum.None) return null;

    return (
        <Box layout={{ flexDirection: 'column', width: '100%', gap: 2, paddingLeft: 4, paddingRight: 4 }}>
            {(offer.pricingType === CatalogPricingTypeEnum.Credits || offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) && (
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <pixiText layout={{}} text={String(offer.priceInCredits)} style={getPixiTextStyle('text-style-u-bold', { fill: '#000000' })} />
                    <NitroCurrencyIcon type="-1" mini layout={{}} />
                </Box>
            )}
            {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints && (
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <pixiText layout={{}} text="+" style={getPixiTextStyle('text-style-u-bold', { fill: '#000000' })} />
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <pixiText layout={{}} text={String(offer.priceInActivityPoints)} style={getPixiTextStyle('text-style-u-bold', { fill: '#000000' })} />
                        <NitroCurrencyIcon type={offer.activityPointType.toString()} mini layout={{}} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};
