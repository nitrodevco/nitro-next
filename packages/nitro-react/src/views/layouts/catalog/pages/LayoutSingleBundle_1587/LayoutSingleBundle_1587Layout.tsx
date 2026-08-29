import { BoxLayout, Region } from '#base/theme';

import { LayoutSingleBundle_1587LayoutCtlgSingleBundle, LayoutSingleBundle_1587LayoutCtlgSingleBundleProps } from './LayoutSingleBundle_1587LayoutCtlgSingleBundle';

/** Generated from `1587_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1587LayoutProps {
    ctlgSingleBundle?: LayoutSingleBundle_1587LayoutCtlgSingleBundleProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1587Layout = ({ ctlgSingleBundle, layout }: LayoutSingleBundle_1587LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSingleBundle_1587LayoutCtlgSingleBundle {...ctlgSingleBundle} />
        </Region>
    );
};
