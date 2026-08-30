import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2620_button_shiny_thick_xml` (layout "habbo_window_layout_button_shiny_thick", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyThickLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyThickLayout = ({ captionBTNTEXT, layout }: ButtonShinyThickLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-button-shiny-bold"
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 22 }}
            />
        </Region>
    );
};
