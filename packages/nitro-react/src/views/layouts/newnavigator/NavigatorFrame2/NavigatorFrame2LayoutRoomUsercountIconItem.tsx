import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `room_usercount_icon` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountIconItemProps {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
}

export const NavigatorFrame2LayoutRoomUsercountIconItem = ({ layout, srcRoomUsercountIcon }: NavigatorFrame2LayoutRoomUsercountIconItemProps) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};
