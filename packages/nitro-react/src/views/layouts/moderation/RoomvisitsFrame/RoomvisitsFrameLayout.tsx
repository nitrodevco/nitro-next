import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

import { RoomvisitsFrameLayoutVisitrowItem } from './RoomvisitsFrameLayoutVisitrowItem';

/** Generated from `1117_roomvisits_frame_xml` (layout "roomvisits_frame", 292x224) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomvisitsFrameLayoutProps {
    itemsVisitsList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const RoomvisitsFrameLayout = ({ itemsVisitsList, layout, onClose }: RoomvisitsFrameLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Room visits"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 224, minWidth: 150, minHeight: 100, ...layout }}
        >
            <Region
                name="visits_cont"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="visits_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsVisitsList ?? (
                            <RoomvisitsFrameLayoutVisitrowItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for visits_list - rendered by that list's ScrollArea */}
            </Region>
        </Frame>
    );
};
