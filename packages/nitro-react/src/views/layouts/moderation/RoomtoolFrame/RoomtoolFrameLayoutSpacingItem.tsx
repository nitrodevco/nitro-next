import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutSpacingItemProps {
    layout?: BoxLayout;
    spacing?: ReactNode;
}

export const RoomtoolFrameLayoutSpacingItem = ({ layout, spacing }: RoomtoolFrameLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        >
            {spacing}
        </Region>
    );
};
