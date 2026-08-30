import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `badgeCountRegion` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutBadgeCountRegionItemProps {
    captionBadgeCount?: string;
    captionBadgeCountLabel?: string;
    captionBadgeRank?: string;
    layout?: BoxLayout;
    onBadgeCountRegion?: () => void;
    spacer?: ReactNode;
    visibleBadgeCount?: boolean;
    visibleBadgeCountLabel?: boolean;
    visibleBadgeRank?: boolean;
    visibleSpacer?: boolean;
}

export const NewExtendedProfileLayoutBadgeCountRegionItem = ({ captionBadgeCount, captionBadgeCountLabel, captionBadgeRank, layout, onBadgeCountRegion, spacer, visibleBadgeCount, visibleBadgeCountLabel, visibleBadgeRank, visibleSpacer }: NewExtendedProfileLayoutBadgeCountRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badgeCountRegion"
            onPointerTap={onBadgeCountRegion}
            cursor="pointer"
            layout={{ width: 166, height: 32, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 127, top: 0, height: 30, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('badge_rarity_badges_emblem.png')}
                    layout={{ width: 25, height: 25, flexShrink: 0 }}
                />
                {(visibleBadgeCountLabel ?? true) && (
                    <ThemeText
                        text={captionBadgeCountLabel ?? t('inventory.badges')}
                        textStyle="text-style-u-regular"
                        name="badgeCountLabel"
                        layout={{ width: 42, height: 16, flexShrink: 0 }}
                    />
                )}
                <Region layout={{ width: 48, height: 30, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                    {(visibleBadgeCount ?? true) && (
                        <ThemeText
                            text={captionBadgeCount ?? '0'}
                            textStyle="text-style-u-regular"
                            name="badgeCount"
                            layout={{ width: 10, height: 16, flexShrink: 0 }}
                        />
                    )}
                    {(visibleBadgeRank ?? true) && (
                        <ThemeText
                            text={captionBadgeRank ?? '(#123)'}
                            textStyle="text-style-u-regular"
                            name="badgeRank"
                            layout={{ width: 36, height: 16, flexShrink: 0 }}
                        />
                    )}
                </Region>
            </Region>
            {(visibleSpacer ?? true) && (
                <Region
                    name="spacer"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 165, width: 1, top: -6, height: 39 }}
                >
                    {spacer}
                </Region>
            )}
        </Region>
    );
};
