import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const TransactionDetailsLayoutSpacingItem = ({ layout, spacing }: TransactionDetailsLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 380, height: 5, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
