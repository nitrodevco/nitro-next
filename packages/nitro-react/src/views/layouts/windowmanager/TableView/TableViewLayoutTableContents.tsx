import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TableViewLayoutSplitterItem } from './TableViewLayoutSplitterItem';
import { TableViewLayoutTableItemsItem } from './TableViewLayoutTableItemsItem';
import { TableViewLayoutTableTitlerowItem } from './TableViewLayoutTableTitlerowItem';

/** Named region `table_contents` of TableViewLayout - configured through the parent's `tableContents` prop. */
export interface TableViewLayoutTableContentsProps {
    itemsTableContents?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutTableContents = ({ itemsTableContents, layout }: TableViewLayoutTableContentsProps) => {
    return (
        <Region
            name="table_contents"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, flexDirection: 'column', ...layout }}
        >
            {itemsTableContents ?? (
                <>
                    <TableViewLayoutTableTitlerowItem />
                    <TableViewLayoutSplitterItem />
                    <TableViewLayoutTableItemsItem />
                </>
            )}
        </Region>
    );
};
