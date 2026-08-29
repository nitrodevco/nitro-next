import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2159_illumina_light_button_plain_xml` (layout "illumina_light_button_plain", 28x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightButtonPlainLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightButtonPlainLayout = ({ captionBTNTEXT, layout }: IlluminaLightButtonPlainLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 28, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                layout={{ position: 'absolute', width: 28, alignSelf: 'center', height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-il-button"
                />
            </Region>
        </Region>
    );
};
