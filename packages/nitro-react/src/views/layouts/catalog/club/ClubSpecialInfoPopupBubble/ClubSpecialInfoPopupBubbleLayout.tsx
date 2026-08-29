import { BoxLayout, Bubble, Region } from '#base/theme';

import { ClubSpecialInfoPopupBubbleLayoutMainContent, ClubSpecialInfoPopupBubbleLayoutMainContentProps } from './ClubSpecialInfoPopupBubbleLayoutMainContent';

/** Generated from `1565_club_special_info_popup_bubble_xml` (layout "room_info_popup_bubble", 374x146) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubSpecialInfoPopupBubbleLayoutProps {
    layout?: BoxLayout;
    mainContent?: ClubSpecialInfoPopupBubbleLayoutMainContentProps;
}

export const ClubSpecialInfoPopupBubbleLayout = ({ layout, mainContent }: ClubSpecialInfoPopupBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 374, height: 146, ...layout }}>
            <Bubble
                variant="7"
                pointer="left"
                layout={{ position: 'absolute', left: 0, width: 374, top: 0, height: 146 }}
            >
                <ClubSpecialInfoPopupBubbleLayoutMainContent {...mainContent} />
            </Bubble>
        </Region>
    );
};
