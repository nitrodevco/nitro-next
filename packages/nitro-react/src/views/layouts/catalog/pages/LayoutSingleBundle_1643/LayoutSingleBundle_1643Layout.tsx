import { BoxLayout, Region } from '#base/theme';

import { LayoutSingleBundle_1643LayoutCtlgSingleBundle, LayoutSingleBundle_1643LayoutCtlgSingleBundleProps } from './LayoutSingleBundle_1643LayoutCtlgSingleBundle';

/** Generated from `1643_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1643LayoutProps {
    ctlgSingleBundle?: LayoutSingleBundle_1643LayoutCtlgSingleBundleProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643Layout = ({ ctlgSingleBundle, layout }: LayoutSingleBundle_1643LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSingleBundle_1643LayoutCtlgSingleBundle {...ctlgSingleBundle} />
        </Region>
    );
};
