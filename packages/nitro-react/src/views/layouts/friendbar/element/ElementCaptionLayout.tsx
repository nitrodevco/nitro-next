import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `32_element_caption_xml` (layout "element_caption", 250x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementCaptionLayoutProps {
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const ElementCaptionLayout = ({ colorableTextColor, layout }: ElementCaptionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 24, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Caption PH"
                    textStyle="text-style-il-heading-1"
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        </Region>
    );
};
