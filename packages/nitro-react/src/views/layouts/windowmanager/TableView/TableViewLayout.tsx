import { BoxLayout, Region } from '#base/theme';

import { TableViewLayoutTableContainer, TableViewLayoutTableContainerProps } from './TableViewLayoutTableContainer';

/** Generated from `2636_table_view_xml` (layout "wired_menu_table_view", 472x177) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TableViewLayoutProps {
    layout?: BoxLayout;
    tableContainer?: TableViewLayoutTableContainerProps;
}

export const TableViewLayout = ({ layout, tableContainer }: TableViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 472, height: 177, ...layout }}>
            <TableViewLayoutTableContainer {...tableContainer} />
        </Region>
    );
};
