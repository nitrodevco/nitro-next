import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutSeed1ButtonlistItem } from './BreedPetsResultLayoutSeed1ButtonlistItem';
import { BreedPetsResultLayoutSeed2ButtonlistItem } from './BreedPetsResultLayoutSeed2ButtonlistItem';

/** Row template `preview_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewButtonlistItemProps {
    itemsPreviewButtonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutPreviewButtonlistItem = ({ itemsPreviewButtonlist, layout }: BreedPetsResultLayoutPreviewButtonlistItemProps) => {
    return (
        <Region
            name="preview_buttonlist"
            layout={{ flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewButtonlist ?? (
                <>
                    <BreedPetsResultLayoutSeed1ButtonlistItem />
                    <BreedPetsResultLayoutSeed2ButtonlistItem />
                </>
            )}
        </Region>
    );
};
