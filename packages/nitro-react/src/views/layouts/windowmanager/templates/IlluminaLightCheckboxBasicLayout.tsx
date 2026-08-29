import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2069_illumina_light_checkbox_basic_xml` (layout "illumina_light_checkbox_basic", 50x21) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightCheckboxBasicLayoutProps {
    captionCAPTIONTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightCheckboxBasicLayout = ({ captionCAPTIONTEXT, layout }: IlluminaLightCheckboxBasicLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 21, ...layout }}>
            <Region
                name="_CAPTION_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
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
