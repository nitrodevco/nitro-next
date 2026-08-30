import { BoxLayout, Region, ThemeText } from '#base/theme';

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
                <ThemeText
                    text={captionTimeTxt ?? '15:14'}
                    name="time_txt"
                    layout={{ position: 'absolute', right: 44, width: 30, top: 0, bottom: 0 }}
                />
            )}
            {(visibleRoomNameTxt ?? true) && (
                <ThemeText
                    text={captionRoomNameTxt ?? 'Funky room'}
                    name="room_name_txt"
                    layout={{ position: 'absolute', left: 5, right: 73, top: 0, bottom: 0 }}
                />
            )}
            {(visibleViewRoomTxt ?? true) && (
                <ThemeText
                    text={captionViewRoomTxt ?? 'Enter'}
                    name="view_room_txt"
                    layout={{ position: 'absolute', right: 1, width: 39, top: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
