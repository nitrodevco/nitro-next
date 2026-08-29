import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `2300_scrollable_itemlist_vertical_xml` (layout "habbo_window_layout_scrollable_itemlist", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemlistVerticalLayoutProps {
    itemsITEMLIST?: ReactNode;
    layout?: BoxLayout;
}

export const ScrollableItemlistVerticalLayout = ({ itemsITEMLIST, layout }: ScrollableItemlistVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="_ITEMLIST"
                layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'column' }}
            >
                {itemsITEMLIST}
            </Region>
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};
