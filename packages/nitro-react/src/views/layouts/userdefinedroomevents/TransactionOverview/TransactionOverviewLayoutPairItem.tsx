import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TransactionOverviewLayoutListTypeKeyItem } from './TransactionOverviewLayoutListTypeKeyItem';
import { TransactionOverviewLayoutListTypeValueItem } from './TransactionOverviewLayoutListTypeValueItem';

/** Row template `pair` of TransactionOverviewLayout - pass real rows through its `items…` slot. */
export interface TransactionOverviewLayoutPairItemProps {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionOverviewLayoutPairItem = ({ itemsPair, layout }: TransactionOverviewLayoutPairItemProps) => {
    return (
        <Region
            name="pair"
            layout={{ width: 94, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <TransactionOverviewLayoutListTypeKeyItem />
                    <TransactionOverviewLayoutListTypeValueItem />
                </>
            )}
        </Region>
    );
};
