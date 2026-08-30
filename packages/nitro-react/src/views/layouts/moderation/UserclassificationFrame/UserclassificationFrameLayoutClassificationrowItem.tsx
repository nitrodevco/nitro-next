import { BoxLayout, Region, ThemeText } from '#base/theme';

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
                <ThemeText
                    text={captionUserClassificationTxt ?? ''}
                    name="user_classification_txt"
                    layout={{ position: 'absolute', right: 48, width: 105, top: 0, bottom: 0 }}
                />
            )}
            {(visibleUserNameTxt ?? true) && (
                <ThemeText
                    text={captionUserNameTxt ?? 'whatwasit'}
                    name="user_name_txt"
                    layout={{ position: 'absolute', left: 5, right: 158, top: 0, bottom: 0 }}
                />
            )}
            {(visibleVisitRoomTxt ?? true) && (
                <ThemeText
                    text={captionVisitRoomTxt ?? 'Visit'}
                    name="visit_room_txt"
                    layout={{ position: 'absolute', right: 1, width: 39, top: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
