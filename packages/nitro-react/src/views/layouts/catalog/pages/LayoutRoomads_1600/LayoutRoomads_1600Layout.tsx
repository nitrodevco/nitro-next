import { BoxLayout, Region } from '#base/theme';

import { LayoutRoomads_1600LayoutRoomads, LayoutRoomads_1600LayoutRoomadsProps } from './LayoutRoomads_1600LayoutRoomads';

/** Generated from `1600_layout_roomads_xml` (layout "ctlg_roomads", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRoomads_1600LayoutProps {
    layout?: BoxLayout;
    roomads?: LayoutRoomads_1600LayoutRoomadsProps;
}

export const LayoutRoomads_1600Layout = ({ layout, roomads }: LayoutRoomads_1600LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRoomads_1600LayoutRoomads {...roomads} />
        </Region>
    );
};
