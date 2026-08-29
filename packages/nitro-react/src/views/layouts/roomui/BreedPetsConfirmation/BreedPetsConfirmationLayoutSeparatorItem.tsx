import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `separator` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSeparatorItemProps {
    layout?: BoxLayout;
    separator?: ReactNode;
}

export const BreedPetsConfirmationLayoutSeparatorItem = ({ layout, separator }: BreedPetsConfirmationLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 274, height: 1, flexShrink: 0, ...layout }}
        >
            {separator}
        </Region>
    );
};
