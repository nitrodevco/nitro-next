import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutRoomUsercountItem = ({ captionRoomUsercount, layout }: NavigatorFrame2LayoutRoomUsercountItemProps) => {
    return (
        <ThemeText
            text={captionRoomUsercount ?? '99'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#ffffff' }}
            name="room_usercount"
            layout={{ width: 17, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
