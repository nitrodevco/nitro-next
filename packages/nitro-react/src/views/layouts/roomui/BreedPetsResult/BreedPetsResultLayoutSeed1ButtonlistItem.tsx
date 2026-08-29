import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutPickButton1Item } from './BreedPetsResultLayoutPickButton1Item';
import { BreedPetsResultLayoutPlaceButton1Item } from './BreedPetsResultLayoutPlaceButton1Item';

/** Row template `seed1_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed1ButtonlistItemProps {
    itemsSeed1Buttonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed1ButtonlistItem = ({ itemsSeed1Buttonlist, layout }: BreedPetsResultLayoutSeed1ButtonlistItemProps) => {
    return (
        <Region
            name="seed1_buttonlist"
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed1Buttonlist ?? (
                <>
                    <BreedPetsResultLayoutPlaceButton1Item />
                    <BreedPetsResultLayoutPickButton1Item />
                </>
            )}
        </Region>
    );
};
