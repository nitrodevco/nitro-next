import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PetViewLayoutStatusEnergyContainerItem } from './PetViewLayoutStatusEnergyContainerItem';
import { PetViewLayoutStatusExperienceContainerItem } from './PetViewLayoutStatusExperienceContainerItem';
import { PetViewLayoutStatusHappinessContainerItem } from './PetViewLayoutStatusHappinessContainerItem';
import { PetViewLayoutStatusRarityLevelItem } from './PetViewLayoutStatusRarityLevelItem';

/** Named region `status_item_list_default` of PetViewLayout - configured through the parent's `statusItemListDefault` prop. */
export interface PetViewLayoutStatusItemListDefaultProps {
    itemsStatusItemListDefault?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusItemListDefault = ({ itemsStatusItemListDefault, layout }: PetViewLayoutStatusItemListDefaultProps) => {
    return (
        <Region
            name="status_item_list_default"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 142, flexDirection: 'column', ...layout }}
        >
            {itemsStatusItemListDefault ?? (
                <>
                    <PetViewLayoutStatusHappinessContainerItem />
                    <PetViewLayoutStatusExperienceContainerItem />
                    <PetViewLayoutStatusEnergyContainerItem />
                    <PetViewLayoutStatusRarityLevelItem />
                </>
            )}
        </Region>
    );
};
