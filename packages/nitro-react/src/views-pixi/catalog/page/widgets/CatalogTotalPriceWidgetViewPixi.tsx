import { CatalogPricingTypeEnum } from '@nitrodevco/nitro-api';

import { useCatalogSelectors, useTranslation } from '#base/context';
import { Box, NitroCurrencyIcon, Text } from '#base/theme-pixi';

/** Pixi port of views/catalog/page/widgets/CatalogTotalPriceWidgetView.tsx. */
export const CatalogTotalPriceWidgetViewPixi = () => {
    const { activeOffer } = useCatalogSelectors();
    const t = useTranslation();

    if (!activeOffer) return null;

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, width: '100%' }}>
            <Text text={t('catalog.bundlewidget.price')} textStyle="text-style-u-regular" textOptions={{ fill: '#666666' }} />
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {(activeOffer.pricingType === CatalogPricingTypeEnum.Credits || activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) && (
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <Text text={String(activeOffer.priceInCredits)} textStyle="text-style-u-bold" textOptions={{ fontSize: 14, fill: '#000000' }} />
                        <NitroCurrencyIcon type="-1" layout={{}} />
                    </Box>
                )}
                {activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints && (
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <Text text="+" textStyle="text-style-u-bold" textOptions={{ fontSize: 14, fill: '#000000' }} />
                        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text text={String(activeOffer.priceInActivityPoints)} textStyle="text-style-u-bold" textOptions={{ fontSize: 14, fill: '#000000' }} />
                            <NitroCurrencyIcon type={activeOffer.activityPointType.toString()} layout={{}} />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
