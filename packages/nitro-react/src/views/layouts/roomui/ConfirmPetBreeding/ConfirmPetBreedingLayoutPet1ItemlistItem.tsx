import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ConfirmPetBreedingLayoutPetDescriptionItem } from './ConfirmPetBreedingLayoutPetDescriptionItem';
import { ConfirmPetBreedingLayoutPetLevelItem } from './ConfirmPetBreedingLayoutPetLevelItem';
import { ConfirmPetBreedingLayoutPetNameItem } from './ConfirmPetBreedingLayoutPetNameItem';
import { ConfirmPetBreedingLayoutPreviewImageItem } from './ConfirmPetBreedingLayoutPreviewImageItem';

/** Row template `pet1_itemlist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPet1ItemlistItemProps {
    itemsPet1Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPet1ItemlistItem = ({ itemsPet1Itemlist, layout }: ConfirmPetBreedingLayoutPet1ItemlistItemProps) => {
    return (
        <Region
            name="pet1_itemlist"
            layout={{ flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPet1Itemlist ?? (
                <>
                    <ConfirmPetBreedingLayoutPetNameItem />
                    <ConfirmPetBreedingLayoutPreviewImageItem />
                    <ConfirmPetBreedingLayoutPetLevelItem />
                    <ConfirmPetBreedingLayoutPetDescriptionItem />
                </>
            )}
        </Region>
    );
};
