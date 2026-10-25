import { useViewportSize } from '#base/hooks';
import { Box, Tooltip } from '#base/theme';

/**
 * The `room_ad_tooltip` window `RoomDesktop.handleRoomAdTooltip` builds over a furni with an ad
 * on it: a tool tip (window type 8, style 0) carrying the text, centred on the desktop
 * (`center()`) rather than on the furni, and never a mouse target - the room under it keeps its
 * clicks.
 */
export interface RoomAdTooltipViewProps {
    text: string;
}

export const RoomAdTooltipView = ({ text }: RoomAdTooltipViewProps) => {
    const { width, height } = useViewportSize();

    return (
        <Box
            eventMode="none"
            pointerTransparent
            layout={{ position: 'absolute', left: 0, top: 0, width, height, justifyContent: 'center', alignItems: 'center' }}
        >
            <Tooltip layout={{ flex: 0 }}>{text}</Tooltip>
        </Box>
    );
};
