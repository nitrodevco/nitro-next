import { BoxLayout, Region } from '#base/theme';

import { LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3, LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props } from './LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3';

/** Generated from `1586_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1586LayoutProps {
    ctlgDefault3x3?: LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586Layout = ({ ctlgDefault3x3, layout }: LayoutGuildCustomFurni_1586LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};
