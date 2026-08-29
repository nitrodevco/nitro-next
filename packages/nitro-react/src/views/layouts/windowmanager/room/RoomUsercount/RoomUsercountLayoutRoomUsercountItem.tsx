import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_usercount` of RoomUsercountLayout - pass real rows through its `items…` slot. */
export interface RoomUsercountLayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const RoomUsercountLayoutRoomUsercountItem = ({ captionRoomUsercount, layout }: RoomUsercountLayoutRoomUsercountItemProps) => {
    return (
        <Region
            name="room_usercount"
            layout={{ width: 17, alignSelf: 'stretch', flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomUsercount ?? '99'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
