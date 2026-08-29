import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingLayoutItemGrid0, InventoryTradingLayoutItemGrid0Props } from './InventoryTradingLayoutItemGrid0';

/** Named region `item_grid_border_0` of InventoryTradingLayout - configured through the parent's `itemGridBorder0` prop. */
export interface InventoryTradingLayoutItemGridBorder0Props {
    itemGrid0?: InventoryTradingLayoutItemGrid0Props;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGridBorder0 = ({ itemGrid0, layout }: InventoryTradingLayoutItemGridBorder0Props) => {
    return (
        <Region
            name="item_grid_border_0"
            layout={{ position: 'absolute', left: 32, width: 136, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingLayoutItemGrid0 {...itemGrid0} />
        </Region>
    );
};
