import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ConfirmPetBreedingLayoutPetDescriptionItem2 } from './ConfirmPetBreedingLayoutPetDescriptionItem2';
import { ConfirmPetBreedingLayoutPetLevelItem2 } from './ConfirmPetBreedingLayoutPetLevelItem2';
import { ConfirmPetBreedingLayoutPetNameItem2 } from './ConfirmPetBreedingLayoutPetNameItem2';
import { ConfirmPetBreedingLayoutPreviewImage2Item } from './ConfirmPetBreedingLayoutPreviewImage2Item';

/** Row template `pet2_itemlist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPet2ItemlistItemProps {
    itemsPet2Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPet2ItemlistItem = ({ itemsPet2Itemlist, layout }: ConfirmPetBreedingLayoutPet2ItemlistItemProps) => {
    return (
        <Region
            name="pet2_itemlist"
            layout={{ flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPet2Itemlist ?? (
                <>
                    <ConfirmPetBreedingLayoutPetNameItem2 />
                    <ConfirmPetBreedingLayoutPreviewImage2Item />
                    <ConfirmPetBreedingLayoutPetLevelItem2 />
                    <ConfirmPetBreedingLayoutPetDescriptionItem2 />
                </>
            )}
        </Region>
    );
};
