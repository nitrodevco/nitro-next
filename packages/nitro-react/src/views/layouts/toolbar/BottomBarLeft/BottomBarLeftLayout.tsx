import { BoxLayout, Region } from '#base/theme';

import { BottomBarLeftLayoutMainToolbar, BottomBarLeftLayoutMainToolbarProps } from './BottomBarLeftLayoutMainToolbar';

/** Generated from `1216_bottom_bar_left_xml` (layout "bottom_bar_left", 623x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BottomBarLeftLayoutProps {
    layout?: BoxLayout;
    mainToolbar?: BottomBarLeftLayoutMainToolbarProps;
}

export const BottomBarLeftLayout = ({ layout, mainToolbar }: BottomBarLeftLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 623, height: 46, ...layout }}>
            <BottomBarLeftLayoutMainToolbar {...mainToolbar} />
        </Region>
    );
};
