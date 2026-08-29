import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of PriceDisplayLayout - pass real rows through its `items…` slot. */
export interface PriceDisplayLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const PriceDisplayLayoutSpacingItem = ({ layout, spacing }: PriceDisplayLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 1, height: 1, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
