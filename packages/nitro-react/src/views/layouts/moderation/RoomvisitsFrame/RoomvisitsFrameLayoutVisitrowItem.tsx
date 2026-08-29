import { BoxLayout, Region } from '#base/theme';

/** Row template `visitrow` of RoomvisitsFrameLayout - pass real rows through its `items…` slot. */
export interface RoomvisitsFrameLayoutVisitrowItemProps {
    captionRoomNameTxt?: string;
    captionTimeTxt?: string;
    captionViewRoomTxt?: string;
    layout?: BoxLayout;
    visibleRoomNameTxt?: boolean;
    visibleTimeTxt?: boolean;
    visibleViewRoomTxt?: boolean;
}

export const RoomvisitsFrameLayoutVisitrowItem = ({ captionRoomNameTxt, captionTimeTxt, captionViewRoomTxt, layout, visibleRoomNameTxt, visibleTimeTxt, visibleViewRoomTxt }: RoomvisitsFrameLayoutVisitrowItemProps) => {
    return (
        <Region
            name="visitrow"
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            {(visibleTimeTxt ?? true) && (
                <Region
                    name="time_txt"
                    layout={{ position: 'absolute', right: 44, width: 30, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTimeTxt ?? '15:14'}
                </Region>
            )}
            {(visibleRoomNameTxt ?? true) && (
                <Region
                    name="room_name_txt"
                    layout={{ position: 'absolute', left: 5, right: 73, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionRoomNameTxt ?? 'Funky room'}
                </Region>
            )}
            {(visibleViewRoomTxt ?? true) && (
                <Region
                    name="view_room_txt"
                    layout={{ position: 'absolute', right: 1, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionViewRoomTxt ?? 'Enter'}
                </Region>
            )}
        </Region>
    );
};
