import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparatorItem = ({ layout, separator }: UseProductControllerFertilizeMonsterplantLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
