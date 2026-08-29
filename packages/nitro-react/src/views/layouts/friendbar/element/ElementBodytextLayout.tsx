import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `11_element_bodytext_xml` (layout "element_bodytext", 250x16) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementBodytextLayoutProps {
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const ElementBodytextLayout = ({ colorableTextColor, layout }: ElementBodytextLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 16, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Desc PH"
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        </Region>
    );
};
