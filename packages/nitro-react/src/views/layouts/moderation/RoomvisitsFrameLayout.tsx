import { ReactNode } from 'react';

import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

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
            params={98305}
            caption="Room visits"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 292, height: 224, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="visits_cont"
                    params={2192}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 192 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 263, top: 0, height: 192 }}
                    >
                        <Region
                            name="visits_list"
                            params={2193}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsVisitsList ?? (
                                <RoomvisitsFrameLayoutVisitrowItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Region>
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
            params={144}
            layout={{ width: 263, height: 14, flexShrink: 0, ...layout }}
        >
            <Region
                name="time_txt"
                params={80}
                layout={{ position: 'absolute', left: 189, width: 30, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTimeTxt ?? '15:14'} />
            </Region>
            <Region
                name="room_name_txt"
                params={145}
                layout={{ position: 'absolute', left: 5, width: 185, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomNameTxt ?? 'Funky room'} />
            </Region>
            <Region
                name="view_room_txt"
                params={81}
                layout={{ position: 'absolute', left: 223, width: 39, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionViewRoomTxt ?? 'Enter'} />
            </Region>
        </Region>
    );
};
