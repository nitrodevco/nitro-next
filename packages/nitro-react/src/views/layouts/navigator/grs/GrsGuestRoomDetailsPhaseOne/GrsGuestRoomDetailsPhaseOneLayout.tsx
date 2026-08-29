import { BoxLayout, Region } from '#base/theme';

import { GrsGuestRoomDetailsPhaseOneLayoutDetails, GrsGuestRoomDetailsPhaseOneLayoutDetailsProps } from './GrsGuestRoomDetailsPhaseOneLayoutDetails';

/** Generated from `3001_grs_guest_room_details_phase_one_xml` (layout "grs_guest_room_details_phase_one", 346x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsPhaseOneLayoutProps {
    details?: GrsGuestRoomDetailsPhaseOneLayoutDetailsProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsPhaseOneLayout = ({ details, layout }: GrsGuestRoomDetailsPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 17, ...layout }}>
            <GrsGuestRoomDetailsPhaseOneLayoutDetails {...details} />
        </Region>
    );
};
