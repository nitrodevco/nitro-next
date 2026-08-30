import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `room_usercount` of RoomUsercountLayout - pass real rows through its `items…` slot. */
export interface RoomUsercountLayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const RoomUsercountLayoutRoomUsercountItem = ({ captionRoomUsercount, layout }: RoomUsercountLayoutRoomUsercountItemProps) => {
    return (
        <ThemeText
            text={captionRoomUsercount ?? '99'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#ffffff' }}
            name="room_usercount"
            layout={{ width: 17, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
