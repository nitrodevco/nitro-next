import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2593_illumina_light_switch_xml` (layout "illumina_light_button", 50x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightSwitchLayoutProps {
    captionCAPTIONTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightSwitchLayout = ({ captionCAPTIONTEXT, layout }: IlluminaLightSwitchLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 21, ...layout }}>
            <ThemeText
                text={captionCAPTIONTEXT ?? ''}
                textStyle="text-style-il-button"
                name="_CAPTION_TEXT"
                layout={{ position: 'absolute', left: 0, width: 2, top: 0, height: 2 }}
            />
        </Region>
    );
};
