import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeText } from '#base/theme';

/** Row template `cnt_quantity` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutCntQuantityItemProps {
    layout?: BoxLayout;
    visibleQuantityInput?: boolean;
}

export const TargetedOfferDialogLayoutCntQuantityItem = ({ layout, visibleQuantityInput }: TargetedOfferDialogLayoutCntQuantityItemProps) => {
    const t = useTranslation();
    const [ quantityInputValue, setQuantityInputValue ] = useState('');

    return (
        <Region
            name="cnt_quantity"
            layout={{ width: 100, height: 30, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('catalog.bundlewidget.quantity')}
                textOptions={{ fill: '#666666' }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 17, maxWidth: 100 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
            >
                {(visibleQuantityInput ?? true) && (
                    <TextInput
                        value={quantityInputValue}
                        onChange={setQuantityInputValue}
                        layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                    />
                )}
            </Border>
        </Region>
    );
};
