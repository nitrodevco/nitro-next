import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutItemGrid0, InventoryTradingWiredLayoutItemGrid0Props } from './InventoryTradingWiredLayoutItemGrid0';

/** Named region `item_grid_border_0` of InventoryTradingWiredLayout - configured through the parent's `itemGridBorder0` prop. */
export interface InventoryTradingWiredLayoutItemGridBorder0Props {
    itemGrid0?: InventoryTradingWiredLayoutItemGrid0Props;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutItemGridBorder0 = ({ itemGrid0, layout }: InventoryTradingWiredLayoutItemGridBorder0Props) => {
    return (
        <Region
            name="item_grid_border_0"
            layout={{ position: 'absolute', left: 32, width: 136, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingWiredLayoutItemGrid0 {...itemGrid0} />
        </Region>
    );
};
