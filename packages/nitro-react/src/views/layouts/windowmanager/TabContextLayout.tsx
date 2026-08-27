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
                params={2147485841}
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
            />
            <Region
                name="selector"
                tags={[ '_SELECTOR', '_EXCLUDE', '_INTERNAL' ]}
                params={145}
                layout={{ position: 'absolute', left: 6, right: 6, top: 0, height: 21 }}
            />
        </Region>
    );
};
