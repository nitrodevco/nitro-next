import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutSpacingItem2Props {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const PriceDisplayLayoutSpacingItem2 = ({ layout, spacing }: PriceDisplayLayoutSpacingItem2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 2, height: 1, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
