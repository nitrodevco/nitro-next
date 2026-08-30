import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2050_tab_button_black_xml` (layout "habbo_window_layout_tab_button_black", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabButtonBlackLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const TabButtonBlackLayout = ({ captionTitle, layout }: TabButtonBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <ThemeText
                text={captionTitle ?? ''}
                textStyle="text-style-button-tab"
                textOptions={{ fill: '#ffffff' }}
                name="title"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22 }}
            />
        </Region>
    );
};
