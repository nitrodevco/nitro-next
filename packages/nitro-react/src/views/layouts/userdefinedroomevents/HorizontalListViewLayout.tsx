import { BoxLayout, Region } from '#base/theme';

/** Generated from `1141_horizontal_list_view_xml` (layout "horizontal_list_view", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HorizontalListViewLayoutProps {
    horizontalListView?: HorizontalListViewLayoutHorizontalListViewProps;
    layout?: BoxLayout;
}

export const HorizontalListViewLayout = ({ horizontalListView, layout }: HorizontalListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <HorizontalListViewLayoutHorizontalListView {...horizontalListView} />
        </Region>
    );
};

/** Named region `horizontal_list_view` of HorizontalListViewLayout - configured through the parent's `horizontalListView` prop. */
export interface HorizontalListViewLayoutHorizontalListViewProps {
    layout?: BoxLayout;
}

export const HorizontalListViewLayoutHorizontalListView = ({ layout }: HorizontalListViewLayoutHorizontalListViewProps) => {
    return (
        <Region
            name="horizontal_list_view"
            layout={{ position: 'absolute', left: 0, top: 0, minHeight: 0, flexDirection: 'row', ...layout }}
        />
    );
};
