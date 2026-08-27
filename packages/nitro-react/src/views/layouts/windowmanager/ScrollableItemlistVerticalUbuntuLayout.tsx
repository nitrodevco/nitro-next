import { BoxLayout, Region } from '#base/theme';

/** Generated from `2134_scrollable_itemlist_vertical_ubuntu_xml` (layout "habbo_window_layout_scrollable_itemlist_ubuntu", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemlistVerticalUbuntuLayoutProps {
    layout?: BoxLayout;
}

export const ScrollableItemlistVerticalUbuntuLayout = ({ layout }: ScrollableItemlistVerticalUbuntuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <Region
                name="_ITEMLIST"
                tags={[ '_ITEMLIST', '_EXCLUDE', '_INTERNAL' ]}
                params={2193}
                layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'column' }}
            />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};
