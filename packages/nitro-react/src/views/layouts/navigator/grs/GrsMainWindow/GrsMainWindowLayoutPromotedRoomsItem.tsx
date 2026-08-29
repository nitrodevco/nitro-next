import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `promoted_rooms` of GrsMainWindowLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowLayoutPromotedRoomsItemProps {
    layout?: BoxLayout;
    promotedRooms?: ReactNode;
}

export const GrsMainWindowLayoutPromotedRoomsItem = ({ layout, promotedRooms }: GrsMainWindowLayoutPromotedRoomsItemProps) => {
    return (
        <Region
            name="promoted_rooms"
            backgroundColor="#ffffff"
            layout={{ width: 278, height: 1, flexShrink: 0, ...layout }}
        >
            {promotedRooms}
        </Region>
    );
};
