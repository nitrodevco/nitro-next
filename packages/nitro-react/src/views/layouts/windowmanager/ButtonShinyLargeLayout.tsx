import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2840_button_shiny_large_xml` (layout "habbo_window_layout_button_shiny_large", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyLargeLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const ButtonShinyLargeLayout = ({ captionBTNTEXT, layout }: ButtonShinyLargeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 20, top: '50%', marginTop: -14, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-button-shiny-bold"
                />
            </Region>
        </Region>
    );
};
