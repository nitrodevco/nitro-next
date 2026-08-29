import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `1125_userclassification_frame_xml` (layout "userclassification_frame", 292x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserclassificationFrameLayoutProps {
    itemsUserclassificationList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UserclassificationFrameLayout = ({ itemsUserclassificationList, layout, onClose }: UserclassificationFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="User Classifications"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 224, ...layout }}
        >
            <Region
                name="classifications_cont"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
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
                {/* <scrollbar_vertical> for userclassification_list - rendered by that list's ScrollArea */}
            </Region>
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
                {captionUserClassificationTxt ?? ''}
            </Region>
            <Region
                name="user_name_txt"
                layout={{ position: 'absolute', left: 5, right: 158, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionUserNameTxt ?? 'whatwasit'}
            </Region>
            <Region
                name="visit_room_txt"
                layout={{ position: 'absolute', right: 1, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionVisitRoomTxt ?? 'Visit'}
            </Region>
        </Region>
    );
};
