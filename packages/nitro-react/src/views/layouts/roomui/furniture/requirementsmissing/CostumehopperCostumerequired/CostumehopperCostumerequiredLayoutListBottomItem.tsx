import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CostumehopperCostumerequiredLayoutBuyCostumesItem } from './CostumehopperCostumerequiredLayoutBuyCostumesItem';
import { CostumehopperCostumerequiredLayoutSpacerItem } from './CostumehopperCostumerequiredLayoutSpacerItem';

/** Row template `list_bottom` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutListBottomItem = ({ itemsListBottom, layout }: CostumehopperCostumerequiredLayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <CostumehopperCostumerequiredLayoutSpacerItem />
                    <CostumehopperCostumerequiredLayoutBuyCostumesItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 291, height: 3, flexShrink: 0 }}
            />
        </Region>
    );
};
