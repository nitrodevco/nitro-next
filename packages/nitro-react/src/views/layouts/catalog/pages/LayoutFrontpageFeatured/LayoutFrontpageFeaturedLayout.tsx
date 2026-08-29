import { BoxLayout, Region } from '#base/theme';

import { LayoutFrontpageFeaturedLayoutCtlgFrontpage5, LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props } from './LayoutFrontpageFeaturedLayoutCtlgFrontpage5';

/** Generated from `1660_layout_frontpage_featured_xml` (layout "layout_frontpage_featured", 552x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpageFeaturedLayoutProps {
    ctlgFrontpage5?: LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props;
    layout?: BoxLayout;
}

export const LayoutFrontpageFeaturedLayout = ({ ctlgFrontpage5, layout }: LayoutFrontpageFeaturedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 552, height: 460, ...layout }}>
            <LayoutFrontpageFeaturedLayoutCtlgFrontpage5 {...ctlgFrontpage5} />
        </Region>
    );
};
