import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const PremiumPurchaseConfirmationLayoutSpacingItem = ({ layout, spacing }: PremiumPurchaseConfirmationLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
