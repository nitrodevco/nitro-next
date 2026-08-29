import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rarity_tag` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutRarityTagItemProps {
    captionRarity?: string;
    captionRarityBorder?: string;
    layout?: BoxLayout;
    visibleRarity?: boolean;
    visibleRarityBorder?: boolean;
    visibleRarityTag?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutRarityTagItem = ({ captionRarity, captionRarityBorder, layout, visibleRarity, visibleRarityBorder, visibleRarityTag }: ExtendedProfileBadgeDetailsLayoutRarityTagItemProps) => {
    return (
        (visibleRarityTag ?? false) && (
            <Border
                variant="2"
                name="rarity_tag"
                tintColor="#cccccc"
                layout={{ width: 92, height: 17, flexShrink: 0, ...layout }}
            >
                {(visibleRarityBorder ?? true) && (
                    <Region
                        name="rarity_border"
                        layout={{ position: 'absolute', left: 5, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRarityBorder ?? 'Unique badge'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                )}
                {(visibleRarity ?? true) && (
                    <Region
                        name="rarity"
                        layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRarity ?? 'Unique badge'}
                            textStyle="text-style-bold"
                        />
                    </Region>
                )}
            </Border>
        )
    );
};
