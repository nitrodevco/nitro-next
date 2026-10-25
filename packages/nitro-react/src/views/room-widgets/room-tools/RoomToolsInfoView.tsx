/**
 * The card that slides in beside the tool column when a room is entered - Flash `RoomToolsInfoCtrl`,
 * on `habbo-room-ui-com`'s `room_tools_info` layout, filled by `showRoomInfo`: `room_name`, `room_owner`
 * (the owner's line, worded by the widget), and the first two tags in `tag1` / `tag2` as `#` and the tag
 * cut to 16 characters (`trimTag`), each `tagN_border` shown only when there is such a tag. The layout's
 * flags fit the card to its texts (`auto_size`, `reflect_horizontal_resize_to_parent`,
 * `resize_to_accommodate_children`, `width_max` 320).
 *
 * `onWindowEvent` is the window's procedure, so it hears its children's events too: a click anywhere
 * on the card puts it away (`setCollapsed(true)`), and a click on a tag region searches for the tag as
 * well; the pointer over a tag region colours its text `TAG_COLOR_HOVER`, off it `TAG_COLOR`. Flash slid
 * it away again after `room.enter.info.collapse.delay`; the widget owns that timer.
 *
 * `setCollapsed` slides it rather than showing and hiding it: out from behind its own left edge
 * (`-_window.width` from its place) to where it sits, and back, over 100 ms at a constant rate
 * (`Queue(EaseOut(MoveTo(_window, 100, x, y), 1), Callback(motionComplete))`), and `motionComplete`
 * hides it once it is away. The slide is `left` as a percentage of the card's own width - the outer
 * box is as wide as the card - so no measuring is needed.
 */
import { useState } from 'react';

import { motionEaseOutRate1, useTween } from '#base/hooks';
import { Box, TemplateWindow } from '#base/theme';

import { ROOM_TOOLS_BOTTOM } from './roomToolsGeometry';

export interface RoomToolsInfoViewProps {
    roomName: string;
    /** Already worded by the caller: the owner's name, or that this is a public room. */
    ownerLine: string;
    /** At most the first two are shown, as the layout has room for two. */
    tags: string[];
    /** Where the card starts, measured from the left edge: clear of the tool column. */
    left: number;
    /** Shown or put away; the card slides between the two and draws nothing once it is away. */
    open: boolean;
    onSelectTag: (tag: string) => void;
    onPress: () => void;
}

const INFO_TEMPLATE = 'habbo-room-ui-com/room_tools_info_xml';

/** `trimTag`: a longer tag is cut. */
const MAX_TAG_LENGTH = 16;

/** `RoomToolsInfoCtrl.TAG_COLOR_HOVER` / `TAG_COLOR`. */
const TAG_COLOR_HOVER = 4696294;
const TAG_COLOR = 1800619;

/** `setCollapsed`: `MoveTo(_window, 100, ...)`. */
const SLIDE_DURATION_MS = 100;
// `EaseOut(..., 1)` is `motionEaseOutRate1`: a rate of 1, so the slide is linear.

const trimTag = (tag: string) => ((tag.length > MAX_TAG_LENGTH) ? `${tag.substring(0, MAX_TAG_LENGTH)}...` : tag);

export const RoomToolsInfoView = ({ roomName, ownerLine, tags, left, open, onSelectTag, onPress }: RoomToolsInfoViewProps) => {
    const [ hoveredTag, setHoveredTag ] = useState(-1);
    // `showRoomInfo` places the card away (`updatePosition` while collapsed) before sliding it in, so it mounts away.
    const shown = useTween(open ? 1 : 0, SLIDE_DURATION_MS, motionEaseOutRate1, 0);

    if (!open && (shown === 0)) return null;

    const tagBindings = (index: number) => {
        const tag = tags[index];
        const name = `tag${index + 1}`;

        return {
            [`${name}_border`]: { visible: tag !== undefined },
            [name]: { caption: (tag !== undefined) ? `#${trimTag(tag)}` : '', color: (hoveredTag === index) ? TAG_COLOR_HOVER : TAG_COLOR },
            [`${name}_region`]: {
                onPointerTap: () => tag !== undefined && onSelectTag(tag),
                onPointerOver: () => setHoveredTag(index),
                onPointerOut: () => setHoveredTag(current => ((current === index) ? -1 : current)),
            },
        };
    };

    return (
        <Box layout={{ position: 'absolute', left, bottom: ROOM_TOOLS_BOTTOM, flexDirection: 'row' }}>
            <Box layout={{ position: 'relative', left: `${(shown - 1) * 100}%`, flexShrink: 0 }}>
                <TemplateWindow
                    id={INFO_TEMPLATE}
                    bindings={{
                        '': { onPointerTap: onPress },
                        room_name: { caption: roomName },
                        room_owner: { caption: ownerLine },
                        ...tagBindings(0),
                        ...tagBindings(1),
                    }}
                />
            </Box>
        </Box>
    );
};
