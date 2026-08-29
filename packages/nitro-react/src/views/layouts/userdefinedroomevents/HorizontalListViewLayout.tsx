import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `1141_horizontal_list_view_xml` (layout "horizontal_list_view", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HorizontalListViewLayoutProps {
    itemsHorizontalListView?: ReactNode;
    layout?: BoxLayout;
}

export const HorizontalListViewLayout = ({ itemsHorizontalListView, layout }: HorizontalListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <Region
                name="horizontal_list_view"
                layout={{ position: 'absolute', left: 0, top: 0, minHeight: 0, flexDirection: 'row' }}
            >
                {itemsHorizontalListView}
            </Region>
        </Region>
    );
};
