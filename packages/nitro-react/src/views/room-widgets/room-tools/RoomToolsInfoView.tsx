import { Border, Box, Region, ThemeText } from '#base/theme';

import { ROOM_TOOLS_BOTTOM } from './roomToolsGeometry';

export interface RoomToolsInfoViewProps {
    roomName: string;
    /** Already worded by the caller: the owner's name, or that this is a public room. */
    ownerLine: string;
    /** At most the first two are shown, as the layout has room for two chips. */
    tags: string[];
    /** Where the card starts, measured from the left edge: clear of the tool column. */
    left: number;
    onSelectTag: (tag: string) => void;
    onPress: () => void;
}

/** `trimTag` - a long tag is cut rather than allowed to push the chip out of the card. */
const MAX_TAG_LENGTH = 16;

const trimTag = (tag: string) => ((tag.length > MAX_TAG_LENGTH) ? `${tag.substring(0, MAX_TAG_LENGTH)}...` : tag);

/**
 * The card that slides in beside the tool column when a room is entered, on the
 * `room_tools_info` layout (255x77): the room's name, who owns it, and the first two of its tags.
 * Flash slid it away again after `room.enter.info.collapse.delay`; the widget owns that timer, so
 * this only draws the card it is given.
 */
export const RoomToolsInfoView = ({ roomName, ownerLine, tags, left, onSelectTag, onPress }: RoomToolsInfoViewProps) => (
    <Box layout={{ position: 'absolute', left, bottom: ROOM_TOOLS_BOTTOM, width: 255, height: 77 }}>
        <Border
            variant="2"
            name="window_bg"
            tintColor="#24231e"
            blend={0.8}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 320 }}
        >
            <Region
                onPointerTap={onPress}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={roomName}
                    textStyle="text-style-ubuntu-condensed-title"
                    name="room_name"
                    layout={{ position: 'absolute', left: 10, top: 6, height: 24, minWidth: 60, maxWidth: 300 }}
                />
                <Region
                    name="owner_name_and_tags"
                    layout={{ position: 'absolute', left: 10, width: 236, top: 33, height: 44, maxWidth: 300 }}
                >
                    <ThemeText
                        text={ownerLine}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#999999' }}
                        name="room_owner"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 21, maxWidth: 300 }}
                    />
                    <Region
                        name="tags"
                        layout={{ position: 'absolute', left: 0, top: 25, maxWidth: 230, flexDirection: 'row', gap: 4 }}
                    >
                        {tags.slice(0, 2).map(tag => (
                            <Border
                                key={tag}
                                variant="3"
                                tintColor="#1c2935"
                                layout={{ height: 13, flexShrink: 0 }}
                            >
                                <Region
                                    onPointerTap={() => onSelectTag(tag)}
                                    cursor="pointer"
                                    layout={{ paddingLeft: 3, paddingRight: 3, height: 15, marginTop: -1, flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <ThemeText
                                        text={`#${trimTag(tag)}`}
                                        textOptions={{ fill: '#1b79ab' }}
                                    />
                                </Region>
                            </Border>
                        ))}
                    </Region>
                </Region>
            </Region>
        </Border>
    </Box>
);
