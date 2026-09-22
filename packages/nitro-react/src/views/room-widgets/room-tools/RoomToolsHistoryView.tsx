import { Border, Region, ThemeText } from '#base/theme';

export interface RoomToolsHistoryEntry {
    roomId: number;
    roomName: string;
}

export interface RoomToolsHistoryViewProps {
    entries: RoomToolsHistoryEntry[];
    onSelect: (roomId: number) => void;
}

/** `RoomToolsHistory.populate`: items at x 5, the first at y 5, each 2 under the last. */
const PADDING = 5;
const SPACING = 2;
/** The `room_tools_history` panel's width, and the `room_tools_history_item` row (169x24). */
const WIDTH = 152;
const ITEM_WIDTH = 169;
const ITEM_HEIGHT = 24;

/**
 * The rooms visited this session, newest last, on the `room_tools_history` layout with one
 * `room_tools_history_item` per room. `RoomToolsHistory.populate` places the rows itself and sets
 * the panel's height to the last row's bottom plus `2 * 5`, leaving the layout's nominal 97
 * behind. The rows are wider than the panel (169 against 152) and are cut at its edge.
 */
export const RoomToolsHistoryView = ({ entries, onSelect }: RoomToolsHistoryViewProps) => {
    const listBottom = entries.length
        ? PADDING + (entries.length * ITEM_HEIGHT) + ((entries.length - 1) * SPACING)
        : 0;

    return (
        <Border
            variant="2"
            tintColor="#24231e"
            blend={0.8}
            ownGraphicContext
            layout={{ width: WIDTH, height: listBottom + (2 * PADDING), overflow: 'hidden' }}
        >
            {entries.map((entry, index) => (
                <Region
                    key={entry.roomId}
                    dynamicStyle="brightness_and_shadow_under"
                    onPointerTap={() => onSelect(entry.roomId)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: PADDING, top: PADDING + (index * (ITEM_HEIGHT + SPACING)), width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                >
                    <ThemeText
                        text={entry.roomName}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff' }}
                        dynamicRole="icon"
                        name="room_name"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 3, top: 3 }}
                    />
                </Region>
            ))}
        </Border>
    );
};
