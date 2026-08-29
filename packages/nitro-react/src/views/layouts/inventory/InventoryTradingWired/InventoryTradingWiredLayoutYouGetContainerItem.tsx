import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `you_get_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGetContainerItemProps {
    layout?: BoxLayout;
    youGetContainer?: ReactNode;
}

export const InventoryTradingWiredLayoutYouGetContainerItem = ({ layout, youGetContainer }: InventoryTradingWiredLayoutYouGetContainerItemProps) => {
    return (
        <Region
            name="you_get_container"
            layout={{ width: 180, height: 180, flexShrink: 0, ...layout }}
        >
            {youGetContainer}
        </Region>
    );
};
