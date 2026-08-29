import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { TableViewLayoutBottomSpacerItem } from './TableViewLayoutBottomSpacerItem';
import { TableViewLayoutTableRowItem } from './TableViewLayoutTableRowItem';
import { TableViewLayoutTopSpacerItem } from './TableViewLayoutTopSpacerItem';

/** Row template `table_items` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableItemsItemProps {
    itemsTableItems?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableItemsItem = ({ itemsTableItems, layout }: TableViewLayoutTableItemsItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 462, height: 143, flexShrink: 0, ...layout }}
        >
            <Region
                name="table_items"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsTableItems ?? (
                    <>
                        <TableViewLayoutTopSpacerItem />
                        <TableViewLayoutTableRowItem />
                        <TableViewLayoutBottomSpacerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
