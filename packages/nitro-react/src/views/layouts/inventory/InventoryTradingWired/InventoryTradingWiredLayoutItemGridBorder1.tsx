import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutItemGrid1, InventoryTradingWiredLayoutItemGrid1Props } from './InventoryTradingWiredLayoutItemGrid1';

/** Named region `item_grid_border_1` of InventoryTradingWiredLayout - configured through the parent's `itemGridBorder1` prop. */
export interface InventoryTradingWiredLayoutItemGridBorder1Props {
    itemGrid1?: InventoryTradingWiredLayoutItemGrid1Props;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutItemGridBorder1 = ({ itemGrid1, layout }: InventoryTradingWiredLayoutItemGridBorder1Props) => {
    return (
        <Region
            name="item_grid_border_1"
            layout={{ position: 'absolute', left: 32, width: 180, top: 22, height: 136, ...layout }}
        >
            <InventoryTradingWiredLayoutItemGrid1 {...itemGrid1} />
        </Region>
    );
};
