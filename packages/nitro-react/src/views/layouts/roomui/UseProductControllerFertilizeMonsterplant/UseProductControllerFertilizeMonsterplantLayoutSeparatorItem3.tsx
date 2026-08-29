import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3Props {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3 = ({ layout, separator }: UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3Props) => {
    return (
        <Region
            name="separator"
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
