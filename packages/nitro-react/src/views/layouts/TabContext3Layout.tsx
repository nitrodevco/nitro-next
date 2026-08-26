import { BoxLayout, Region, TabContent } from '#base/theme';

/** Generated from `2328_tab_context_3_xml` (layout "habbo_window_layout_tab_context_3", 64x64) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabContext3LayoutProps {
    layout?: BoxLayout;
}

export const TabContext3Layout = ({ layout }: TabContext3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 64, height: 64, ...layout }}>
            <TabContent
                name="content"
                tags={[ '_CONTENT', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 64, top: 30, height: 32 }}
            />
        </Region>
    );
};
