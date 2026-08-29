import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const BreedPetsResultLayoutSeparatorItem2 = ({ layout, separator }: BreedPetsResultLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            layout={{ width: 274, height: 1, flexShrink: 0, minWidth: 274, minHeight: 1, ...layout }}
        >
            {separator}
        </Region>
    );
};
