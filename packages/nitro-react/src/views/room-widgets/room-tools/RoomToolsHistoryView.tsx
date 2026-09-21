import { Border, Region, ThemeText } from '#base/theme';

export interface RoomToolsHistoryEntry {
    roomId: number;
    roomName: string;
}

export interface RoomToolsHistoryViewProps {
    entries: RoomToolsHistoryEntry[];
    onSelect: (roomId: number) => void;
}

/** `RoomToolsHistory.PADDING` / `SPACING`, and the 152-wide `room_tools_history` panel. */
const PADDING = 5;
const SPACING = 2;
const WIDTH = 152;
const ITEM_HEIGHT = 24;

/**
 * The rooms visited this session, newest last, on the `room_tools_history` layout. Flash grew the
 * panel to whatever the list needed and left its nominal height behind, so the height here is the
 * same sum rather than the layout's 97.
 */
export const RoomToolsHistoryView = ({ entries, onSelect }: RoomToolsHistoryViewProps) => {
    const height = entries.length
        ? (PADDING * 2) + (entries.length * ITEM_HEIGHT) + ((entries.length - 1) * SPACING)
        : (PADDING * 2);

    return (
        <Border
            variant="2"
            tintColor="#24231e"
            blend={0.8}
            ownGraphicContext
            layout={{ width: WIDTH, height, padding: PADDING, flexDirection: 'column', gap: SPACING }}
        >
            {entries.map(entry => (
                <Region
                    key={entry.roomId}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={() => onSelect(entry.roomId)}
                    cursor="pointer"
                    layout={{ width: WIDTH - (PADDING * 2), height: ITEM_HEIGHT, flexShrink: 0 }}
                >
                    <ThemeText
                        text={entry.roomName}
                        textOptions={{ fill: '#ffffff' }}
                        dynamicRole="icon"
                        name="room_name"
                        layout={{ position: 'absolute', left: 3, right: 4, top: 3, bottom: 4 }}
                    />
                </Region>
            ))}
        </Border>
    );
};
