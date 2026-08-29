import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1200_extended_profile_badge_details_xml` (layout "extended_profile_badge_details", 263x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExtendedProfileBadgeDetailsLayoutProps {
    itemsDetailsList?: ReactNode;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayout = ({ itemsDetailsList, layout }: ExtendedProfileBadgeDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 263, height: 25, ...layout }}>
            <Border
                variant="0"
                name="test"
                layout={{ position: 'absolute', left: 87, width: 263, top: 53, height: 25 }}
            >
                <Region
                    name="details_list"
                    layout={{ position: 'absolute', left: 0, width: 263, top: 6, height: 11, flexDirection: 'column', gap: 3 }}
                >
                    {itemsDetailsList ?? (
                        <>
                            <ExtendedProfileBadgeDetailsLayoutNameItem />
                            <ExtendedProfileBadgeDetailsLayoutDescriptionItem />
                            <ExtendedProfileBadgeDetailsLayoutRarityTagItem />
                            <ExtendedProfileBadgeDetailsLayoutOwnerCountItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `name` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutNameItemProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayoutNameItem = ({ captionName, layout }: ExtendedProfileBadgeDetailsLayoutNameItemProps) => {
    return (
        <Region
            name="name"
            layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionName ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            />
        </Region>
    );
};

/** Row template `description` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayoutDescriptionItem = ({ captionDescription, layout }: ExtendedProfileBadgeDetailsLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
            />
        </Region>
    );
};

/** Row template `rarity_tag` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutRarityTagItemProps {
    captionRarity?: string;
    captionRarityBorder?: string;
    layout?: BoxLayout;
    visibleRarityTag?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutRarityTagItem = ({ captionRarity, captionRarityBorder, layout, visibleRarityTag }: ExtendedProfileBadgeDetailsLayoutRarityTagItemProps) => {
    return (
        (visibleRarityTag ?? false) && (
            <Border
                variant="2"
                name="rarity_tag"
                tintColor="#cccccc"
                layout={{ width: 92, height: 17, flexShrink: 0, ...layout }}
            >
                <Region
                    name="rarity_border"
                    layout={{ position: 'absolute', left: 5, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRarityBorder ?? 'Unique badge'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="rarity"
                    layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRarity ?? 'Unique badge'}
                        textStyle="text-style-bold"
                    />
                </Region>
            </Border>
        )
    );
};

/** Row template `owner_count` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps {
    captionOwnerCount?: string;
    layout?: BoxLayout;
    visibleOwnerCount?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutOwnerCountItem = ({ captionOwnerCount, layout, visibleOwnerCount }: ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps) => {
    return (
        (visibleOwnerCount ?? false) && (
            <Region
                name="owner_count"
                layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionOwnerCount ?? ''}
                    textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
        )
    );
};
