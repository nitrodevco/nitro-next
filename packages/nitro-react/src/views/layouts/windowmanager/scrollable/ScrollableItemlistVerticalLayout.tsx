import { BoxLayout, Region } from '#base/theme';

/** Generated from `2300_scrollable_itemlist_vertical_xml` (layout "habbo_window_layout_scrollable_itemlist", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemlistVerticalLayoutProps {
    iTEMLIST?: ScrollableItemlistVerticalLayoutITEMLISTProps;
    layout?: BoxLayout;
}

export const ScrollableItemlistVerticalLayout = ({ iTEMLIST, layout }: ScrollableItemlistVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <ScrollableItemlistVerticalLayoutITEMLIST
                tags={[ '_ITEMLIST', '_EXCLUDE', '_INTERNAL' ]}
                {...iTEMLIST}
            />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `_ITEMLIST` of ScrollableItemlistVerticalLayout - configured through the parent's `iTEMLIST` prop. */
export interface ScrollableItemlistVerticalLayoutITEMLISTProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ScrollableItemlistVerticalLayoutITEMLIST = ({ layout, tags }: ScrollableItemlistVerticalLayoutITEMLISTProps) => {
    return (
        <Region
            name="_ITEMLIST"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        />
    );
};
