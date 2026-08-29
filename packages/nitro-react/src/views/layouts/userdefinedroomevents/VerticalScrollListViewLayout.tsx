import { BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1148_vertical_scroll_list_view_xml` (layout "vertical_scroll_list_view", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VerticalScrollListViewLayoutProps {
    layout?: BoxLayout;
}

export const VerticalScrollListViewLayout = ({ layout }: VerticalScrollListViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 100 }}
            >
                <Region
                    name="scroll_view"
                    layout={{ flexDirection: 'column', width: '100%' }}
                />
            </ScrollArea>
        </Region>
    );
};
