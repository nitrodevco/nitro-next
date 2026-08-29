import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `5_element_subcaption_xml` (layout "element_bodytext", 250x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementSubcaptionLayoutProps {
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const ElementSubcaptionLayout = ({ colorableTextColor, layout }: ElementSubcaptionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 15, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text="Desc PH"
                    textStyle="text-style-il-heading-3"
                    textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        </Region>
    );
};
