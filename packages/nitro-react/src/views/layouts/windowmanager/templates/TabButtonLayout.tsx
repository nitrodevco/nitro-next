import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1793_tab_button_xml` (layout "habbo_window_layout_tab_button", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButtonLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TabButtonLayout = ({ captionTitle, layout }: TabButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 10, top: 0, bottom: 0 }} />
            <ThemeText
                text={captionTitle ?? ''}
                textStyle="text-style-button-tab"
                textOptions={{ fill: '#000000' }}
                name="title"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22 }}
            />
        </Region>
    );
};
