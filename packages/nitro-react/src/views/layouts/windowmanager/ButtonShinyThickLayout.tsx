import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2620_button_shiny_thick_xml` (layout "habbo_window_layout_button_shiny_thick", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyThickLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyThickLayout = ({ captionBTNTEXT, layout }: ButtonShinyThickLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-button-shiny-bold"
                />
            </Region>
        </Region>
    );
};
