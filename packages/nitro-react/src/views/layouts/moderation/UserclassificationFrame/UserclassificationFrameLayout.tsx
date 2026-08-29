import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

import { UserclassificationFrameLayoutClassificationrowItem } from './UserclassificationFrameLayoutClassificationrowItem';

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
