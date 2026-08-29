import { BoxLayout, Region } from '#base/theme';

import { LayoutFrontpage_1597LayoutCtlgFrontpage4, LayoutFrontpage_1597LayoutCtlgFrontpage4Props } from './LayoutFrontpage_1597LayoutCtlgFrontpage4';

/** Generated from `1597_layout_frontpage_xml` (layout "ctlg_frontpage4", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpage_1597LayoutProps {
    ctlgFrontpage4?: LayoutFrontpage_1597LayoutCtlgFrontpage4Props;
    layout?: BoxLayout;
}

export const LayoutFrontpage_1597Layout = ({ ctlgFrontpage4, layout }: LayoutFrontpage_1597LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutFrontpage_1597LayoutCtlgFrontpage4 {...ctlgFrontpage4} />
        </Region>
    );
};
