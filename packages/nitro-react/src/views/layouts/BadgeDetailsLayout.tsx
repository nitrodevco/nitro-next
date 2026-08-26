import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `982_badge_details_xml` (layout "badge_details", 263x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeDetailsLayoutProps {
    layout?: BoxLayout;
}

export const BadgeDetailsLayout = ({ layout }: BadgeDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 263, height: 25, ...layout }}>
            <Border
                variant="0"
                name="test"
                layout={{ position: 'absolute', left: 87, width: 263, top: 53, height: 25 }}
            >
                <Region
                    name="details_list"
                    params={8388624}
                    layout={{ position: 'absolute', left: 0, width: 263, top: 6, height: 11, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="name"
                        params={16}
                        layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                    <Region
                        name="description"
                        params={16}
                        layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                    <Region
                        visible={false}
                        layout={{ width: 92, height: 17, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="rarity_tag"
                            params={16}
                            tintColor="#cccccc"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                name="rarity_border"
                                tags={[ 'BLEND_SUBTRACT' ]}
                                params={4194320}
                                layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Unique badge"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="rarity"
                                tags={[ 'BLEND_INVERT' ]}
                                params={16}
                                layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Unique badge"
                                    textStyle="text-style-bold"
                                />
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="owner_count"
                        params={16}
                        visible={false}
                        layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
