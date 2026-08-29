import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BreedPetsResultLayoutCloseButtonItem } from './BreedPetsResultLayoutCloseButtonItem';

/** Row template `button_list` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutButtonListItem = ({ itemsButtonList, layout }: BreedPetsResultLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <BreedPetsResultLayoutCloseButtonItem />
            )}
        </Region>
    );
};
