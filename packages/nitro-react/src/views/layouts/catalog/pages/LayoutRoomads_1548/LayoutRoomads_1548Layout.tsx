import { BoxLayout, Region } from '#base/theme';

import { LayoutRoomads_1548LayoutRoomads, LayoutRoomads_1548LayoutRoomadsProps } from './LayoutRoomads_1548LayoutRoomads';

/** Generated from `1548_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1548LayoutProps {
    layout?: BoxLayout;
    roomads?: LayoutRoomads_1548LayoutRoomadsProps;
}

export const LayoutRoomads_1548Layout = ({ layout, roomads }: LayoutRoomads_1548LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRoomads_1548LayoutRoomads {...roomads} />
        </Region>
    );
};
