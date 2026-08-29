import { BoxLayout, Bubble, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutMainContent, RoomInfoPopupBubbleLayoutMainContentProps } from './RoomInfoPopupBubbleLayoutMainContent';

/** Generated from `141_room_info_popup_bubble_xml` (layout "room_info_popup_bubble", 374x350) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomInfoPopupBubbleLayoutProps {
    layout?: BoxLayout;
    mainContent?: RoomInfoPopupBubbleLayoutMainContentProps;
}

export const RoomInfoPopupBubbleLayout = ({ layout, mainContent }: RoomInfoPopupBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 374, height: 350, ...layout }}>
            <Bubble
                variant="7"
                pointer="left"
                layout={{ position: 'absolute', left: 0, width: 374, top: 0, height: 350 }}
            >
                <RoomInfoPopupBubbleLayoutMainContent {...mainContent} />
            </Bubble>
        </Region>
    );
};
