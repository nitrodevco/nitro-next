import { BoxLayout, Region } from '#base/theme';

import { LayoutSpacesNew_1657LayoutCtlgSpacesNew, LayoutSpacesNew_1657LayoutCtlgSpacesNewProps } from './LayoutSpacesNew_1657LayoutCtlgSpacesNew';

/** Generated from `1657_layout_spaces_new_xml` (layout "ctlg_spaces_new", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSpacesNew_1657LayoutProps {
    ctlgSpacesNew?: LayoutSpacesNew_1657LayoutCtlgSpacesNewProps;
    layout?: BoxLayout;
}

export const LayoutSpacesNew_1657Layout = ({ ctlgSpacesNew, layout }: LayoutSpacesNew_1657LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSpacesNew_1657LayoutCtlgSpacesNew {...ctlgSpacesNew} />
        </Region>
    );
};
