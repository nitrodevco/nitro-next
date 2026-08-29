import { Border, BoxLayout, Region } from '#base/theme';

/** Named region `item_grid_1` of InventoryTradingWiredLayout - configured through the parent's `itemGrid1` prop. */
export interface InventoryTradingWiredLayoutItemGrid1Props {
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutItemGrid1 = ({ layout }: InventoryTradingWiredLayoutItemGrid1Props) => {
    return (
        <Region
            name="item_grid_1"
            layout={{ position: 'absolute', left: 4, width: 132, top: 4, height: 132, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
            <Border
                variant="102"
                tintColor="#cccccc"
                layout={{ width: 40, height: 40, flexShrink: 0, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
            />
        </Region>
    );
};
