import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1976_button_shiny_large_5_xml` (layout "habbo_window_layout_button_shiny_large_5", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyLarge5LayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyLarge5Layout = ({ captionBTNTEXT, layout }: ButtonShinyLarge5LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 28, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-button-shiny-bold"
                textOptions={{ fill: '#ffffff' }}
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 28 }}
            />
        </Region>
    );
};
