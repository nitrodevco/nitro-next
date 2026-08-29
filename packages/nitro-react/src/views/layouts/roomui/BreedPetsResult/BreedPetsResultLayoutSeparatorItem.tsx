import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const BreedPetsResultLayoutSeparatorItem = ({ layout, separator }: BreedPetsResultLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 274, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
