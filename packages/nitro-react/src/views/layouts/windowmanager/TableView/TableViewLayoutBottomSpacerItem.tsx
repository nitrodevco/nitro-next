import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `bottom_spacer` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutBottomSpacerItemProps {
    bottomSpacer?: ReactNode;
    layout?: BoxLayout;
}

export const TableViewLayoutBottomSpacerItem = ({ bottomSpacer, layout }: TableViewLayoutBottomSpacerItemProps) => {
    return (
        <Region
            name="bottom_spacer"
            layout={{ width: 0, height: 0, flexShrink: 0, ...layout }}
        >
            {bottomSpacer}
        </Region>
    );
};
