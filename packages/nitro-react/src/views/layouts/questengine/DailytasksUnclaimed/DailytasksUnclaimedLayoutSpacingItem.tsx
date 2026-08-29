import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of DailytasksUnclaimedLayout - pass real rows through its `items…` slot. */
export interface DailytasksUnclaimedLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const DailytasksUnclaimedLayoutSpacingItem = ({ layout, spacing }: DailytasksUnclaimedLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 452, height: 6, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
