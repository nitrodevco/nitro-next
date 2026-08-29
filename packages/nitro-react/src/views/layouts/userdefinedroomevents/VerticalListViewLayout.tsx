import { BoxLayout, Region } from '#base/theme';

/** Generated from `1145_vertical_list_view_xml` (layout "vertical_list_view", 1000x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerticalListViewLayoutProps {
    layout?: BoxLayout;
    verticalListView?: VerticalListViewLayoutVerticalListViewProps;
}

export const VerticalListViewLayout = ({ layout, verticalListView }: VerticalListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1000, height: 0, ...layout }}>
            <VerticalListViewLayoutVerticalListView {...verticalListView} />
        </Region>
    );
};

/** Named region `vertical_list_view` of VerticalListViewLayout - configured through the parent's `verticalListView` prop. */
export interface VerticalListViewLayoutVerticalListViewProps {
    layout?: BoxLayout;
}

export const VerticalListViewLayoutVerticalListView = ({ layout }: VerticalListViewLayoutVerticalListViewProps) => {
    return (
        <Region
            name="vertical_list_view"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', ...layout }}
        />
    );
};
