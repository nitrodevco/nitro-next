import { CatalogPricingTypeEnum } from '@nitrodevco/nitro-api';

import { useCatalogSelectors, useTranslation } from '#base/context';
import { Box, getPixiTextStyle, NitroCurrencyIcon } from '#base/theme-pixi';

/** Pixi port of views/catalog/page/widgets/CatalogTotalPriceWidgetView.tsx. */
export const CatalogTotalPriceWidgetViewPixi = () => {
    const { activeOffer } = useCatalogSelectors();
    const t = useTranslation();

    if (!activeOffer) return null;

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, width: '100%' }}>
            <pixiText layout={{}} text={t('catalog.bundlewidget.price')} style={getPixiTextStyle('text-style-u-regular', { fill: '#666666' })} />
            <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {(activeOffer.pricingType === CatalogPricingTypeEnum.Credits || activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) && (
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <pixiText layout={{}} text={String(activeOffer.priceInCredits)} style={getPixiTextStyle('text-style-u-bold', { fontSize: 14, fill: '#000000' })} />
                        <NitroCurrencyIcon type="-1" layout={{}} />
                    </Box>
                )}
                {activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints && (
                    <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                        <pixiText layout={{}} text="+" style={getPixiTextStyle('text-style-u-bold', { fontSize: 14, fill: '#000000' })} />
                        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <pixiText layout={{}} text={String(activeOffer.priceInActivityPoints)} style={getPixiTextStyle('text-style-u-bold', { fontSize: 14, fill: '#000000' })} />
                            <NitroCurrencyIcon type={activeOffer.activityPointType.toString()} layout={{}} />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
