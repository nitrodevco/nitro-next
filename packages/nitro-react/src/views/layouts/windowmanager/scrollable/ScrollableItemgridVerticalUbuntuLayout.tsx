import { BoxLayout, Region } from '#base/theme';

/** Generated from `1884_scrollable_itemgrid_vertical_ubuntu_xml` (layout "habbo_window_layout_scrollable_itemgrid_ubuntu", 40x40) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ScrollableItemgridVerticalUbuntuLayoutProps {
    iTEMGRID?: ScrollableItemgridVerticalUbuntuLayoutITEMGRIDProps;
    layout?: BoxLayout;
}

export const ScrollableItemgridVerticalUbuntuLayout = ({ iTEMGRID, layout }: ScrollableItemgridVerticalUbuntuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 40, ...layout }}>
            <ScrollableItemgridVerticalUbuntuLayoutITEMGRID {...iTEMGRID} />
            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `_ITEMGRID` of ScrollableItemgridVerticalUbuntuLayout - configured through the parent's `iTEMGRID` prop. */
export interface ScrollableItemgridVerticalUbuntuLayoutITEMGRIDProps {
    layout?: BoxLayout;
}

export const ScrollableItemgridVerticalUbuntuLayoutITEMGRID = ({ layout }: ScrollableItemgridVerticalUbuntuLayoutITEMGRIDProps) => {
    return (
        <Region
            name="_ITEMGRID"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, flexDirection: 'row', flexWrap: 'wrap', ...layout }}
        />
    );
};
