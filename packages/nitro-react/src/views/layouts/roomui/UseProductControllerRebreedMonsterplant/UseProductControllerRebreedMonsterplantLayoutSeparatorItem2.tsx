import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const UseProductControllerRebreedMonsterplantLayoutSeparatorItem2 = ({ layout, separator }: UseProductControllerRebreedMonsterplantLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
