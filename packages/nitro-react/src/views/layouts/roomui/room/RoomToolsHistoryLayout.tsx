import { Border, BoxLayout, Region } from '#base/theme';

/** Generated from `924_room_tools_history_xml` (layout "room_tools_history", 152x97) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsHistoryLayoutProps {
    layout?: BoxLayout;
}

export const RoomToolsHistoryLayout = ({ layout }: RoomToolsHistoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 152, height: 97, ...layout }}>
            <Border
                variant="2"
                tintColor="#24231e"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
