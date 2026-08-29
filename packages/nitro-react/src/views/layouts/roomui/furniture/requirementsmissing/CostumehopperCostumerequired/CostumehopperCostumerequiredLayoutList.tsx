import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { CostumehopperCostumerequiredLayoutListBottomItem } from './CostumehopperCostumerequiredLayoutListBottomItem';
import { CostumehopperCostumerequiredLayoutListTopItem } from './CostumehopperCostumerequiredLayoutListTopItem';

/** Named region `list` of CostumehopperCostumerequiredLayout - configured through the parent's `list` prop. */
export interface CostumehopperCostumerequiredLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutList = ({ itemsList, layout }: CostumehopperCostumerequiredLayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 10, top: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsList ?? (
                <>
                    <CostumehopperCostumerequiredLayoutListTopItem />
                    <CostumehopperCostumerequiredLayoutListBottomItem />
                </>
            )}
        </Region>
    );
};
