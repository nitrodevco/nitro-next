import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1125_userclassification_frame_xml` (layout "userclassification_frame", 292x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserclassificationFrameLayoutProps {
    classificationsCont?: UserclassificationFrameLayoutClassificationsContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UserclassificationFrameLayout = ({ classificationsCont, layout, onClose }: UserclassificationFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="User Classifications"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 224, ...layout }}
        >
            <UserclassificationFrameLayoutClassificationsCont {...classificationsCont} />
        </Frame>
    );
};

/** Row template `classificationrow` of UserclassificationFrameLayout - pass real rows through its `items…` slot. */
export interface UserclassificationFrameLayoutClassificationrowItemProps {
    captionUserClassificationTxt?: string;
    captionUserNameTxt?: string;
    captionVisitRoomTxt?: string;
    layout?: BoxLayout;
}

export const UserclassificationFrameLayoutClassificationrowItem = ({ captionUserClassificationTxt, captionUserNameTxt, captionVisitRoomTxt, layout }: UserclassificationFrameLayoutClassificationrowItemProps) => {
    return (
        <Region
            name="classificationrow"
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_classification_txt"
                layout={{ position: 'absolute', right: 48, width: 105, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserClassificationTxt ?? ''} />
            </Region>
            <Region
                name="user_name_txt"
                layout={{ position: 'absolute', left: 5, right: 158, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserNameTxt ?? 'whatwasit'} />
            </Region>
            <Region
                name="visit_room_txt"
                layout={{ position: 'absolute', right: 1, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionVisitRoomTxt ?? 'Visit'} />
            </Region>
        </Region>
    );
};

/** Named region `userclassification_list` of UserclassificationFrameLayout - configured through the parent's `userclassificationList` prop. */
export interface UserclassificationFrameLayoutUserclassificationListProps {
    itemsUserclassificationList?: ReactNode;
    layout?: BoxLayout;
}

export const UserclassificationFrameLayoutUserclassificationList = ({ itemsUserclassificationList, layout }: UserclassificationFrameLayoutUserclassificationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="userclassification_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsUserclassificationList ?? (
                    <UserclassificationFrameLayoutClassificationrowItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `classifications_cont` of UserclassificationFrameLayout - configured through the parent's `classificationsCont` prop. */
export interface UserclassificationFrameLayoutClassificationsContProps {
    layout?: BoxLayout;
    userclassificationList?: UserclassificationFrameLayoutUserclassificationListProps;
}

export const UserclassificationFrameLayoutClassificationsCont = ({ layout, userclassificationList }: UserclassificationFrameLayoutClassificationsContProps) => {
    return (
        <Region
            name="classifications_cont"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32, ...layout }}
        >
            <UserclassificationFrameLayoutUserclassificationList {...userclassificationList} />
            {/* <scrollbar_vertical> for userclassification_list - rendered by that list's ScrollArea */}
        </Region>
    );
};
