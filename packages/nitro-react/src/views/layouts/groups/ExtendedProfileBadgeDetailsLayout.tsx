import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1200_extended_profile_badge_details_xml` (layout "extended_profile_badge_details", 263x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExtendedProfileBadgeDetailsLayoutProps {
    detailsList?: ExtendedProfileBadgeDetailsLayoutDetailsListProps;
    layout?: BoxLayout;
}

export const ExtendedProfileBadgeDetailsLayout = ({ detailsList, layout }: ExtendedProfileBadgeDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 263, height: 25, ...layout }}>
            <Border
                variant="0"
                name="test"
                layout={{ position: 'absolute', left: 87, width: 263, top: 53, height: 25 }}
            >
                <ExtendedProfileBadgeDetailsLayoutDetailsList {...detailsList} />
            </Border>
        </Region>
    );
};

/** Row template `name` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutNameItemProps {
    captionName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ExtendedProfileBadgeDetailsLayoutNameItem = ({ captionName, layout, tags }: ExtendedProfileBadgeDetailsLayoutNameItemProps) => {
    return (
        <Region
            name="name"
            tags={tags}
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
    tags?: string[];
}

export const ExtendedProfileBadgeDetailsLayoutDescriptionItem = ({ captionDescription, layout, tags }: ExtendedProfileBadgeDetailsLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            tags={tags}
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
    tags?: string[];
    visibleRarityTag?: boolean;
}

export const ExtendedProfileBadgeDetailsLayoutRarityTagItem = ({ captionRarity, captionRarityBorder, layout, tags, visibleRarityTag }: ExtendedProfileBadgeDetailsLayoutRarityTagItemProps) => {
    return (
        <Region
            visible={visibleRarityTag ?? false}
            layout={{ width: 92, height: 17, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="rarity_tag"
                tags={tags}
                tintColor="#cccccc"
                layout={{ width: '100%', height: '100%' }}
            >
                <Region
                    name="rarity_border"
                    tags={[ 'BLEND_SUBTRACT' ]}
                    layout={{ position: 'absolute', left: 5, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRarityBorder ?? 'Unique badge'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="rarity"
                    tags={[ 'BLEND_INVERT' ]}
                    layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRarity ?? 'Unique badge'}
                        textStyle="text-style-bold"
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `owner_count` of ExtendedProfileBadgeDetailsLayout - pass real rows through its `items…` slot. */
export interface ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps {
    captionOwnerCount?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ExtendedProfileBadgeDetailsLayoutOwnerCountItem = ({ captionOwnerCount, layout, tags }: ExtendedProfileBadgeDetailsLayoutOwnerCountItemProps) => {
    return (
        <Region
            name="owner_count"
            tags={tags}
            visible={false}
            layout={{ width: 250, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOwnerCount ?? ''}
                textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 250 }}
            />
        </Region>
    );
};

/** Named region `details_list` of ExtendedProfileBadgeDetailsLayout - configured through the parent's `detailsList` prop. */
export interface ExtendedProfileBadgeDetailsLayoutDetailsListProps {
    itemsDetailsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ExtendedProfileBadgeDetailsLayoutDetailsList = ({ itemsDetailsList, layout, tags }: ExtendedProfileBadgeDetailsLayoutDetailsListProps) => {
    return (
        <Region
            name="details_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 263, top: 6, height: 11, flexDirection: 'column', gap: 3, ...layout }}
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
    );
};
