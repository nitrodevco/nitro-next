import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { CostumehopperCostumerequiredLayoutBodytextItem } from './CostumehopperCostumerequiredLayoutBodytextItem';
import { CostumehopperCostumerequiredLayoutTitleItem } from './CostumehopperCostumerequiredLayoutTitleItem';

/** Row template `list_top` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutListTopItem = ({ itemsListTop, layout }: CostumehopperCostumerequiredLayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <CostumehopperCostumerequiredLayoutTitleItem />
                    <CostumehopperCostumerequiredLayoutBodytextItem />
                </>
            )}
        </Region>
    );
};
