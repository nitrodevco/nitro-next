import { BoxLayout, Region } from '#base/theme';

import { LayoutInfoRentables_1671LayoutCtlgInfoRentables, LayoutInfoRentables_1671LayoutCtlgInfoRentablesProps } from './LayoutInfoRentables_1671LayoutCtlgInfoRentables';

/** Generated from `1671_layout_info_rentables_xml` (layout "ctlg_info_rentables", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRentables_1671LayoutProps {
    ctlgInfoRentables?: LayoutInfoRentables_1671LayoutCtlgInfoRentablesProps;
    layout?: BoxLayout;
}

export const LayoutInfoRentables_1671Layout = ({ ctlgInfoRentables, layout }: LayoutInfoRentables_1671LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoRentables_1671LayoutCtlgInfoRentables {...ctlgInfoRentables} />
        </Region>
    );
};
