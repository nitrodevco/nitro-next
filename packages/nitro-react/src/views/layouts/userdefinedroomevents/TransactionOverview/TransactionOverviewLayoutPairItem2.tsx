import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TransactionOverviewLayoutIdKeyItem } from './TransactionOverviewLayoutIdKeyItem';
import { TransactionOverviewLayoutIdValueItem } from './TransactionOverviewLayoutIdValueItem';

/** Row template `pair` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutPairItem2Props {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPairItem2 = ({ itemsPair, layout }: TransactionOverviewLayoutPairItem2Props) => {
    return (
        <Region
            name="pair"
            layout={{ width: 93, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <TransactionOverviewLayoutIdKeyItem />
                    <TransactionOverviewLayoutIdValueItem />
                </>
            )}
        </Region>
    );
};
