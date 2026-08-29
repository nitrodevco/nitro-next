import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutInfoMutate1Item } from './BreedPetsResultLayoutInfoMutate1Item';
import { BreedPetsResultLayoutPreviewImageRegionItem } from './BreedPetsResultLayoutPreviewImageRegionItem';
import { BreedPetsResultLayoutSeedDescriptionItem } from './BreedPetsResultLayoutSeedDescriptionItem';
import { BreedPetsResultLayoutSeedNameItem } from './BreedPetsResultLayoutSeedNameItem';
import { BreedPetsResultLayoutSeedRarityLevelItem } from './BreedPetsResultLayoutSeedRarityLevelItem';

/** Row template `seed1_itemlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed1ItemlistItemProps {
    itemsSeed1Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed1ItemlistItem = ({ itemsSeed1Itemlist, layout }: BreedPetsResultLayoutSeed1ItemlistItemProps) => {
    return (
        <Region
            name="seed1_itemlist"
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed1Itemlist ?? (
                <>
                    <BreedPetsResultLayoutSeedNameItem />
                    <BreedPetsResultLayoutPreviewImageRegionItem />
                    <BreedPetsResultLayoutSeedRarityLevelItem />
                    <BreedPetsResultLayoutSeedDescriptionItem />
                    <BreedPetsResultLayoutInfoMutate1Item />
                </>
            )}
        </Region>
    );
};
