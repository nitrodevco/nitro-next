import { BoxLayout, Region } from '#base/theme';

/** Generated from `2134_scrollable_itemlist_vertical_ubuntu_xml` (layout "habbo_window_layout_scrollable_itemlist_ubuntu", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemlistVerticalUbuntuLayoutProps {
    iTEMLIST?: ScrollableItemlistVerticalUbuntuLayoutITEMLISTProps;
    layout?: BoxLayout;
}

export const ScrollableItemlistVerticalUbuntuLayout = ({ iTEMLIST, layout }: ScrollableItemlistVerticalUbuntuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <ScrollableItemlistVerticalUbuntuLayoutITEMLIST
                tags={[ '_ITEMLIST', '_EXCLUDE', '_INTERNAL' ]}
                {...iTEMLIST}
            />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `_ITEMLIST` of ScrollableItemlistVerticalUbuntuLayout - configured through the parent's `iTEMLIST` prop. */
export interface ScrollableItemlistVerticalUbuntuLayoutITEMLISTProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ScrollableItemlistVerticalUbuntuLayoutITEMLIST = ({ layout, tags }: ScrollableItemlistVerticalUbuntuLayoutITEMLISTProps) => {
    return (
        <Region
            name="_ITEMLIST"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        />
    );
};
