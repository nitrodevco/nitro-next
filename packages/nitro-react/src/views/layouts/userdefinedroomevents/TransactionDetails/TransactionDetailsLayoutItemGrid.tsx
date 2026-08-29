import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { TransactionDetailsLayoutFurniTemplateItem } from './TransactionDetailsLayoutFurniTemplateItem';

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGridProps {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutItemGrid = ({ itemsItemGrid, layout }: TransactionDetailsLayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="item_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsItemGrid ?? (
                    <TransactionDetailsLayoutFurniTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
