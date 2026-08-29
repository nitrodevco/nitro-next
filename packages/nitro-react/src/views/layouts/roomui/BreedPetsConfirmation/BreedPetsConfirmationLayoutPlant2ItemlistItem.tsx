import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsConfirmationLayoutPlantDescriptionItem2 } from './BreedPetsConfirmationLayoutPlantDescriptionItem2';
import { BreedPetsConfirmationLayoutPlantNameItem2 } from './BreedPetsConfirmationLayoutPlantNameItem2';
import { BreedPetsConfirmationLayoutPlantRarityLevelItem2 } from './BreedPetsConfirmationLayoutPlantRarityLevelItem2';
import { BreedPetsConfirmationLayoutPreviewImage2Item } from './BreedPetsConfirmationLayoutPreviewImage2Item';

/** Row template `plant2_itemlist` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlant2ItemlistItemProps {
    itemsPlant2Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlant2ItemlistItem = ({ itemsPlant2Itemlist, layout }: BreedPetsConfirmationLayoutPlant2ItemlistItemProps) => {
    return (
        <Region
            name="plant2_itemlist"
            layout={{ alignSelf: 'stretch', flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlant2Itemlist ?? (
                <>
                    <BreedPetsConfirmationLayoutPlantNameItem2 />
                    <BreedPetsConfirmationLayoutPreviewImage2Item />
                    <BreedPetsConfirmationLayoutPlantRarityLevelItem2 />
                    <BreedPetsConfirmationLayoutPlantDescriptionItem2 />
                </>
            )}
        </Region>
    );
};
