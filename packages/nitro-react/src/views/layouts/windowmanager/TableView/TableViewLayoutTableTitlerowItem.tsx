import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TableViewLayoutColumnNameItem } from './TableViewLayoutColumnNameItem';

/** Row template `table_titlerow` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableTitlerowItemProps {
    itemsTableTitlerow?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableTitlerowItem = ({ itemsTableTitlerow, layout }: TableViewLayoutTableTitlerowItemProps) => {
    return (
        <Region
            name="table_titlerow"
            layout={{ width: 440, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row', ...layout }}
        >
            {itemsTableTitlerow ?? (
                <TableViewLayoutColumnNameItem />
            )}
        </Region>
    );
};
