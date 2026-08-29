import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of TransactionDetailsLayout - pass real rows through its `items…` slot. */
export interface TransactionDetailsLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const TransactionDetailsLayoutSpacerItem = ({ layout, spacer }: TransactionDetailsLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
