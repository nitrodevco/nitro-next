import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingLayoutItemGrid1, InventoryTradingLayoutItemGrid1Props } from './InventoryTradingLayoutItemGrid1';

/** Named region `item_grid_border_1` of InventoryTradingLayout - configured through the parent's `itemGridBorder1` prop. */
export interface InventoryTradingLayoutItemGridBorder1Props {
    itemGrid1?: InventoryTradingLayoutItemGrid1Props;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutItemGridBorder1 = ({ itemGrid1, layout }: InventoryTradingLayoutItemGridBorder1Props) => {
    return (
        <Region
            name="item_grid_border_1"
            layout={{ position: 'absolute', left: 32, width: 180, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingLayoutItemGrid1 {...itemGrid1} />
        </Region>
    );
};
