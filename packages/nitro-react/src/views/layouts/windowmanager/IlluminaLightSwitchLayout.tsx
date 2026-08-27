import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2593_illumina_light_switch_xml` (layout "illumina_light_button", 50x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightSwitchLayoutProps {
    captionCAPTIONTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightSwitchLayout = ({ captionCAPTIONTEXT, layout }: IlluminaLightSwitchLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 21, ...layout }}>
            <Region
                name="_CAPTION_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147483664}
                layout={{ position: 'absolute', left: 0, width: 2, top: 0, height: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCAPTIONTEXT ?? ''}
                    textStyle="text-style-il-button"
                />
            </Region>
        </Region>
    );
};
