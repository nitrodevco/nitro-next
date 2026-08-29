import { BoxLayout, Region } from '#base/theme';

/** Generated from `2414_scrollable_itemgrid_vertical_xml` (layout "habbo_window_layout_scrollable_itemgrid", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemgridVerticalLayoutProps {
    iTEMGRID?: ScrollableItemgridVerticalLayoutITEMGRIDProps;
    layout?: BoxLayout;
}

export const ScrollableItemgridVerticalLayout = ({ iTEMGRID, layout }: ScrollableItemgridVerticalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <ScrollableItemgridVerticalLayoutITEMGRID
                tags={[ '_ITEMGRID', '_EXCLUDE', '_INTERNAL' ]}
                {...iTEMGRID}
            />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `_ITEMGRID` of ScrollableItemgridVerticalLayout - configured through the parent's `iTEMGRID` prop. */
export interface ScrollableItemgridVerticalLayoutITEMGRIDProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ScrollableItemgridVerticalLayoutITEMGRID = ({ layout, tags }: ScrollableItemgridVerticalLayoutITEMGRIDProps) => {
    return (
        <Region
            name="_ITEMGRID"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'row', flexWrap: 'wrap', ...layout }}
        />
    );
};
