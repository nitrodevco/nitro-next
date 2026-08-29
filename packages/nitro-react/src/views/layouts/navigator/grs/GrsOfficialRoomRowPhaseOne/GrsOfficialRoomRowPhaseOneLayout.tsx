import { BoxLayout, Region } from '#base/theme';

import { GrsOfficialRoomRowPhaseOneLayoutCont, GrsOfficialRoomRowPhaseOneLayoutContProps } from './GrsOfficialRoomRowPhaseOneLayoutCont';

/** Generated from `3014_grs_official_room_row_phase_one_xml` (layout "grs_official_room_row_phase_one", 346x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowPhaseOneLayoutProps {
    cont?: GrsOfficialRoomRowPhaseOneLayoutContProps;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowPhaseOneLayout = ({ cont, layout }: GrsOfficialRoomRowPhaseOneLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 346, height: 68, ...layout }}>
            <GrsOfficialRoomRowPhaseOneLayoutCont {...cont} />
        </Region>
    );
};
