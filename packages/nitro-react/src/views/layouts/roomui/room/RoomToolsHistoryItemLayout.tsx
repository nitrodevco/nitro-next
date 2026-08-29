import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `932_room_tools_history_item_xml` (layout "history_item", 169x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsHistoryItemLayoutProps {
    captionRoomName?: string;
    layout?: BoxLayout;
}

export const RoomToolsHistoryItemLayout = ({ captionRoomName, layout }: RoomToolsHistoryItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 169, height: 24, ...layout }}>
            <Region
                dynamicStyle="brightness_and_shadow_under"
                layout={{ position: 'absolute', left: 0, width: 169, top: 0, height: 24 }}
            >
                <Region
                    name="room_name"
                    layout={{ position: 'absolute', left: 3, width: 145, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomName ?? 'the greatest room on earth'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
