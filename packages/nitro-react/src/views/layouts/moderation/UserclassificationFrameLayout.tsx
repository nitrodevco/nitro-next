import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

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
            params={98305}
            caption="User Classifications"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 224, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="classifications_cont"
                    params={2192}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 192 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 263, top: 0, height: 192 }}
                    >
                        <Region
                            name="userclassification_list"
                            params={2193}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsUserclassificationList ?? (
                                <UserclassificationFrameLayoutClassificationrowItem />
                            )}
                        </Region>
                    </ScrollArea>
                    {/* <scrollbar_vertical> for userclassification_list - rendered by that list's ScrollArea */}
                </Region>
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
            params={144}
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            <Region
                name="user_classification_txt"
                params={80}
                layout={{ position: 'absolute', left: 110, width: 105, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserClassificationTxt ?? ''} />
            </Region>
            <Region
                name="user_name_txt"
                params={145}
                layout={{ position: 'absolute', left: 5, width: 100, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserNameTxt ?? 'whatwasit'} />
            </Region>
            <Region
                name="visit_room_txt"
                params={81}
                layout={{ position: 'absolute', left: 223, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionVisitRoomTxt ?? 'Visit'} />
            </Region>
        </Region>
    );
};
