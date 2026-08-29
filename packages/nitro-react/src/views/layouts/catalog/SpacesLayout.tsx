import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1665_spaces_xml` (layout "spaces", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpacesLayoutProps {
    default3x3?: SpacesLayoutDefault3x3Props;
    layout?: BoxLayout;
}

export const SpacesLayout = ({ default3x3, layout }: SpacesLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <SpacesLayoutDefault3x3 {...default3x3} />
        </Region>
    );
};

/** Named region `default_3x3` of SpacesLayout - configured through the parent's `default3x3` prop. */
export interface SpacesLayoutDefault3x3Props {
    captionPageText?: string;
    layout?: BoxLayout;
    srcHeadline?: string;
}

export const SpacesLayoutDefault3x3 = ({ captionPageText, layout, srcHeadline }: SpacesLayoutDefault3x3Props) => {
    return (
        <Region
            name="default_3x3"
            layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 416, ...layout }}
        >
            <ThemeImage
                name="headline"
                src={srcHeadline}
                layout={{ position: 'absolute', left: 0, width: 339, top: 0, height: 68 }}
            />
            <Region
                name="pageText"
                layout={{ position: 'absolute', left: 12, width: 315, top: 73, height: 52, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPageText ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae est id tellus laoreet molestie. Integer quis dui eget erat dapibus dignissim. Curabitur lorem. Vestibulum id elit. Nulla eget sem malesuada magna iaculis ultrices. Duis aute irure dolor in reprehenderit in voluptate'}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 315 }}
                />
            </Region>
        </Region>
    );
};
