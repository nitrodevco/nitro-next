import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `promoted_rooms` of GrsMainWindowNewLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowNewLayoutPromotedRoomsItemProps {
    layout?: BoxLayout;
    promotedRooms?: ReactNode;
}

export const GrsMainWindowNewLayoutPromotedRoomsItem = ({ layout, promotedRooms }: GrsMainWindowNewLayoutPromotedRoomsItemProps) => {
    return (
        <Region
            name="promoted_rooms"
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        >
            {promotedRooms}
        </Region>
    );
};
