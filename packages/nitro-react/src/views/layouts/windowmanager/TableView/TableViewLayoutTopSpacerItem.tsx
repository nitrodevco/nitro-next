import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `top_spacer` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTopSpacerItemProps {
    layout?: BoxLayout;
    topSpacer?: ReactNode;
}

export const TableViewLayoutTopSpacerItem = ({ layout, topSpacer }: TableViewLayoutTopSpacerItemProps) => {
    return (
        <Region
            name="top_spacer"
            layout={{ width: 0, height: 0, flexShrink: 0, ...layout }}
        >
            {topSpacer}
        </Region>
    );
};
