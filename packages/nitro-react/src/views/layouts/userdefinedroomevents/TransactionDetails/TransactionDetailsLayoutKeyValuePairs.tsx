import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

import { TransactionDetailsLayoutChestIdsPairItem } from './TransactionDetailsLayoutChestIdsPairItem';
import { TransactionDetailsLayoutExtraContainerItem } from './TransactionDetailsLayoutExtraContainerItem';
import { TransactionDetailsLayoutFurniDetailsItem } from './TransactionDetailsLayoutFurniDetailsItem';
import { TransactionDetailsLayoutFurniTransactionsPairItem } from './TransactionDetailsLayoutFurniTransactionsPairItem';
import { TransactionDetailsLayoutRoomIdPairItem } from './TransactionDetailsLayoutRoomIdPairItem';
import { TransactionDetailsLayoutSpacingItem } from './TransactionDetailsLayoutSpacingItem';
import { TransactionDetailsLayoutTimestampPairItem } from './TransactionDetailsLayoutTimestampPairItem';
import { TransactionDetailsLayoutTransactionTypePairItem } from './TransactionDetailsLayoutTransactionTypePairItem';
import { TransactionDetailsLayoutUsernamePairItem } from './TransactionDetailsLayoutUsernamePairItem';

/** Named region `key_value_pairs` of TransactionDetailsLayout - configured through the parent's `keyValuePairs` prop. */
export interface TransactionDetailsLayoutKeyValuePairsProps {
    itemsKeyValuePairs?: ReactNode;
    layout?: BoxLayout;
    separatorWidget?: ReactNode;
    separatorWidget2?: ReactNode;
}

export const TransactionDetailsLayoutKeyValuePairs = ({ itemsKeyValuePairs, layout, separatorWidget, separatorWidget2 }: TransactionDetailsLayoutKeyValuePairsProps) => {
    return (
        <Region
            name="key_value_pairs"
            layout={{ position: 'absolute', left: 10, right: 10, top: 13, height: 336, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsKeyValuePairs ?? (
                <>
                    <TransactionDetailsLayoutTransactionTypePairItem />
                    <TransactionDetailsLayoutTimestampPairItem />
                    <TransactionDetailsLayoutRoomIdPairItem />
                    <TransactionDetailsLayoutChestIdsPairItem />
                    <TransactionDetailsLayoutUsernamePairItem />
                    <TransactionDetailsLayoutFurniTransactionsPairItem />
                    <TransactionDetailsLayoutFurniDetailsItem />
                    <TransactionDetailsLayoutSpacingItem />
                    <TransactionDetailsLayoutExtraContainerItem />
                </>
            )}
            <WidgetSlot
                widgetType="separator"
                layout={{ width: 380, height: 5, flexShrink: 0 }}
            >
                {separatorWidget}
            </WidgetSlot>
            <WidgetSlot
                widgetType="separator"
                layout={{ width: 380, height: 5, flexShrink: 0 }}
            >
                {separatorWidget2}
            </WidgetSlot>
        </Region>
    );
};
