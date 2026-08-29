import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutPickButton2Item } from './BreedPetsResultLayoutPickButton2Item';
import { BreedPetsResultLayoutPlaceButton2Item } from './BreedPetsResultLayoutPlaceButton2Item';

/** Row template `seed2_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed2ButtonlistItemProps {
    itemsSeed2Buttonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed2ButtonlistItem = ({ itemsSeed2Buttonlist, layout }: BreedPetsResultLayoutSeed2ButtonlistItemProps) => {
    return (
        <Region
            name="seed2_buttonlist"
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed2Buttonlist ?? (
                <>
                    <BreedPetsResultLayoutPlaceButton2Item />
                    <BreedPetsResultLayoutPickButton2Item />
                </>
            )}
        </Region>
    );
};
