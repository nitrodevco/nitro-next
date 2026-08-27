import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2175_tab_button_3_xml` (layout "habbo_window_layout_tab_button_3", 20x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButton3LayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TabButton3Layout = ({ captionTitle, layout }: TabButton3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 32, ...layout }}>
            <Region
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={16}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 32 }}
            />
            <Region
                name="title"
                tags={[ 'title', 'TAB_BUTTON_TITLE', '_EXCLUDE', '_INTERNAL' ]}
                params={2147486928}
                layout={{ position: 'absolute', left: 0, width: 20, top: 4, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? ''}
                    textStyle="text-style-button-shiny-regular"
                    textOptions={{ fill: '#000000' }}
                />
            </Region>
        </Region>
    );
};
