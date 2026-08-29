import { BoxLayout, Region } from '#base/theme';

import { PetViewLayoutStatusItemListDefault, PetViewLayoutStatusItemListDefaultProps } from './PetViewLayoutStatusItemListDefault';
import { PetViewLayoutStatusItemListMonsterplant, PetViewLayoutStatusItemListMonsterplantProps } from './PetViewLayoutStatusItemListMonsterplant';

/** Row template `status_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusContainerItemProps {
    layout?: BoxLayout;
    statusItemListDefault?: PetViewLayoutStatusItemListDefaultProps;
    statusItemListMonsterplant?: PetViewLayoutStatusItemListMonsterplantProps;
    visibleStatusItemListDefault?: boolean;
    visibleStatusItemListMonsterplant?: boolean;
}

export const PetViewLayoutStatusContainerItem = ({ layout, statusItemListDefault, statusItemListMonsterplant, visibleStatusItemListDefault, visibleStatusItemListMonsterplant }: PetViewLayoutStatusContainerItemProps) => {
    return (
        <Region
            name="status_container"
            layout={{ width: 170, height: 140, flexShrink: 0, ...layout }}
        >
            {(visibleStatusItemListDefault ?? true) && (
                <PetViewLayoutStatusItemListDefault {...statusItemListDefault} />
            )}
            {(visibleStatusItemListMonsterplant ?? false) && (
                <PetViewLayoutStatusItemListMonsterplant {...statusItemListMonsterplant} />
            )}
        </Region>
    );
};
