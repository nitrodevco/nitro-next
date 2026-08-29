import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const BreedPetsConfirmationLayoutSeparatorItem2 = ({ layout, separator }: BreedPetsConfirmationLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            layout={{ alignSelf: 'stretch', height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
