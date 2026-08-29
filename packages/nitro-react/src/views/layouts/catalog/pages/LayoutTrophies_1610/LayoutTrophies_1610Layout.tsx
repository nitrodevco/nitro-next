import { BoxLayout, Region } from '#base/theme';

import { LayoutTrophies_1610LayoutCtlgTrophies, LayoutTrophies_1610LayoutCtlgTrophiesProps } from './LayoutTrophies_1610LayoutCtlgTrophies';

/** Generated from `1610_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1610LayoutProps {
    ctlgTrophies?: LayoutTrophies_1610LayoutCtlgTrophiesProps;
    layout?: BoxLayout;
}

export const LayoutTrophies_1610Layout = ({ ctlgTrophies, layout }: LayoutTrophies_1610LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutTrophies_1610LayoutCtlgTrophies {...ctlgTrophies} />
        </Region>
    );
};
