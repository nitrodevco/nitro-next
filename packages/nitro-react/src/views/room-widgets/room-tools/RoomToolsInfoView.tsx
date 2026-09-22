import { useState } from 'react';

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

/** `RoomToolsInfoCtrl.onWindowEvent`: a tag's text colour under the pointer (4696294) and off it (1800619). */
const TAG_COLOR_HOVER = '#47a8e6';
const TAG_COLOR = '#1b79ab';

const trimTag = (tag: string) => ((tag.length > MAX_TAG_LENGTH) ? `${tag.substring(0, MAX_TAG_LENGTH)}...` : tag);

/**
 * The card that slides in beside the tool column when a room is entered, on the
 * `room_tools_info` layout (255x77 as drawn in the editor) that `RoomToolsInfoCtrl.showRoomInfo`
 * fills: the room's name, who owns it, and the first two of its tags, each a `tag<n>_border` chip
 * fitted to its text. Flash slid it away again after `room.enter.info.collapse.delay`; the widget
 * owns that timer, so this only draws the card it is given.
 *
 * The card is as wide as what it says. `room_name`, `room_owner` and the `tags` list size to their
 * text (`auto_size`, `margin_right` 10, `width_max` 300 / 230), each reflects its width up
 * (`reflect_horizontal_resize_to_parent`), and `owner_name_and_tags` and `window_bg` accommodate
 * their children (`resize_to_accommodate_children`, `width_max` 320): the background ends at the
 * right edge of the wider of the name and the owner block, 10 in from its left, and is 77 high -
 * the owner block's bottom. The owner's line ends in `...` once it outgrows its 300
 * (`overflow_replace`). The name and the owner block keep their layout y (6 and 33).
 */
export const RoomToolsInfoView = ({ roomName, ownerLine, tags, left, onSelectTag, onPress }: RoomToolsInfoViewProps) => {
    const [ hoveredTag, setHoveredTag ] = useState(-1);

    return (
        <Box layout={{ position: 'absolute', left, bottom: ROOM_TOOLS_BOTTOM, height: 77, flexDirection: 'row' }}>
            <Region
                onPointerTap={onPress}
                cursor="pointer"
                layout={{ height: 77, maxWidth: 320, flexDirection: 'row', flexShrink: 0 }}
            >
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ height: 77, maxWidth: 320, flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}
                >
                    {/* `room_name` at 10,6; `owner_name_and_tags` at 10,33. */}
                    <Box layout={{ marginLeft: 10, marginTop: 6, height: 27, flexDirection: 'row', alignItems: 'flex-start', flexShrink: 0 }}>
                        <Region
                            name="room_name"
                            layout={{ minWidth: 60, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 10, overflow: 'hidden' }}
                        >
                            <ThemeText
                                text={roomName}
                                textStyle="ubuntu_condensed_title"
                                verticalAlign="top"
                            />
                        </Region>
                    </Box>
                    <Region
                        name="owner_name_and_tags"
                        layout={{ marginLeft: 10, height: 44, maxWidth: 300, flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}
                    >
                        <Box layout={{ height: 25, flexDirection: 'row', alignItems: 'flex-start', flexShrink: 0 }}>
                            <Region
                                name="room_owner"
                                layout={{ maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 10 }}
                            >
                                <ThemeText
                                    text={ownerLine}
                                    textStyle="u_headline_medium"
                                    textOptions={{ fill: '#999999' }}
                                    overflowReplace={{ replace: '...', width: 290, height: 21, marginX: 10, marginY: 0 }}
                                    verticalAlign="top"
                                />
                            </Region>
                        </Box>
                        <Region
                            name="tags"
                            layout={{ height: 19, maxWidth: 230, flexDirection: 'row', alignItems: 'flex-start', gap: 4, flexShrink: 0 }}
                        >
                            {tags.slice(0, 2).map((tag, index) => (
                                <Border
                                    key={tag}
                                    variant="3"
                                    name={`tag${index + 1}_border`}
                                    tintColor="#1c2935"
                                    layout={{ height: 13, marginTop: -1, flexShrink: 0, overflow: 'hidden', flexDirection: 'row' }}
                                >
                                    <Region
                                        name={`tag${index + 1}_region`}
                                        onPointerTap={() => onSelectTag(tag)}
                                        onPointerOver={() => setHoveredTag(index)}
                                        onPointerOut={() => setHoveredTag(-1)}
                                        cursor="pointer"
                                        layout={{ marginLeft: 1, marginTop: -1, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={`#${trimTag(tag)}`}
                                            textStyle="u_regular"
                                            textOptions={{ fill: (hoveredTag === index) ? TAG_COLOR_HOVER : TAG_COLOR, fontSize: 10 }}
                                            flashFormat={{ gridFitType: 'subpixel' }}
                                            name={`tag${index + 1}`}
                                            verticalAlign="top"
                                        />
                                    </Region>
                                </Border>
                            ))}
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Box>
    );
};
