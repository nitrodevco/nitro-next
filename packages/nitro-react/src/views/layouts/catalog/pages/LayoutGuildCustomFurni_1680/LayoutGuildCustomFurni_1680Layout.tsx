import { BoxLayout, Region } from '#base/theme';

import { LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3, LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props } from './LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3';

/** Generated from `1680_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1680LayoutProps {
    ctlgDefault3x3?: LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680Layout = ({ ctlgDefault3x3, layout }: LayoutGuildCustomFurni_1680LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};
