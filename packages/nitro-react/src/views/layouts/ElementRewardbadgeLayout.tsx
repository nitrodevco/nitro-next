import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `41_element_rewardbadge_xml` (layout "element_bodytext", 250x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementRewardbadgeLayoutProps {
    layout?: BoxLayout;
}

export const ElementRewardbadgeLayout = ({ layout }: ElementRewardbadgeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 46, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 46 }}
            >
                <ThemeImage
                    name="badge_image"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 9, width: 38, top: 3, height: 38 }}
                />
                <Region
                    name="badge_desc"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 50, width: 188, top: 7, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="klj hklj hlkj hlkj hkljh lkjh kljh lkjh klj hlkj hlkjh kljh"
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 188 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
