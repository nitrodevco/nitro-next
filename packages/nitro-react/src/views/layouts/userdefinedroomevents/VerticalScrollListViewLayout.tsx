import { BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1148_vertical_scroll_list_view_xml` (layout "vertical_scroll_list_view", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerticalScrollListViewLayoutProps {
    layout?: BoxLayout;
    scrollView?: VerticalScrollListViewLayoutScrollViewProps;
}

export const VerticalScrollListViewLayout = ({ layout, scrollView }: VerticalScrollListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <VerticalScrollListViewLayoutScrollView {...scrollView} />
        </Region>
    );
};

/** Named region `scroll_view` of VerticalScrollListViewLayout - configured through the parent's `scrollView` prop. */
export interface VerticalScrollListViewLayoutScrollViewProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const VerticalScrollListViewLayoutScrollView = ({ layout, tags }: VerticalScrollListViewLayoutScrollViewProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 100, ...layout }}
        >
            <Region
                name="scroll_view"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};
