import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

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
            layout={{ width: 292, height: 224, ...layout }}
        >
            <Region
                name="visits_cont"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32 }}
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

/** Row template `visitrow` of RoomvisitsFrameLayout - pass real rows through its `items…` slot. */
export interface RoomvisitsFrameLayoutVisitrowItemProps {
    captionRoomNameTxt?: string;
    captionTimeTxt?: string;
    captionViewRoomTxt?: string;
    layout?: BoxLayout;
}

export const RoomvisitsFrameLayoutVisitrowItem = ({ captionRoomNameTxt, captionTimeTxt, captionViewRoomTxt, layout }: RoomvisitsFrameLayoutVisitrowItemProps) => {
    return (
        <Region
            name="visitrow"
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            <Region
                name="time_txt"
                layout={{ position: 'absolute', right: 44, width: 30, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTimeTxt ?? '15:14'}
            </Region>
            <Region
                name="room_name_txt"
                layout={{ position: 'absolute', left: 5, right: 73, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionRoomNameTxt ?? 'Funky room'}
            </Region>
            <Region
                name="view_room_txt"
                layout={{ position: 'absolute', right: 1, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionViewRoomTxt ?? 'Enter'}
            </Region>
        </Region>
    );
};
