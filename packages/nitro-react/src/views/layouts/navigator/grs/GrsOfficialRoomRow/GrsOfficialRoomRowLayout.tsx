import { BoxLayout, Region } from '#base/theme';

import { GrsOfficialRoomRowLayoutCont, GrsOfficialRoomRowLayoutContProps } from './GrsOfficialRoomRowLayoutCont';

/** Generated from `3084_grs_official_room_row_xml` (layout "grs_official_room_row", 271x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsOfficialRoomRowLayoutProps {
    cont?: GrsOfficialRoomRowLayoutContProps;
    layout?: BoxLayout;
}

export const GrsOfficialRoomRowLayout = ({ cont, layout }: GrsOfficialRoomRowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 271, height: 68, ...layout }}>
            <GrsOfficialRoomRowLayoutCont {...cont} />
        </Region>
    );
};
