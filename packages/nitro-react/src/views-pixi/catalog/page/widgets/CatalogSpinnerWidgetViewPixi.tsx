import { useState } from 'react';

import { useCatalogActions, useCatalogSelectors, useTranslation } from '#base/context';
import { Border, Box, getPixiTextStyle, TextInput } from '#base/theme-pixi';

const MIN_VALUE = 1;
const MAX_VALUE = 100;

/** Pixi port of views/catalog/page/widgets/CatalogSpinnerWidgetView.tsx. */
export const CatalogSpinnerWidgetViewPixi = () => {
    const { activeOffer, purchaseOptions } = useCatalogSelectors();
    const [quantityValue, setQuantityValue] = useState<string>(purchaseOptions.quantity.toString());
    const { setPurchaseOptions } = useCatalogActions();
    const t = useTranslation();

    const updateQuantity = (value: string) => {
        let quantity = parseInt(value);

        if (isNaN(quantity)) quantity = 1;

        quantity = Math.max(quantity, MIN_VALUE);
        quantity = Math.min(quantity, MAX_VALUE);

        if (quantity !== purchaseOptions.quantity) setPurchaseOptions({ quantity });

        setQuantityValue(value === '' ? '' : quantity.toString());
    };

    if (!activeOffer || !activeOffer.bundlePurchaseAllowed) return null;

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' }}>
            <pixiText layout={{}} text={t('catalog.bundlewidget.quantity')} style={getPixiTextStyle('text-style-u-regular', { fill: '#666666' })} />
            <Border variant="0" layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 25, maxHeight: 25, minWidth: 30, maxWidth: 30, paddingLeft: 6 }}>
                <TextInput value={quantityValue} onChange={updateQuantity} fontSize={9} layout={{ flex: 1, height: 22 }} />
            </Border>
        </Box>
    );
};
