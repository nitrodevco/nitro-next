import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2066_illumina_light_radio_button_xml` (layout "illumina_light_radio_button", 50x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightRadioButtonLayoutProps {
    captionCAPTIONTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightRadioButtonLayout = ({ captionCAPTIONTEXT, layout }: IlluminaLightRadioButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 12, ...layout }}>
            <Region
                name="_CAPTION_TEXT"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCAPTIONTEXT ?? ''}
                    textStyle="text-style-il-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 50 }}
                />
            </Region>
        </Region>
    );
};
