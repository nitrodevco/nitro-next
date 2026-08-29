import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacer` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutSpacerItemProps {
    layout?: BoxLayout;
    spacer?: ReactNode;
}

export const InventoryLayoutSpacerItem = ({ layout, spacer }: InventoryLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 12, flexShrink: 0, ...layout }}
        >
            {spacer}
        </Region>
    );
};
