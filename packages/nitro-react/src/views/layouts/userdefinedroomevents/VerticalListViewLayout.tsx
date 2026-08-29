import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `1145_vertical_list_view_xml` (layout "vertical_list_view", 1000x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerticalListViewLayoutProps {
    itemsVerticalListView?: ReactNode;
    layout?: BoxLayout;
}

export const VerticalListViewLayout = ({ itemsVerticalListView, layout }: VerticalListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1000, height: 0, ...layout }}>
            <Region
                name="vertical_list_view"
                layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
            >
                {itemsVerticalListView}
            </Region>
        </Region>
    );
};
