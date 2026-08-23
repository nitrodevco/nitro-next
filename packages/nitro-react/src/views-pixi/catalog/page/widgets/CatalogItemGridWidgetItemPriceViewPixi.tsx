import type { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { CatalogPricingTypeEnum } from '@nitrodevco/nitro-api';

import { Box, NitroCurrencyIcon, Text } from '#base/theme-pixi';

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
                    <Text
                        text={String(offer.priceInCredits)}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#000000' }}
                    />
                    <NitroCurrencyIcon
                        type="-1"
                        mini
                        layout={{}}
                    />
                </Box>
            )}
            {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints && (
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <Text
                        text="+"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#000000' }}
                    />
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <Text
                            text={String(offer.priceInActivityPoints)}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#000000' }}
                        />
                        <NitroCurrencyIcon
                            type={offer.activityPointType.toString()}
                            mini
                            layout={{}}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};
