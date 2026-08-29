import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PetViewLayoutGrowthStatusTextItem } from './PetViewLayoutGrowthStatusTextItem';
import { PetViewLayoutGrowthStatusWidgetItem } from './PetViewLayoutGrowthStatusWidgetItem';
import { PetViewLayoutRarityItemOverlayWidgetItem } from './PetViewLayoutRarityItemOverlayWidgetItem';
import { PetViewLayoutStatusRarityLevelItem2 } from './PetViewLayoutStatusRarityLevelItem2';
import { PetViewLayoutStatusWellbeingContainerItem } from './PetViewLayoutStatusWellbeingContainerItem';

/** Named region `status_item_list_monsterplant` of PetViewLayout - configured through the parent's `statusItemListMonsterplant` prop. */
export interface PetViewLayoutStatusItemListMonsterplantProps {
    itemsStatusItemListMonsterplant?: ReactNode;
    layout?: BoxLayout;
    visibleStatusItemListMonsterplant?: boolean;
}

export const PetViewLayoutStatusItemListMonsterplant = ({ itemsStatusItemListMonsterplant, layout, visibleStatusItemListMonsterplant }: PetViewLayoutStatusItemListMonsterplantProps) => {
    return (
        (visibleStatusItemListMonsterplant ?? false) && (
            <Region
                name="status_item_list_monsterplant"
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 137, flexDirection: 'column', gap: 2, ...layout }}
            >
                {itemsStatusItemListMonsterplant ?? (
                    <>
                        <PetViewLayoutStatusWellbeingContainerItem />
                        <PetViewLayoutGrowthStatusTextItem />
                        <PetViewLayoutGrowthStatusWidgetItem />
                        <PetViewLayoutStatusRarityLevelItem2 />
                        <PetViewLayoutRarityItemOverlayWidgetItem />
                    </>
                )}
            </Region>
        )
    );
};
