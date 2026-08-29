import { BoxLayout, Region } from '#base/theme';

import { LayoutTrophies_1695LayoutCtlgTrophies, LayoutTrophies_1695LayoutCtlgTrophiesProps } from './LayoutTrophies_1695LayoutCtlgTrophies';

/** Generated from `1695_layout_trophies_xml` (layout "ctlg_trophies", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutTrophies_1695LayoutProps {
    ctlgTrophies?: LayoutTrophies_1695LayoutCtlgTrophiesProps;
    layout?: BoxLayout;
}

export const LayoutTrophies_1695Layout = ({ ctlgTrophies, layout }: LayoutTrophies_1695LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutTrophies_1695LayoutCtlgTrophies {...ctlgTrophies} />
        </Region>
    );
};
