import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `total_amount_line` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutTotalAmountLineItemProps {
    layout?: BoxLayout;
    totalAmountLine?: ReactNode;
}

export const ClubExtendConfirmationLayoutTotalAmountLineItem = ({ layout, totalAmountLine }: ClubExtendConfirmationLayoutTotalAmountLineItemProps) => {
    return (
        <Region
            name="total_amount_line"
            backgroundColor="#007a98"
            layout={{ width: 285, height: 3, flexShrink: 0, ...layout }}
        >
            {totalAmountLine}
        </Region>
    );
};
