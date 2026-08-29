import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItem2Props {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutRoomUsercountItem2 = ({ captionRoomUsercount, layout }: NavigatorFrame2LayoutRoomUsercountItem2Props) => {
    return (
        <Region
            name="room_usercount"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomUsercount ?? '99'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
