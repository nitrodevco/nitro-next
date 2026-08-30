import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2838_button_shiny_black_xml` (layout "habbo_window_layout_button_shiny_black", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyBlackLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyBlackLayout = ({ captionBTNTEXT, layout }: ButtonShinyBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 28, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-button-shiny-regular"
                textOptions={{ fill: '#ffffff' }}
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 28 }}
            />
        </Region>
    );
};
