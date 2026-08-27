import { BoxLayout, Region, TabContent } from '#base/theme';

/** Generated from `2657_tab_context_xml` (layout "habbo_window_layout_tab_context", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabContextLayoutProps {
    layout?: BoxLayout;
}

export const TabContextLayout = ({ layout }: TabContextLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <TabContent
                name="content"
                tags={[ '_CONTENT', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 100, top: 20, height: 80 }}
            />
        </Region>
    );
};
