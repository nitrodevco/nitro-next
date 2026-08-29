import { BoxLayout, Region } from '#base/theme';

import { GrsGuestRoomDetailsShortLayoutDetails, GrsGuestRoomDetailsShortLayoutDetailsProps } from './GrsGuestRoomDetailsShortLayoutDetails';

/** Generated from `3025_grs_guest_room_details_short_xml` (layout "navigator_guest_room_details_short", 271x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsShortLayoutProps {
    details?: GrsGuestRoomDetailsShortLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsShortLayout = ({ details, layout }: GrsGuestRoomDetailsShortLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 17, ...layout }}>
            <GrsGuestRoomDetailsShortLayoutDetails {...details} />
        </Region>
    );
};
