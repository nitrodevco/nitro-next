import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { RoomToolsInfoLayoutOwnerNameAndTags, RoomToolsInfoLayoutOwnerNameAndTagsProps } from './RoomToolsInfoLayoutOwnerNameAndTags';

/** Generated from `874_room_tools_info_xml` (layout "room_tools_info", 255x77) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsInfoLayoutProps {
    captionRoomName?: string;
    layout?: BoxLayout;
    ownerNameAndTags?: RoomToolsInfoLayoutOwnerNameAndTagsProps;
}

export const RoomToolsInfoLayout = ({ captionRoomName, layout, ownerNameAndTags }: RoomToolsInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 255, height: 77, ...layout }}>
            <Region layout={{ position: 'absolute', left: -1, width: 255, top: 0, bottom: 0, maxWidth: 320 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 320 }}
                >
                    <Region
                        name="room_name"
                        layout={{ position: 'absolute', left: 10, top: 6, height: 24, minWidth: 60, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomName ?? '...'}
                            textStyle="text-style-ubuntu-condensed-title"
                        />
                    </Region>
                    <RoomToolsInfoLayoutOwnerNameAndTags {...ownerNameAndTags} />
                </Border>
            </Region>
        </Region>
    );
};
