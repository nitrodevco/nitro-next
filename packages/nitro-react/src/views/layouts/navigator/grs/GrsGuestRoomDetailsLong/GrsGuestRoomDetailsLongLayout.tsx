import { Border, BoxLayout, Region } from '#base/theme';

import { GrsGuestRoomDetailsLongLayoutDetailsContainer, GrsGuestRoomDetailsLongLayoutDetailsContainerProps } from './GrsGuestRoomDetailsLongLayoutDetailsContainer';

/** Generated from `2997_grs_guest_room_details_long_xml` (layout "navigator_guest_room_details_long", 253x351) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsGuestRoomDetailsLongLayoutProps {
    detailsContainer?: GrsGuestRoomDetailsLongLayoutDetailsContainerProps;
    layout?: BoxLayout;
}

export const GrsGuestRoomDetailsLongLayout = ({ detailsContainer, layout }: GrsGuestRoomDetailsLongLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 253, height: 351, ...layout }}>
            <Border
                variant="0"
                name="room_popup_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <GrsGuestRoomDetailsLongLayoutDetailsContainer {...detailsContainer} />
            </Border>
        </Region>
    );
};
