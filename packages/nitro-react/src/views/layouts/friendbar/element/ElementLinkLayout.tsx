import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `94_element_link_xml` (layout "element_bodytext", 252x17) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementLinkLayoutProps {
    captionLinkTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const ElementLinkLayout = ({ captionLinkTxt, colorableTextColor, layout }: ElementLinkLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 252, height: 17, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 17 }}>
                <Region
                    name="link_txt"
                    layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLinkTxt ?? 'Link text ph'}
                        textOptions={{ fill: colorableTextColor }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
