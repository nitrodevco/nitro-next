import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `32_element_caption_xml` (layout "element_caption", 250x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementCaptionLayoutProps {
    layout?: BoxLayout;
}

export const ElementCaptionLayout = ({ layout }: ElementCaptionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 24, ...layout }}>
            <Region
                tags={[ 'COLORABLE' ]}
                params={8388752}
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text="Caption PH"
                    textStyle="text-style-il-heading-1"
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        </Region>
    );
};
