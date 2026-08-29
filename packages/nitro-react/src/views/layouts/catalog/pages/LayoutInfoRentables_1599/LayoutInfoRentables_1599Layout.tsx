import { BoxLayout, Region } from '#base/theme';

import { LayoutInfoRentables_1599LayoutCtlgInfoRentables, LayoutInfoRentables_1599LayoutCtlgInfoRentablesProps } from './LayoutInfoRentables_1599LayoutCtlgInfoRentables';

/** Generated from `1599_layout_info_rentables_xml` (layout "ctlg_info_rentables", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRentables_1599LayoutProps {
    ctlgInfoRentables?: LayoutInfoRentables_1599LayoutCtlgInfoRentablesProps;
    layout?: BoxLayout;
}

export const LayoutInfoRentables_1599Layout = ({ ctlgInfoRentables, layout }: LayoutInfoRentables_1599LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoRentables_1599LayoutCtlgInfoRentables {...ctlgInfoRentables} />
        </Region>
    );
};
