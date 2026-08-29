import { BoxLayout, Region } from '#base/theme';

import { ClubBuyWidgetLayoutClubBuyContent, ClubBuyWidgetLayoutClubBuyContentProps } from './ClubBuyWidgetLayoutClubBuyContent';

/** Generated from `1652_clubBuyWidget_xml` (layout "clubBuyWidget", 320x345) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyWidgetLayoutProps {
    clubBuyContent?: ClubBuyWidgetLayoutClubBuyContentProps;
    layout?: BoxLayout;
}

export const ClubBuyWidgetLayout = ({ clubBuyContent, layout }: ClubBuyWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 320, height: 345, ...layout }}>
            <ClubBuyWidgetLayoutClubBuyContent {...clubBuyContent} />
        </Region>
    );
};
