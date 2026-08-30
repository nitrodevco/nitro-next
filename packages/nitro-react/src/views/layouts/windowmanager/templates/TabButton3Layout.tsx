import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2175_tab_button_3_xml` (layout "habbo_window_layout_tab_button_3", 20x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButton3LayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TabButton3Layout = ({ captionTitle, layout }: TabButton3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 32, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />
            <ThemeText
                text={captionTitle ?? ''}
                textStyle="text-style-button-shiny-regular"
                textOptions={{ fill: '#000000' }}
                name="title"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', marginTop: 3, marginBottom: -3, height: 30 }}
            />
        </Region>
    );
};
