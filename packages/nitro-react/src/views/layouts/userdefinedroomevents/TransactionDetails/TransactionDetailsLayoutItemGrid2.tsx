import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { TransactionDetailsLayoutFurniTemplateItem2 } from './TransactionDetailsLayoutFurniTemplateItem2';

/** Named region `item_grid` of TransactionDetailsLayout - configured through the parent's `itemGrid` prop. */
export interface TransactionDetailsLayoutItemGrid2Props {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
}

export const TransactionDetailsLayoutItemGrid2 = ({ itemsItemGrid, layout }: TransactionDetailsLayoutItemGrid2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 4, ...layout }}
        >
            <Region
                name="item_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsItemGrid ?? (
                    <TransactionDetailsLayoutFurniTemplateItem2 />
                )}
            </Region>
        </ScrollArea>
    );
};
