import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutSeed1ItemlistItem } from './BreedPetsResultLayoutSeed1ItemlistItem';
import { BreedPetsResultLayoutSeed2ItemlistItem } from './BreedPetsResultLayoutSeed2ItemlistItem';

/** Row template `preview_list` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewListItemProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutPreviewListItem = ({ itemsPreviewList, layout }: BreedPetsResultLayoutPreviewListItemProps) => {
    return (
        <Region
            name="preview_list"
            layout={{ flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <BreedPetsResultLayoutSeed1ItemlistItem />
                    <BreedPetsResultLayoutSeed2ItemlistItem />
                </>
            )}
        </Region>
    );
};
