import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const UseProductControllerReviveMonsterplantLayoutSeparatorItem = ({ layout, separator }: UseProductControllerReviveMonsterplantLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
