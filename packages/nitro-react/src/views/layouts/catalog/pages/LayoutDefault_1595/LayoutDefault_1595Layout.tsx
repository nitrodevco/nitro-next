import { BoxLayout, Region } from '#base/theme';

import { LayoutDefault_1595LayoutContainer, LayoutDefault_1595LayoutContainerProps } from './LayoutDefault_1595LayoutContainer';

/** Generated from `1595_layout_default_xml` (layout "layout_default_ubuntu", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1595LayoutProps {
    container?: LayoutDefault_1595LayoutContainerProps;
    layout?: BoxLayout;
}

export const LayoutDefault_1595Layout = ({ container, layout }: LayoutDefault_1595LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutDefault_1595LayoutContainer {...container} />
        </Region>
    );
};
