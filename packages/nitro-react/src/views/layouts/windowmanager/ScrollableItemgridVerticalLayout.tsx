import { BoxLayout, Region } from '#base/theme';

/** Generated from `2414_scrollable_itemgrid_vertical_xml` (layout "habbo_window_layout_scrollable_itemgrid", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemgridVerticalLayoutProps {
    layout?: BoxLayout;
}

export const ScrollableItemgridVerticalLayout = ({ layout }: ScrollableItemgridVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="_ITEMGRID"
                tags={[ '_ITEMGRID', '_EXCLUDE', '_INTERNAL' ]}
                params={2193}
                layout={{ position: 'absolute', left: 0, width: 23, top: 0, height: 40, flexDirection: 'row', flexWrap: 'wrap' }}
            />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};
