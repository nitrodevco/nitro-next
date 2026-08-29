import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `room_usercount_icon` of RoomUsercountLayout - pass real rows through its `items…` slot. */
export interface RoomUsercountLayoutRoomUsercountIconItemProps {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
}

export const RoomUsercountLayoutRoomUsercountIconItem = ({ layout, srcRoomUsercountIcon }: RoomUsercountLayoutRoomUsercountIconItemProps) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};
