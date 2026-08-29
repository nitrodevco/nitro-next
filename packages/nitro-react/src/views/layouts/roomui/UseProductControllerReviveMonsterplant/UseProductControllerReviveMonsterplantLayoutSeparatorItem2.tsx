import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const UseProductControllerReviveMonsterplantLayoutSeparatorItem2 = ({ layout, separator }: UseProductControllerReviveMonsterplantLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
