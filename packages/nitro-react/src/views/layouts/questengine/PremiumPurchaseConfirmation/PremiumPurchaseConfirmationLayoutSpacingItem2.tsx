import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutSpacingItem2Props {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const PremiumPurchaseConfirmationLayoutSpacingItem2 = ({ layout, spacing }: PremiumPurchaseConfirmationLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 30, height: 10, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
