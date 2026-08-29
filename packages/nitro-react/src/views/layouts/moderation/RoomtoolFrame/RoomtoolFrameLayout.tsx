import { BoxLayout, Frame } from '#base/theme';

import { RoomtoolFrameLayoutListCont, RoomtoolFrameLayoutListContProps } from './RoomtoolFrameLayoutListCont';

/** Generated from `1113_roomtool_frame_xml` (layout "roomtool_frame", 240x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomtoolFrameLayoutProps {
    layout?: BoxLayout;
    listCont?: RoomtoolFrameLayoutListContProps;
    onClose?: () => void;
}

export const RoomtoolFrameLayout = ({ layout, listCont, onClose }: RoomtoolFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Room Info"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 240, height: 437, ...layout }}
        >
            <RoomtoolFrameLayoutListCont {...listCont} />
        </Frame>
    );
};
