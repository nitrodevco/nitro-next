import { BoxLayout, Region } from '#base/theme';

/** Generated from `2050_tab_button_black_xml` (layout "habbo_window_layout_tab_button_black", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButtonBlackLayoutProps {
    layout?: BoxLayout;
}

export const TabButtonBlackLayout = ({ layout }: TabButtonBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                name="title"
                tags={[ 'title', 'TAB_BUTTON_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
