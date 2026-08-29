import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TableViewLayoutTableElementItem } from './TableViewLayoutTableElementItem';

/** Row template `table_row` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableRowItemProps {
    itemsTableRow?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableRowItem = ({ itemsTableRow, layout }: TableViewLayoutTableRowItemProps) => {
    return (
        <Region
            name="table_row"
            backgroundColor="#eaeaea"
            layout={{ width: 440, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, flexDirection: 'row', ...layout }}
        >
            {itemsTableRow ?? (
                <TableViewLayoutTableElementItem />
            )}
        </Region>
    );
};
