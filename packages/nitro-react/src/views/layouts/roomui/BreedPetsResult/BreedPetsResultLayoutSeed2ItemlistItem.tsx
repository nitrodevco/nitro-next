import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutInfoMutate2Item } from './BreedPetsResultLayoutInfoMutate2Item';
import { BreedPetsResultLayoutPreviewImageRegion2Item } from './BreedPetsResultLayoutPreviewImageRegion2Item';
import { BreedPetsResultLayoutSeedDescriptionItem2 } from './BreedPetsResultLayoutSeedDescriptionItem2';
import { BreedPetsResultLayoutSeedNameItem2 } from './BreedPetsResultLayoutSeedNameItem2';
import { BreedPetsResultLayoutSeedRarityLevelItem2 } from './BreedPetsResultLayoutSeedRarityLevelItem2';

/** Row template `seed2_itemlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed2ItemlistItemProps {
    itemsSeed2Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed2ItemlistItem = ({ itemsSeed2Itemlist, layout }: BreedPetsResultLayoutSeed2ItemlistItemProps) => {
    return (
        <Region
            name="seed2_itemlist"
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed2Itemlist ?? (
                <>
                    <BreedPetsResultLayoutSeedNameItem2 />
                    <BreedPetsResultLayoutPreviewImageRegion2Item />
                    <BreedPetsResultLayoutSeedRarityLevelItem2 />
                    <BreedPetsResultLayoutSeedDescriptionItem2 />
                    <BreedPetsResultLayoutInfoMutate2Item />
                </>
            )}
        </Region>
    );
};
