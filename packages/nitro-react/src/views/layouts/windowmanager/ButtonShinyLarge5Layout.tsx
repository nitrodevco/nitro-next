import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1976_button_shiny_large_5_xml` (layout "habbo_window_layout_button_shiny_large_5", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyLarge5LayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyLarge5Layout = ({ captionBTNTEXT, layout }: ButtonShinyLarge5LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-button-shiny-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
