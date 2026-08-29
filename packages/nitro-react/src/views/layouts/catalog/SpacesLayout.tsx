import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1665_spaces_xml` (layout "spaces", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpacesLayoutProps {
    captionPageText?: string;
    layout?: BoxLayout;
    srcHeadline?: string;
    tintHeadline?: string;
}

export const SpacesLayout = ({ captionPageText, layout, srcHeadline, tintHeadline }: SpacesLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="default_3x3"
                layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 416 }}
            >
                <ThemeImage
                    name="headline"
                    src={srcHeadline}
                    tint={tintHeadline}
                    layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 68 }}
                />
                <Region
                    name="pageText"
                    layout={{ position: 'absolute', left: 12, right: 12, top: 73, height: 52, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPageText ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae est id tellus laoreet molestie. Integer quis dui eget erat dapibus dignissim. Curabitur lorem. Vestibulum id elit. Nulla eget sem malesuada magna iaculis ultrices. Duis aute irure dolor in reprehenderit in voluptate'}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 315 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
