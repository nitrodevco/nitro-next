import { BoxLayout, Region } from '#base/theme';

import { LayoutSpacesNew_1576LayoutCtlgSpacesNew, LayoutSpacesNew_1576LayoutCtlgSpacesNewProps } from './LayoutSpacesNew_1576LayoutCtlgSpacesNew';

/** Generated from `1576_layout_spaces_new_xml` (layout "ctlg_spaces_new", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSpacesNew_1576LayoutProps {
    ctlgSpacesNew?: LayoutSpacesNew_1576LayoutCtlgSpacesNewProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1576Layout = ({ ctlgSpacesNew, layout }: LayoutSpacesNew_1576LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSpacesNew_1576LayoutCtlgSpacesNew {...ctlgSpacesNew} />
        </Region>
    );
};
