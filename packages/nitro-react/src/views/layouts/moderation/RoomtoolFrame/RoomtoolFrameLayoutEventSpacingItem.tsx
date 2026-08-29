import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `event_spacing` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutEventSpacingItemProps {
    eventSpacing?: ReactNode;
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutEventSpacingItem = ({ eventSpacing, layout }: RoomtoolFrameLayoutEventSpacingItemProps) => {
    return (
        <Region
            name="event_spacing"
            layout={{ width: 230, height: 5, flexShrink: 0, ...layout }}
        >
            {eventSpacing}
        </Region>
    );
};
