import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsConfirmationLayoutPlantDescriptionItem } from './BreedPetsConfirmationLayoutPlantDescriptionItem';
import { BreedPetsConfirmationLayoutPlantNameItem } from './BreedPetsConfirmationLayoutPlantNameItem';
import { BreedPetsConfirmationLayoutPlantRarityLevelItem } from './BreedPetsConfirmationLayoutPlantRarityLevelItem';
import { BreedPetsConfirmationLayoutPreviewImageItem } from './BreedPetsConfirmationLayoutPreviewImageItem';

/** Row template `plant1_itemlist` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlant1ItemlistItemProps {
    itemsPlant1Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlant1ItemlistItem = ({ itemsPlant1Itemlist, layout }: BreedPetsConfirmationLayoutPlant1ItemlistItemProps) => {
    return (
        <Region
            name="plant1_itemlist"
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlant1Itemlist ?? (
                <>
                    <BreedPetsConfirmationLayoutPlantNameItem />
                    <BreedPetsConfirmationLayoutPreviewImageItem />
                    <BreedPetsConfirmationLayoutPlantRarityLevelItem />
                    <BreedPetsConfirmationLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};
