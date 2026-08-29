import { BoxLayout, Region } from '#base/theme';

/** Row template `classificationrow` of UserclassificationFrameLayout - pass real rows through its `items…` slot. */
export interface UserclassificationFrameLayoutClassificationrowItemProps {
    captionUserClassificationTxt?: string;
    captionUserNameTxt?: string;
    captionVisitRoomTxt?: string;
    layout?: BoxLayout;
    visibleUserClassificationTxt?: boolean;
    visibleUserNameTxt?: boolean;
    visibleVisitRoomTxt?: boolean;
}

export const UserclassificationFrameLayoutClassificationrowItem = ({ captionUserClassificationTxt, captionUserNameTxt, captionVisitRoomTxt, layout, visibleUserClassificationTxt, visibleUserNameTxt, visibleVisitRoomTxt }: UserclassificationFrameLayoutClassificationrowItemProps) => {
    return (
        <Region
            name="classificationrow"
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            {(visibleUserClassificationTxt ?? true) && (
                <Region
                    name="user_classification_txt"
                    layout={{ position: 'absolute', right: 48, width: 105, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionUserClassificationTxt ?? ''}
                </Region>
            )}
            {(visibleUserNameTxt ?? true) && (
                <Region
                    name="user_name_txt"
                    layout={{ position: 'absolute', left: 5, right: 158, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionUserNameTxt ?? 'whatwasit'}
                </Region>
            )}
            {(visibleVisitRoomTxt ?? true) && (
                <Region
                    name="visit_room_txt"
                    layout={{ position: 'absolute', right: 1, width: 39, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionVisitRoomTxt ?? 'Visit'}
                </Region>
            )}
        </Region>
    );
};
