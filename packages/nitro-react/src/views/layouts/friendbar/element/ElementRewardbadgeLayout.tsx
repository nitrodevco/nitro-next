import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `41_element_rewardbadge_xml` (layout "element_bodytext", 250x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementRewardbadgeLayoutProps {
    captionBadgeDesc?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    srcBadgeImage?: string;
}

export const ElementRewardbadgeLayout = ({ captionBadgeDesc, colorableTextColor, layout, srcBadgeImage }: ElementRewardbadgeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 46, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="badge_image"
                    src={srcBadgeImage}
                    layout={{ position: 'absolute', left: 9, width: 38, top: 3, height: 38 }}
                />
                <Region
                    name="badge_desc"
                    layout={{ position: 'absolute', right: 12, width: 188, top: 7, bottom: 6, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBadgeDesc ?? 'klj hklj hlkj hlkj hkljh lkjh kljh lkjh klj hlkj hlkjh kljh'}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 188 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
