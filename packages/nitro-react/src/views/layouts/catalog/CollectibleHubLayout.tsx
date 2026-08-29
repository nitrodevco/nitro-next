import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1531_collectible_hub_xml` (layout "collectible_view", 500x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleHubLayoutProps {
    collectionsContainer?: CollectibleHubLayoutCollectionsContainerProps;
    collectorHubHeader?: CollectibleHubLayoutCollectorHubHeaderProps;
    collectorProfileContainer?: CollectibleHubLayoutCollectorProfileContainerProps;
    infoContainer?: CollectibleHubLayoutInfoContainerProps;
    layout?: BoxLayout;
    levelsContainer?: CollectibleHubLayoutLevelsContainerProps;
    mintingContainer?: CollectibleHubLayoutMintingContainerProps;
    onClose?: () => void;
    onTopViewCollectionsButton?: () => void;
    onTopViewInfoButton?: () => void;
    onTopViewLevelsButton?: () => void;
    onTopViewMintingButton?: () => void;
    onTopViewProfileButton?: () => void;
    onTopViewRewardsButton?: () => void;
    onTopViewShopButton?: () => void;
    onTopViewTransferButton?: () => void;
    rewardsContainer?: CollectibleHubLayoutRewardsContainerProps;
    shopContainer?: CollectibleHubLayoutShopContainerProps;
    transferContainer?: CollectibleHubLayoutTransferContainerProps;
    visibleTopViewLevelsButton?: boolean;
    visibleTopViewProfileButton?: boolean;
}

export const CollectibleHubLayout = ({ collectionsContainer, collectorHubHeader, collectorProfileContainer, infoContainer, layout, levelsContainer, mintingContainer, onClose, onTopViewCollectionsButton, onTopViewInfoButton, onTopViewLevelsButton, onTopViewMintingButton, onTopViewProfileButton, onTopViewRewardsButton, onTopViewShopButton, onTopViewTransferButton, rewardsContainer, shopContainer, transferContainer, visibleTopViewLevelsButton, visibleTopViewProfileButton }: CollectibleHubLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="CollectorHub"
            name="CollectorHub"
            caption={t('collectibles.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            layout={{ width: 500, height: 600, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <CollectibleHubLayoutCollectorHubHeader {...collectorHubHeader} />
                <TabContext
                    variant="3"
                    name="top_view_select_tab_context"
                    tintColor="#dfdfe1"
                    layout={{ position: 'absolute', left: -5, width: 498, top: 89, height: 34 }}
                >
                    <TabButton
                        variant="3"
                        name="top_view_rewards_button"
                        onPointerTap={onTopViewRewardsButton}
                        layout={{ position: 'absolute', left: 0, width: 72, top: 0, height: 32 }}
                    >
                        Rewards
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_collections_button"
                        onPointerTap={onTopViewCollectionsButton}
                        layout={{ position: 'absolute', left: 72, width: 87, top: 0, height: 32 }}
                    >
                        Collectibles
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_shop_button"
                        onPointerTap={onTopViewShopButton}
                        layout={{ position: 'absolute', left: 159, width: 52, top: 0, height: 32 }}
                    >
                        Shop
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_minting_button"
                        onPointerTap={onTopViewMintingButton}
                        layout={{ position: 'absolute', left: 211, width: 66, top: 0, height: 32 }}
                    >
                        Minting
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_transfer_button"
                        onPointerTap={onTopViewTransferButton}
                        layout={{ position: 'absolute', left: 277, width: 70, top: 0, height: 32 }}
                    >
                        Transfer
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_info_button"
                        onPointerTap={onTopViewInfoButton}
                        layout={{ position: 'absolute', left: 347, width: 46, top: 0, height: 32 }}
                    >
                        Info
                    </TabButton>
                    <Region
                        visible={visibleTopViewProfileButton ?? false}
                        layout={{ position: 'absolute', left: 393, width: 135, top: 0, height: 32 }}
                    >
                        <TabButton
                            variant="3"
                            name="top_view_profile_button"
                            onPointerTap={onTopViewProfileButton}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            My Collector Profile
                        </TabButton>
                    </Region>
                    <Region
                        visible={visibleTopViewLevelsButton ?? false}
                        layout={{ position: 'absolute', left: 528, width: 58, top: 0, height: 32 }}
                    >
                        <TabButton
                            variant="3"
                            name="top_view_levels_button"
                            onPointerTap={onTopViewLevelsButton}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            Levels
                        </TabButton>
                    </Region>
                </TabContext>
                <CollectibleHubLayoutMintingContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...mintingContainer}
                />
                <CollectibleHubLayoutCollectorProfileContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...collectorProfileContainer}
                />
                <CollectibleHubLayoutCollectionsContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...collectionsContainer}
                />
                <CollectibleHubLayoutShopContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...shopContainer}
                />
                <CollectibleHubLayoutTransferContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...transferContainer}
                />
                <CollectibleHubLayoutLevelsContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...levelsContainer}
                />
                <CollectibleHubLayoutInfoContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...infoContainer}
                />
                <CollectibleHubLayoutRewardsContainer
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    {...rewardsContainer}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: -8, width: 410, top: 56, height: 1 }}
                >
                    <ThemeImage
                        src={layoutImage('talent_task_progress_bg.png')}
                        layout={{ position: 'absolute', left: -8, width: 410, top: 56, height: 1 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `score_container` of CollectibleHubLayout - configured through the parent's `scoreContainer` prop. */
export interface CollectibleHubLayoutScoreContainerProps {
    captionCaptionAllTimeHighScore?: string;
    captionCaptionCurrentScore?: string;
    captionCurrentHiscoreKey?: string;
    captionCurrentHiscoreValue?: string;
    captionCurrentScoreKey?: string;
    captionCurrentScoreValue?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutScoreContainer = ({ captionCaptionAllTimeHighScore, captionCaptionCurrentScore, captionCurrentHiscoreKey, captionCurrentHiscoreValue, captionCurrentScoreKey, captionCurrentScoreValue, layout, tags }: CollectibleHubLayoutScoreContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="score_container"
            tags={tags}
            layout={{ position: 'absolute', left: 116, width: 220, top: 21, height: 45, ...layout }}
        >
            <Region
                name="current_score_key"
                layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCurrentScoreKey ?? t('collectibles.score')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
            <Region
                name="current_score_value"
                layout={{ position: 'absolute', left: 158, width: 10, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCurrentScoreValue ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="current_hiscore_key"
                layout={{ position: 'absolute', left: 0, width: 158, top: 26, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCurrentHiscoreKey ?? t('collectibles.high_score')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
            <Region
                name="current_hiscore_value"
                layout={{ position: 'absolute', left: 158, width: 11, top: 26, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCurrentHiscoreValue ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="caption_current_score"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCaptionCurrentScore ?? 'My Habbo Collector Score: 999999'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
            <Region
                name="caption_all_time_high_score"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 197, top: 25, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionCaptionAllTimeHighScore ?? 'My all time high score: 999999'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `level_container` of CollectibleHubLayout - configured through the parent's `levelContainer` prop. */
export interface CollectibleHubLayoutLevelContainerProps {
    captionCollectorLevel?: string;
    captionLevelTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutLevelContainer = ({ captionCollectorLevel, captionLevelTitle, layout, tags }: CollectibleHubLayoutLevelContainerProps) => {
    return (
        <Region
            name="level_container"
            tags={tags}
            layout={{ position: 'absolute', left: 344, width: 45, top: 16, height: 35, ...layout }}
        >
            <Region
                name="collector_level"
                layout={{ position: 'absolute', left: 2, width: 40, top: 0, height: 26, maxWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCollectorLevel ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <Region
                name="level_title"
                layout={{ position: 'absolute', left: 3, width: 41, top: 22, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionLevelTitle ?? 'LEVEL'}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `collector_hub_header` of CollectibleHubLayout - configured through the parent's `collectorHubHeader` prop. */
export interface CollectibleHubLayoutCollectorHubHeaderProps {
    captionEmeraldCurrencyValue?: string;
    captionSilverCurrencyValue?: string;
    layout?: BoxLayout;
    levelContainer?: CollectibleHubLayoutLevelContainerProps;
    scoreContainer?: CollectibleHubLayoutScoreContainerProps;
    srcCollectableBgLeft?: string;
    srcCollectableBgRight?: string;
    srcCollectorLevelBg?: string;
    srcCollectorLevelBg2?: string;
    srcEmeraldCurrencyIcon?: string;
    srcSilverCurrencyIcon?: string;
    tags?: string[];
    visibleTabBg?: boolean;
}

export const CollectibleHubLayoutCollectorHubHeader = ({ captionEmeraldCurrencyValue, captionSilverCurrencyValue, layout, levelContainer, scoreContainer, srcCollectableBgLeft, srcCollectableBgRight, srcCollectorLevelBg, srcCollectorLevelBg2, srcEmeraldCurrencyIcon, srcSilverCurrencyIcon, tags, visibleTabBg }: CollectibleHubLayoutCollectorHubHeaderProps) => {
    return (
        <Region
            name="collector_hub_header"
            tags={tags}
            backgroundColor="#0b162d"
            layout={{ position: 'absolute', left: -5, width: 500, top: -2, height: 122, ...layout }}
        >
            <Border
                variant="3"
                name="collector_hub_background"
                tintColor="#2c1d29"
                layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 125 }}
            >
                <ThemeImage
                    src={layoutImage('collectables_score_background_gradient.png')}
                    tint="#804138"
                    layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 122 }}
                />
                <ThemeImage
                    name="collectable_bg_left"
                    src={srcCollectableBgLeft ?? layoutImage('collectables_score_background.png')}
                    tint="#fc7c5a"
                    layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 121 }}
                />
                <ThemeImage
                    name="collectable_bg_right"
                    src={srcCollectableBgRight ?? layoutImage('collectables_score_background_right.png')}
                    tint="#fc7c5a"
                    layout={{ position: 'absolute', left: 332, width: 166, top: -160, height: 286 }}
                />
                <ThemeImage
                    name="collector_level_bg2"
                    src={srcCollectorLevelBg2 ?? layoutImage('collectables_score_element2.png')}
                    tint="#7c8c92"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 17, height: 54 }}
                />
                <ThemeImage
                    name="collector_level_bg"
                    src={srcCollectorLevelBg ?? layoutImage('collectables_score_element.png')}
                    tint="#7c8c92"
                    layout={{ position: 'absolute', left: 299, width: 92, top: 17, height: 72 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_cabinet_element.png')}
                    layout={{ position: 'absolute', left: -2, width: 130, top: -1, height: 128 }}
                />
                <CollectibleHubLayoutScoreContainer {...scoreContainer} />
                <ThemeImage
                    src={layoutImage('collectables_level_bg.png')}
                    layout={{ position: 'absolute', left: 335, width: 64, top: 2, height: 68 }}
                />
                <CollectibleHubLayoutLevelContainer {...levelContainer} />
                <Border
                    variant="3"
                    name="silver_currency_border"
                    tintColor="#a99490"
                    layout={{ position: 'absolute', left: 419, width: 70, top: 18, height: 22 }}
                >
                    <Border
                        variant="3"
                        name="silver_currency_container"
                        tintColor="#3a2f29"
                        layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                    >
                        <Region
                            name="silver_currency_value"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionSilverCurrencyValue ?? '0'}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    name="silver_currency_icon"
                    src={srcSilverCurrencyIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                    layout={{ position: 'absolute', left: 466, width: 24, top: 17, height: 24 }}
                />
                <Border
                    variant="3"
                    name="emerald_currency_border"
                    tintColor="#a99490"
                    layout={{ position: 'absolute', left: 419, width: 70, top: 48, height: 22 }}
                >
                    <Border
                        variant="3"
                        name="emerald_currency_container"
                        tintColor="#3a2f29"
                        layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                    >
                        <Region
                            name="emerald_currency_value"
                            layout={{ position: 'absolute', left: 2, width: 45, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionEmeraldCurrencyValue ?? '0'}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Border>
                </Border>
                <ThemeImage
                    name="emerald_currency_icon"
                    src={srcEmeraldCurrencyIcon ?? layoutImage('pursearea_mid_emerald_icon.png')}
                    layout={{ position: 'absolute', left: 466, width: 24, top: 47, height: 24 }}
                />
            </Border>
            <Region
                visible={visibleTabBg ?? false}
                layout={{ position: 'absolute', left: -2, width: 502, top: 91, height: 39 }}
            >
                <Border
                    variant="3"
                    name="tab_bg"
                    tintColor="#000000"
                    blend={0.4}
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_name_region` of CollectibleHubLayout - configured through the parent's `categoryNameRegion` prop. */
export interface CollectibleHubLayoutCategoryNameRegionProps {
    captionMintingHeader?: string;
    layout?: BoxLayout;
    onCategoryNameRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryNameRegion = ({ captionMintingHeader, layout, onCategoryNameRegion, tags }: CollectibleHubLayoutCategoryNameRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_name_region"
            tags={tags}
            onPointerTap={onCategoryNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17, ...layout }}
        >
            <Region
                name="minting_header"
                layout={{ position: 'absolute', left: 0, width: 130, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMintingHeader ?? t('shop.minting.info.title')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `category_minting_description_region` of CollectibleHubLayout - configured through the parent's `categoryMintingDescriptionRegion` prop. */
export interface CollectibleHubLayoutCategoryMintingDescriptionRegionProps {
    captionMintingDescription?: string;
    layout?: BoxLayout;
    onCategoryMintingDescriptionRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryMintingDescriptionRegion = ({ captionMintingDescription, layout, onCategoryMintingDescriptionRegion, tags }: CollectibleHubLayoutCategoryMintingDescriptionRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_minting_description_region"
            tags={tags}
            onPointerTap={onCategoryMintingDescriptionRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 35, ...layout }}
        >
            <Region
                name="minting_description"
                layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 35, minWidth: 2, maxWidth: 480, minHeight: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMintingDescription ?? t('shop.minting.info.description')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_minting_header_region` of CollectibleHubLayout - configured through the parent's `categoryMintingHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryMintingHeaderRegionProps {
    categoryMintingDescriptionRegion?: CollectibleHubLayoutCategoryMintingDescriptionRegionProps;
    categoryNameRegion?: CollectibleHubLayoutCategoryNameRegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryMintingHeaderRegion = ({ categoryMintingDescriptionRegion, categoryNameRegion, layout, tags }: CollectibleHubLayoutCategoryMintingHeaderRegionProps) => {
    return (
        <Region
            name="category_minting_header_region"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 58, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryNameRegion {...categoryNameRegion} />
            <CollectibleHubLayoutCategoryMintingDescriptionRegion {...categoryMintingDescriptionRegion} />
        </Region>
    );
};

/** Named region `number_container` of CollectibleHubLayout - configured through the parent's `numberContainer` prop. */
export interface CollectibleHubLayoutNumberContainerProps {
    captionNumber?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutNumberContainer = ({ captionNumber, layout, tags }: CollectibleHubLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Border
                variant="3"
                name="text_border"
                tintColor="#337c00"
                layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
            />
            <Region
                name="number"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNumber ?? 'x10'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItemProps {
    layout?: BoxLayout;
    numberContainer?: CollectibleHubLayoutNumberContainerProps;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem = ({ layout, numberContainer, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage, tags }: CollectibleHubLayoutItemTemplateItemProps) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
            >
                <ThemeImage
                    name="bitmap"
                    tags={[ 'BITMAP' ]}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
                />
            </Region>
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                visible={false}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 18 }}
            >
                <ThemeImage
                    name="unknown_image"
                    src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 18 }}
                />
            </Region>
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <CollectibleHubLayoutNumberContainer {...numberContainer} />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
            >
                <ThemeImage
                    name="checkmark_icon"
                    src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                    layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `itemgrid_inventory` of CollectibleHubLayout - configured through the parent's `itemgridInventory` prop. */
export interface CollectibleHubLayoutItemgridInventoryProps {
    itemsItemgridInventory?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemgridInventory = ({ itemsItemgridInventory, layout, tags }: CollectibleHubLayoutItemgridInventoryProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 179, top: 0, height: 260, ...layout }}
        >
            <Region
                name="itemgrid_inventory"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridInventory ?? (
                    <CollectibleHubLayoutItemTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `product_name_container` of CollectibleHubLayout - configured through the parent's `productNameContainer` prop. */
export interface CollectibleHubLayoutProductNameContainerProps {
    captionPreviewFurniName?: string;
    layout?: BoxLayout;
    onProductNameContainer?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutProductNameContainer = ({ captionPreviewFurniName, layout, onProductNameContainer, tags }: CollectibleHubLayoutProductNameContainerProps) => {
    return (
        <Region
            name="product_name_container"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onProductNameContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26, ...layout }}
        >
            <Region
                name="preview_furni_name"
                layout={{ position: 'absolute', left: 0, width: 290, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPreviewFurniName ?? 'Lorem ipsum hot air balloon'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacingProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing = ({ layout, tags }: CollectibleHubLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 3, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacing2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing2 = ({ layout, tags }: CollectibleHubLayoutSpacing2Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 7, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `collect_container` of CollectibleHubLayout - configured through the parent's `collectContainer` prop. */
export interface CollectibleHubLayoutCollectContainerProps {
    captionStampPricing?: string;
    layout?: BoxLayout;
    onCollectButton?: () => void;
    spacing?: CollectibleHubLayoutSpacingProps;
    spacing2?: CollectibleHubLayoutSpacing2Props;
    tags?: string[];
}

export const CollectibleHubLayoutCollectContainer = ({ captionStampPricing, layout, onCollectButton, spacing, spacing2, tags }: CollectibleHubLayoutCollectContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="collect_container"
            tags={tags}
            layout={{ position: 'absolute', left: 82, width: 200, top: 180, height: 30, ...layout }}
        >
            <Region layout={{ position: 'absolute', right: 0, top: 0, flexDirection: 'row' }}>
                <Region
                    name="stamp_pricing"
                    layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStampPricing ?? '1'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <CollectibleHubLayoutSpacing {...spacing} />
                <ThemeImage
                    src={layoutImage('collectables_icon_curator_stamp_small.png')}
                    layout={{ width: 18, height: 30, flexShrink: 0 }}
                />
                <CollectibleHubLayoutSpacing2 {...spacing2} />
                <Button
                    variant="5"
                    name="collect_button"
                    tintColor="#01a101"
                    onPointerTap={onCollectButton}
                    layout={{ width: 62, height: 30, flexShrink: 0 }}
                >
                    {t('collectibles.collect')}
                </Button>
            </Region>
        </Region>
    );
};

/** Named region `progress_bar_top` of CollectibleHubLayout - configured through the parent's `progressBarTop` prop. */
export interface CollectibleHubLayoutProgressBarTopProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBarTop = ({ layout, tags }: CollectibleHubLayoutProgressBarTopProps) => {
    return (
        <Region
            name="progress_bar_top"
            tags={tags}
            backgroundColor="#00910a"
            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8, ...layout }}
        />
    );
};

/** Named region `progress_bar_bottom` of CollectibleHubLayout - configured through the parent's `progressBarBottom` prop. */
export interface CollectibleHubLayoutProgressBarBottomProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBarBottom = ({ layout, tags }: CollectibleHubLayoutProgressBarBottomProps) => {
    return (
        <Region
            name="progress_bar_bottom"
            tags={tags}
            backgroundColor="#037c00"
            layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8, ...layout }}
        />
    );
};

/** Named region `progress_padded_bar` of CollectibleHubLayout - configured through the parent's `progressPaddedBar` prop. */
export interface CollectibleHubLayoutProgressPaddedBarProps {
    layout?: BoxLayout;
    progressBarBottom?: CollectibleHubLayoutProgressBarBottomProps;
    progressBarTop?: CollectibleHubLayoutProgressBarTopProps;
    tags?: string[];
}

export const CollectibleHubLayoutProgressPaddedBar = ({ layout, progressBarBottom, progressBarTop, tags }: CollectibleHubLayoutProgressPaddedBarProps) => {
    return (
        <Region
            name="progress_padded_bar"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 220, top: 1, height: 16, ...layout }}
        >
            <CollectibleHubLayoutProgressBarTop {...progressBarTop} />
            <CollectibleHubLayoutProgressBarBottom {...progressBarBottom} />
        </Region>
    );
};

/** Named region `progress_bar` of CollectibleHubLayout - configured through the parent's `progressBar` prop. */
export interface CollectibleHubLayoutProgressBarProps {
    captionProgressBarText?: string;
    layout?: BoxLayout;
    progressPaddedBar?: CollectibleHubLayoutProgressPaddedBarProps;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBar = ({ captionProgressBarText, layout, progressPaddedBar, tags }: CollectibleHubLayoutProgressBarProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_bar"
            tags={tags}
            backgroundColor="#112e31"
            layout={{ position: 'absolute', left: 0, width: 220, top: 24, height: 18, ...layout }}
        >
            <CollectibleHubLayoutProgressPaddedBar {...progressPaddedBar} />
            <Region
                name="progress_bar_text"
                layout={{ position: 'absolute', left: 0, width: 220, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProgressBarText ?? t('collectibles.preview.time_left')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `right_box` of CollectibleHubLayout - configured through the parent's `rightBox` prop. */
export interface CollectibleHubLayoutRightBoxProps {
    captionMintLockText?: string;
    layout?: BoxLayout;
    progressBar?: CollectibleHubLayoutProgressBarProps;
    tags?: string[];
}

export const CollectibleHubLayoutRightBox = ({ captionMintLockText, layout, progressBar, tags }: CollectibleHubLayoutRightBoxProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_box"
            tags={tags}
            layout={{ position: 'absolute', left: 64, width: 226, top: 0, height: 46, justifyContent: 'center', ...layout }}
        >
            <Region
                name="mint_lock_text"
                layout={{ position: 'absolute', marginLeft: 32, marginRight: -32, width: 290, top: 4, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMintLockText ?? t('shop.minting.region_unlocked')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290 }}
                />
            </Region>
            <CollectibleHubLayoutProgressBar {...progressBar} />
        </Region>
    );
};

/** Named region `mint_info_container` of CollectibleHubLayout - configured through the parent's `mintInfoContainer` prop. */
export interface CollectibleHubLayoutMintInfoContainerProps {
    layout?: BoxLayout;
    rightBox?: CollectibleHubLayoutRightBoxProps;
    tags?: string[];
}

export const CollectibleHubLayoutMintInfoContainer = ({ layout, rightBox, tags }: CollectibleHubLayoutMintInfoContainerProps) => {
    return (
        <Region
            name="mint_info_container"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 290, top: 214, height: 46, ...layout }}
        >
            <CollectibleHubLayoutRightBox {...rightBox} />
        </Region>
    );
};

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainerProps {
    collectContainer?: CollectibleHubLayoutCollectContainerProps;
    layout?: BoxLayout;
    mintInfoContainer?: CollectibleHubLayoutMintInfoContainerProps;
    productNameContainer?: CollectibleHubLayoutProductNameContainerProps;
    srcBgStar?: string;
    srcMintLockClosedIcon?: string;
    srcMintLockOpenIcon?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutPreviewContainer = ({ collectContainer, layout, mintInfoContainer, productNameContainer, srcBgStar, srcMintLockClosedIcon, srcMintLockOpenIcon, srcPlaceholderImage, srcProductPreview, srcUnknownImage, tags }: CollectibleHubLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 191, width: 290, top: 0, height: 260, ...layout }}
        >
            <Border
                variant="3"
                name="collection_preview_bg"
                tintColor="#3d1f39"
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, justifyContent: 'center' }}
            >
                <ThemeImage
                    src={layoutImage('collectables_score_background.png')}
                    layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_right.png')}
                    layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_gradient2.png')}
                    tint="#45ace2"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                />
                <ThemeImage
                    name="bg_star"
                    src={srcBgStar ?? layoutImage('bg_star_300x300.png')}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                >
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    visible={false}
                    layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                >
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    visible={false}
                    options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                />
                <WidgetSlot
                    widgetType="room_previewer"
                    name="effect_image_widget"
                    visible={false}
                    options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                >
                    <ThemeImage
                        name="product_preview"
                        src={srcProductPreview}
                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                    />
                </Region>
                <CollectibleHubLayoutProductNameContainer {...productNameContainer} />
                <CollectibleHubLayoutCollectContainer {...collectContainer} />
                <Border
                    variant="3"
                    name="no_furni_notify"
                    tintColor="#5a1003"
                    blend={0.82}
                    layout={{ position: 'absolute', left: 4, width: 282, top: 30, height: 50, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', width: 274, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 16, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('shop.minting.no_furni')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                        />
                    </Region>
                </Border>
                <CollectibleHubLayoutMintInfoContainer {...mintInfoContainer} />
                <ThemeImage
                    name="mint_lock_open_icon"
                    src={srcMintLockOpenIcon ?? layoutImage('collectables_lock_open.png')}
                    layout={{ position: 'absolute', left: 7, width: 51, top: 208, height: 46 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                >
                    <ThemeImage
                        name="mint_lock_closed_icon"
                        src={srcMintLockClosedIcon ?? layoutImage('collectables_lock_closed.png')}
                        layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `furniture_container` of CollectibleHubLayout - configured through the parent's `furnitureContainer` prop. */
export interface CollectibleHubLayoutFurnitureContainerProps {
    itemgridInventory?: CollectibleHubLayoutItemgridInventoryProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainerProps;
    tags?: string[];
}

export const CollectibleHubLayoutFurnitureContainer = ({ itemgridInventory, layout, previewContainer, tags }: CollectibleHubLayoutFurnitureContainerProps) => {
    return (
        <Region
            name="furniture_container"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 480, top: 60, height: 262, ...layout }}
        >
            <CollectibleHubLayoutItemgridInventory
                tags={[ 'FURNI_ITEM_GRID' ]}
                {...itemgridInventory}
            />
            <CollectibleHubLayoutPreviewContainer {...previewContainer} />
        </Region>
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacing3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing3 = ({ layout, tags }: CollectibleHubLayoutSpacing3Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 4, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacing4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing4 = ({ layout, tags }: CollectibleHubLayoutSpacing4Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 6, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `stamp_purchasing_container` of CollectibleHubLayout - configured through the parent's `stampPurchasingContainer` prop. */
export interface CollectibleHubLayoutStampPurchasingContainerProps {
    captionMintTokenBalance?: string;
    captionSilverCostText?: string;
    captionStampsHeader?: string;
    captionStampsHeader2?: string;
    layout?: BoxLayout;
    onSilverBuyButton?: () => void;
    onStampsPurchaseDropdown?: () => void;
    spacing?: CollectibleHubLayoutSpacing3Props;
    spacing2?: CollectibleHubLayoutSpacing4Props;
    tags?: string[];
}

export const CollectibleHubLayoutStampPurchasingContainer = ({ captionMintTokenBalance, captionSilverCostText, captionStampsHeader, captionStampsHeader2, layout, onSilverBuyButton, onStampsPurchaseDropdown, spacing, spacing2, tags }: CollectibleHubLayoutStampPurchasingContainerProps) => {
    const t = useTranslation();
    const [ stampsPurchaseInputValue, setStampsPurchaseInputValue ] = useState('');

    return (
        <Region
            name="stamp_purchasing_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100, ...layout }}
        >
            <Border
                variant="3"
                name="stamps_container"
                tintColor="#d6dbe1"
                layout={{ position: 'absolute', left: 42, width: 200, top: 14, height: 72 }}
            >
                <ThemeImage
                    src={layoutImage('collectables_icon_curator_stamp_large.png')}
                    layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                />
                <Region
                    name="stamps_header"
                    layout={{ position: 'absolute', left: 68, width: 122, top: 12, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStampsHeader ?? t('shop.minting.tokens')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="mint_token_balance"
                    layout={{ position: 'absolute', left: 67, width: 21, top: 26, height: 37, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMintTokenBalance ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Border>
            <Border
                variant="3"
                name="stamp_buying_container"
                tintColor="#d6dbe1"
                layout={{ position: 'absolute', left: 246, width: 200, top: 14, height: 72 }}
            >
                <Region layout={{ position: 'absolute', right: 4, top: 4, flexDirection: 'row', gap: 6 }}>
                    <Region
                        name="stamps_header"
                        layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionStampsHeader2 ?? t('collectibles.buy.mint.tokens')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ width: 30, height: 25, flexShrink: 0 }}
                    >
                        <Border
                            variant="5"
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <TextInput
                                value={stampsPurchaseInputValue}
                                onChange={setStampsPurchaseInputValue}
                                layout={{ position: 'absolute', left: 3, width: 23, top: 5, height: 15 }}
                            />
                        </Border>
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="stamps_purchase_dropdown"
                        onPointerTap={onStampsPurchaseDropdown}
                        layout={{ width: 48, height: 21, flexShrink: 0 }}
                    >
                        100
                    </Dropmenu>
                </Region>
                <Region layout={{ position: 'absolute', right: 4, top: 36, flexDirection: 'row' }}>
                    <Region
                        name="silver_cost_text"
                        layout={{ width: 13, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSilverCostText ?? '1'}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <CollectibleHubLayoutSpacing3 {...spacing} />
                    <ThemeImage
                        src={layoutImage('pursearea_mid_silver_icon.png')}
                        layout={{ width: 24, height: 30, flexShrink: 0 }}
                    />
                    <CollectibleHubLayoutSpacing4 {...spacing2} />
                    <Button
                        variant="5"
                        name="silver_buy_button"
                        tintColor="#2095d4"
                        onPointerTap={onSilverBuyButton}
                        layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                    >
                        {t('generic.buy')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `no_wallet_container` of CollectibleHubLayout - configured through the parent's `noWalletContainer` prop. */
export interface CollectibleHubLayoutNoWalletContainerProps {
    captionNoWalletText?: string;
    layout?: BoxLayout;
    onCreateWalletButton?: () => void;
    onMoreInfoButton?: () => void;
    tags?: string[];
    visibleNoWalletContainer?: boolean;
}

export const CollectibleHubLayoutNoWalletContainer = ({ captionNoWalletText, layout, onCreateWalletButton, onMoreInfoButton, tags, visibleNoWalletContainer }: CollectibleHubLayoutNoWalletContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_wallet_container"
            tags={tags}
            visible={visibleNoWalletContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100, ...layout }}
        >
            <Region
                name="no_wallet_text"
                layout={{ position: 'absolute', left: 10, width: 360, alignSelf: 'center', marginTop: -41.5, marginBottom: 41.5, height: 17, minHeight: 0, maxHeight: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNoWalletText ?? t('shop.minting.no_wallet.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('image_connection_problem.png')}
                layout={{ position: 'absolute', left: 380, width: 92, top: 5, height: 90 }}
            />
            <Button
                variant="5"
                name="create_wallet_button"
                tintColor="#2095d4"
                onPointerTap={onCreateWalletButton}
                layout={{ position: 'absolute', left: 10, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
            >
                {t('shop.minting.create.wallet')}
            </Button>
            <Button
                variant="5"
                name="more_info_button"
                tintColor="#2095d4"
                onPointerTap={onMoreInfoButton}
                layout={{ position: 'absolute', left: 192, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
            >
                {t('shop.minting.link.wallet')}
            </Button>
        </Region>
    );
};

/** Named region `category_footer` of CollectibleHubLayout - configured through the parent's `categoryFooter` prop. */
export interface CollectibleHubLayoutCategoryFooterProps {
    layout?: BoxLayout;
    noWalletContainer?: CollectibleHubLayoutNoWalletContainerProps;
    stampPurchasingContainer?: CollectibleHubLayoutStampPurchasingContainerProps;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryFooter = ({ layout, noWalletContainer, stampPurchasingContainer, tags }: CollectibleHubLayoutCategoryFooterProps) => {
    return (
        <Region
            name="category_footer"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 488, top: 330, height: 100, overflow: 'hidden', ...layout }}
        >
            <Border
                variant="3"
                name="large_border"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
            >
                <CollectibleHubLayoutStampPurchasingContainer {...stampPurchasingContainer} />
                <CollectibleHubLayoutNoWalletContainer {...noWalletContainer} />
            </Border>
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContentProps {
    categoryFooter?: CollectibleHubLayoutCategoryFooterProps;
    categoryMintingHeaderRegion?: CollectibleHubLayoutCategoryMintingHeaderRegionProps;
    furnitureContainer?: CollectibleHubLayoutFurnitureContainerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutLoadedContent = ({ categoryFooter, categoryMintingHeaderRegion, furnitureContainer, layout, tags }: CollectibleHubLayoutLoadedContentProps) => {
    return (
        <Region
            name="loaded_content"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 430, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryMintingHeaderRegion
                tags={[ 'category_header' ]}
                {...categoryMintingHeaderRegion}
            />
            <CollectibleHubLayoutFurnitureContainer {...furnitureContainer} />
            <CollectibleHubLayoutCategoryFooter
                tags={[ 'category_header' ]}
                {...categoryFooter}
            />
        </Region>
    );
};

/** Named region `loading_contents` of CollectibleHubLayout - configured through the parent's `loadingContents` prop. */
export interface CollectibleHubLayoutLoadingContentsProps {
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    tags?: string[];
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutLoadingContents = ({ layout, srcLoadingIcon, tags, visibleLoadingContents }: CollectibleHubLayoutLoadingContentsProps) => {
    return (
        <Region
            name="loading_contents"
            tags={tags}
            visible={visibleLoadingContents ?? false}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a4a49f"
                layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
            />
            <ThemeImage
                name="loading_icon"
                src={srcLoadingIcon ?? layoutImage('loading.png')}
                layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
            />
        </Region>
    );
};

/** Named region `mintingContainer` of CollectibleHubLayout - configured through the parent's `mintingContainer` prop. */
export interface CollectibleHubLayoutMintingContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContentProps;
    loadingContents?: CollectibleHubLayoutLoadingContentsProps;
    tags?: string[];
    visibleMintingContainer?: boolean;
}

export const CollectibleHubLayoutMintingContainer = ({ layout, loadedContent, loadingContents, tags, visibleMintingContainer }: CollectibleHubLayoutMintingContainerProps) => {
    return (
        <Region
            name="mintingContainer"
            tags={tags}
            visible={visibleMintingContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 10, top: 125, height: 430, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent {...loadedContent} />
            <CollectibleHubLayoutLoadingContents {...loadingContents} />
        </Region>
    );
};

/** Named region `category_name_region` of CollectibleHubLayout - configured through the parent's `categoryNameRegion` prop. */
export interface CollectibleHubLayoutCategoryNameRegion2Props {
    captionCollectorProfileHeader?: string;
    layout?: BoxLayout;
    onCategoryNameRegion?: () => void;
    tags?: string[];
    visibleCategoryNameRegion?: boolean;
}

export const CollectibleHubLayoutCategoryNameRegion2 = ({ captionCollectorProfileHeader, layout, onCategoryNameRegion, tags, visibleCategoryNameRegion }: CollectibleHubLayoutCategoryNameRegion2Props) => {
    return (
        <Region
            name="category_name_region"
            tags={tags}
            visible={visibleCategoryNameRegion ?? false}
            onPointerTap={onCategoryNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17, ...layout }}
        >
            <Region
                name="collector_profile_header"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorProfileHeader ?? 'Collector Profile Header'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `category_minting_description_region` of CollectibleHubLayout - configured through the parent's `categoryMintingDescriptionRegion` prop. */
export interface CollectibleHubLayoutCategoryMintingDescriptionRegion2Props {
    captionCollectorProfileDescription?: string;
    layout?: BoxLayout;
    onCategoryMintingDescriptionRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryMintingDescriptionRegion2 = ({ captionCollectorProfileDescription, layout, onCategoryMintingDescriptionRegion, tags }: CollectibleHubLayoutCategoryMintingDescriptionRegion2Props) => {
    return (
        <Region
            name="category_minting_description_region"
            tags={tags}
            onPointerTap={onCategoryMintingDescriptionRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30, ...layout }}
        >
            <Region
                name="collector_profile_description"
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_collector_header_region` of CollectibleHubLayout - configured through the parent's `categoryCollectorHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryCollectorHeaderRegionProps {
    categoryMintingDescriptionRegion?: CollectibleHubLayoutCategoryMintingDescriptionRegion2Props;
    categoryNameRegion?: CollectibleHubLayoutCategoryNameRegion2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryCollectorHeaderRegion = ({ categoryMintingDescriptionRegion, categoryNameRegion, layout, tags }: CollectibleHubLayoutCategoryCollectorHeaderRegionProps) => {
    return (
        <Region
            name="category_collector_header_region"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 56, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryNameRegion2 {...categoryNameRegion} />
            <CollectibleHubLayoutCategoryMintingDescriptionRegion2 {...categoryMintingDescriptionRegion} />
        </Region>
    );
};

/** Named region `category_content_background` of CollectibleHubLayout - configured through the parent's `categoryContentBackground` prop. */
export interface CollectibleHubLayoutCategoryContentBackgroundProps {
    categoryCollectorHeaderRegion?: CollectibleHubLayoutCategoryCollectorHeaderRegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryContentBackground = ({ categoryCollectorHeaderRegion, layout, tags }: CollectibleHubLayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryCollectorHeaderRegion
                tags={[ 'category_header' ]}
                {...categoryCollectorHeaderRegion}
            />
        </Region>
    );
};

/** Named region `collectorProfileContainer` of CollectibleHubLayout - configured through the parent's `collectorProfileContainer` prop. */
export interface CollectibleHubLayoutCollectorProfileContainerProps {
    categoryContentBackground?: CollectibleHubLayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
    tags?: string[];
    visibleCollectorProfileContainer?: boolean;
}

export const CollectibleHubLayoutCollectorProfileContainer = ({ categoryContentBackground, layout, tags, visibleCollectorProfileContainer }: CollectibleHubLayoutCollectorProfileContainerProps) => {
    return (
        <Region
            name="collectorProfileContainer"
            tags={tags}
            visible={visibleCollectorProfileContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 400, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryContentBackground {...categoryContentBackground} />
        </Region>
    );
};

/** Named region `buttonContainer` of CollectibleHubLayout - configured through the parent's `buttonContainer` prop. */
export interface CollectibleHubLayoutButtonContainerProps {
    layout?: BoxLayout;
    onSearchClearButton?: () => void;
    srcSearchIcon?: string;
    tags?: string[];
}

export const CollectibleHubLayoutButtonContainer = ({ layout, onSearchClearButton, srcSearchIcon, tags }: CollectibleHubLayoutButtonContainerProps) => {
    return (
        <Region
            name="buttonContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 160, width: 24, top: 0, height: 24, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="search_icon"
                src={srcSearchIcon ?? layoutImage('icons_close.png')}
                layout={{ position: 'absolute', width: 20, alignSelf: 'center', height: 20 }}
            />
            <Button
                variant="100"
                name="search_clear_button"
                tooltip="clear"
                onPointerTap={onSearchClearButton}
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 32 }}
            />
        </Region>
    );
};

/** Named region `item_hilight_inner` of CollectibleHubLayout - configured through the parent's `itemHilightInner` prop. */
export interface CollectibleHubLayoutItemHilightInnerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemHilightInner = ({ layout, tags }: CollectibleHubLayoutItemHilightInnerProps) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CollectibleHubLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CollectibleHubLayoutItemHilightOuterProps {
    itemHilightInner?: CollectibleHubLayoutItemHilightInnerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemHilightOuter = ({ itemHilightInner, layout, tags }: CollectibleHubLayoutItemHilightOuterProps) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CollectibleHubLayoutItemHilightInner {...itemHilightInner} />
        </Region>
    );
};

/** Named region `progress_container` of CollectibleHubLayout - configured through the parent's `progressContainer` prop. */
export interface CollectibleHubLayoutProgressContainerProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressContainer = ({ captionProgressText, layout, tags }: CollectibleHubLayoutProgressContainerProps) => {
    return (
        <Region
            name="progress_container"
            tags={tags}
            layout={{ position: 'absolute', left: 120, width: 36, top: 3, height: 15, minWidth: 36, maxWidth: 36, ...layout }}
        >
            <Border
                variant="3"
                name="progress_color"
                tintColor="#00910a"
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 14 }}
            />
            <Region
                name="progress_text"
                layout={{ position: 'absolute', left: 2, width: 32, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProgressText ?? '100%'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `progress_color_hint` of CollectibleHubLayout - configured through the parent's `progressColorHint` prop. */
export interface CollectibleHubLayoutProgressColorHintProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressColorHint = ({ layout, tags }: CollectibleHubLayoutProgressColorHintProps) => {
    return (
        <Region
            name="progress_color_hint"
            tags={tags}
            backgroundColor="#00910a"
            layout={{ position: 'absolute', left: 0, width: 4, top: 1, height: 19, minWidth: 4, maxWidth: 4, minHeight: 19, maxHeight: 19, ...layout }}
        />
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem2Props {
    captionItemTitle?: string;
    itemHilightOuter?: CollectibleHubLayoutItemHilightOuterProps;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    progressColorHint?: CollectibleHubLayoutProgressColorHintProps;
    progressContainer?: CollectibleHubLayoutProgressContainerProps;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem2 = ({ captionItemTitle, itemHilightOuter, layout, onItemTemplate, progressColorHint, progressContainer, tags }: CollectibleHubLayoutItemTemplateItem2Props) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CollectibleHubLayoutItemHilightOuter {...itemHilightOuter} />
            </Region>
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                layout={{ position: 'absolute', left: 7, right: 146, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <CollectibleHubLayoutProgressContainer {...progressContainer} />
            <CollectibleHubLayoutProgressColorHint {...progressColorHint} />
        </Region>
    );
};

/** Named region `navigationList` of CollectibleHubLayout - configured through the parent's `navigationList` prop. */
export interface CollectibleHubLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutNavigationList = ({ itemsNavigationList, layout, tags }: CollectibleHubLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <CollectibleHubLayoutItemTemplateItem2 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `navigationContainer` of CollectibleHubLayout - configured through the parent's `navigationContainer` prop. */
export interface CollectibleHubLayoutNavigationContainerProps {
    layout?: BoxLayout;
    navigationList?: CollectibleHubLayoutNavigationListProps;
    tags?: string[];
}

export const CollectibleHubLayoutNavigationContainer = ({ layout, navigationList, tags }: CollectibleHubLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 184, top: 88, bottom: 0, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CollectibleHubLayoutNavigationList {...navigationList} />
        </Region>
    );
};

/** Named region `progress_header_container` of CollectibleHubLayout - configured through the parent's `progressHeaderContainer` prop. */
export interface CollectibleHubLayoutProgressHeaderContainerProps {
    captionProgressText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressHeaderContainer = ({ captionProgressText, layout, tags }: CollectibleHubLayoutProgressHeaderContainerProps) => {
    return (
        <Region
            name="progress_header_container"
            tags={tags}
            layout={{ position: 'absolute', left: 248, width: 40, top: 2, height: 26, minWidth: 40, maxWidth: 40, ...layout }}
        >
            <Border
                variant="3"
                name="progress_color"
                tintColor="#00910a"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 26 }}
            />
            <Region
                name="progress_text"
                layout={{ position: 'absolute', left: 2, width: 36, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProgressText ?? '88/88'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `product_name_container` of CollectibleHubLayout - configured through the parent's `productNameContainer` prop. */
export interface CollectibleHubLayoutProductNameContainer2Props {
    captionPreviewFurniName?: string;
    layout?: BoxLayout;
    onProductNameContainer?: () => void;
    tags?: string[];
    visibleProductNameContainer?: boolean;
}

export const CollectibleHubLayoutProductNameContainer2 = ({ captionPreviewFurniName, layout, onProductNameContainer, tags, visibleProductNameContainer }: CollectibleHubLayoutProductNameContainer2Props) => {
    return (
        <Region
            name="product_name_container"
            tags={tags}
            visible={visibleProductNameContainer ?? false}
            backgroundColor="#000000"
            onPointerTap={onProductNameContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26, ...layout }}
        >
            <Region
                name="preview_furni_name"
                layout={{ position: 'absolute', left: 0, width: 290, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPreviewFurniName ?? 'Lorem ipsum hot air balloon'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `product_info_entry_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutProductInfoEntryTemplateItemProps {
    captionProductInfoKey?: string;
    captionProductInfoValue?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProductInfoEntryTemplateItem = ({ captionProductInfoKey, captionProductInfoValue, layout, tags }: CollectibleHubLayoutProductInfoEntryTemplateItemProps) => {
    return (
        <Region
            name="product_info_entry_template"
            tags={tags}
            backgroundColor="#110b14"
            layout={{ width: 242, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="product_info_key"
                layout={{ position: 'absolute', left: 0, width: 136, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionProductInfoKey ?? 'Type'}
                    textOptions={{ fill: '#eb8f01', align: 'right' }}
                />
            </Region>
            <Region
                name="product_info_value"
                layout={{ position: 'absolute', left: 140, width: 102, top: 1, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProductInfoValue ?? 'Floor item'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `product_info_list` of CollectibleHubLayout - configured through the parent's `productInfoList` prop. */
export interface CollectibleHubLayoutProductInfoListProps {
    itemsProductInfoList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProductInfoList = ({ itemsProductInfoList, layout, tags }: CollectibleHubLayoutProductInfoListProps) => {
    return (
        <Region
            name="product_info_list"
            tags={tags}
            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsProductInfoList ?? (
                <CollectibleHubLayoutProductInfoEntryTemplateItem />
            )}
        </Region>
    );
};

/** Named region `product_info_container` of CollectibleHubLayout - configured through the parent's `productInfoContainer` prop. */
export interface CollectibleHubLayoutProductInfoContainerProps {
    layout?: BoxLayout;
    productInfoList?: CollectibleHubLayoutProductInfoListProps;
    tags?: string[];
    visibleProductInfoContainer?: boolean;
}

export const CollectibleHubLayoutProductInfoContainer = ({ layout, productInfoList, tags, visibleProductInfoContainer }: CollectibleHubLayoutProductInfoContainerProps) => {
    return (
        <Region
            name="product_info_container"
            tags={tags}
            visible={visibleProductInfoContainer ?? false}
            backgroundColor="#3b1829"
            layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194, ...layout }}
        >
            <CollectibleHubLayoutProductInfoList {...productInfoList} />
        </Region>
    );
};

/** Named region `progress_bar_top` of CollectibleHubLayout - configured through the parent's `progressBarTop` prop. */
export interface CollectibleHubLayoutProgressBarTop2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBarTop2 = ({ layout, tags }: CollectibleHubLayoutProgressBarTop2Props) => {
    return (
        <Region
            name="progress_bar_top"
            tags={tags}
            backgroundColor="#00910a"
            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8, ...layout }}
        />
    );
};

/** Named region `progress_bar_bottom` of CollectibleHubLayout - configured through the parent's `progressBarBottom` prop. */
export interface CollectibleHubLayoutProgressBarBottom2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBarBottom2 = ({ layout, tags }: CollectibleHubLayoutProgressBarBottom2Props) => {
    return (
        <Region
            name="progress_bar_bottom"
            tags={tags}
            backgroundColor="#037c00"
            layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8, ...layout }}
        />
    );
};

/** Named region `progress_padded_bar` of CollectibleHubLayout - configured through the parent's `progressPaddedBar` prop. */
export interface CollectibleHubLayoutProgressPaddedBar2Props {
    layout?: BoxLayout;
    progressBarBottom?: CollectibleHubLayoutProgressBarBottom2Props;
    progressBarTop?: CollectibleHubLayoutProgressBarTop2Props;
    tags?: string[];
}

export const CollectibleHubLayoutProgressPaddedBar2 = ({ layout, progressBarBottom, progressBarTop, tags }: CollectibleHubLayoutProgressPaddedBar2Props) => {
    return (
        <Region
            name="progress_padded_bar"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 280, top: 1, height: 16, ...layout }}
        >
            <CollectibleHubLayoutProgressBarTop2 {...progressBarTop} />
            <CollectibleHubLayoutProgressBarBottom2 {...progressBarBottom} />
        </Region>
    );
};

/** Named region `progress_bar` of CollectibleHubLayout - configured through the parent's `progressBar` prop. */
export interface CollectibleHubLayoutProgressBar2Props {
    captionProgressBarText?: string;
    layout?: BoxLayout;
    progressPaddedBar?: CollectibleHubLayoutProgressPaddedBar2Props;
    tags?: string[];
}

export const CollectibleHubLayoutProgressBar2 = ({ captionProgressBarText, layout, progressPaddedBar, tags }: CollectibleHubLayoutProgressBar2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_bar"
            tags={tags}
            backgroundColor="#112e31"
            layout={{ position: 'absolute', left: 0, width: 282, top: 34, height: 18, ...layout }}
        >
            <CollectibleHubLayoutProgressPaddedBar2 {...progressPaddedBar} />
            <Region
                name="progress_bar_text"
                layout={{ position: 'absolute', left: 0, width: 282, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionProgressBarText ?? t('shop.minting.time_left')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `padded_cont` of CollectibleHubLayout - configured through the parent's `paddedCont` prop. */
export interface CollectibleHubLayoutPaddedContProps {
    captionRewardFurniName?: string;
    layout?: BoxLayout;
    progressBar?: CollectibleHubLayoutProgressBar2Props;
    tags?: string[];
}

export const CollectibleHubLayoutPaddedCont = ({ captionRewardFurniName, layout, progressBar, tags }: CollectibleHubLayoutPaddedContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="padded_cont"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 52, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 282, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('collectibles.preview.completion_bonus')}
                    textOptions={{ fill: '#ffd300', align: 'center' }}
                />
            </Region>
            <Region
                name="reward_furni_name"
                layout={{ position: 'absolute', left: 0, width: 282, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionRewardFurniName ?? 'Lorem ipsum hot air balloon'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <CollectibleHubLayoutProgressBar2 {...progressBar} />
        </Region>
    );
};

/** Named region `completion_header_container` of CollectibleHubLayout - configured through the parent's `completionHeaderContainer` prop. */
export interface CollectibleHubLayoutCompletionHeaderContainerProps {
    layout?: BoxLayout;
    paddedCont?: CollectibleHubLayoutPaddedContProps;
    tags?: string[];
}

export const CollectibleHubLayoutCompletionHeaderContainer = ({ layout, paddedCont, tags }: CollectibleHubLayoutCompletionHeaderContainerProps) => {
    return (
        <Region
            name="completion_header_container"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 60, ...layout }}
        >
            <CollectibleHubLayoutPaddedCont {...paddedCont} />
        </Region>
    );
};

/** Named region `bonus_or_reward_container` of CollectibleHubLayout - configured through the parent's `bonusOrRewardContainer` prop. */
export interface CollectibleHubLayoutBonusOrRewardContainerProps {
    completionHeaderContainer?: CollectibleHubLayoutCompletionHeaderContainerProps;
    layout?: BoxLayout;
    onClaimButton?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutBonusOrRewardContainer = ({ completionHeaderContainer, layout, onClaimButton, tags }: CollectibleHubLayoutBonusOrRewardContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bonus_or_reward_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 200, ...layout }}
        >
            <CollectibleHubLayoutCompletionHeaderContainer {...completionHeaderContainer} />
            <Button
                variant="5"
                name="claim_button"
                tintColor="#01a101"
                onPointerTap={onClaimButton}
                layout={{ position: 'absolute', right: 7, width: 97, top: 166, height: 30 }}
            >
                {t('collectibles.claim')}
            </Button>
        </Region>
    );
};

/** Named region `collection_progress_container` of CollectibleHubLayout - configured through the parent's `collectionProgressContainer` prop. */
export interface CollectibleHubLayoutCollectionProgressContainerProps {
    captionPreviewRewardText?: string;
    captionPreviewScoreText?: string;
    layout?: BoxLayout;
    tags?: string[];
    visibleCollectionProgressContainer?: boolean;
}

export const CollectibleHubLayoutCollectionProgressContainer = ({ captionPreviewRewardText, captionPreviewScoreText, layout, tags, visibleCollectionProgressContainer }: CollectibleHubLayoutCollectionProgressContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="collection_progress_container"
            tags={tags}
            visible={visibleCollectionProgressContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 290, top: 200, height: 60, justifyContent: 'center', ...layout }}
        >
            <Region
                name="preview_score_text"
                layout={{ position: 'absolute', width: 290, top: 3, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPreviewScoreText ?? t('collectibles.preview.score')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290, align: 'center' }}
                />
            </Region>
            <Border
                variant="3"
                tintColor="#5a1003"
                layout={{ position: 'absolute', left: 4, width: 282, top: 24, height: 32, justifyContent: 'center' }}
            >
                <Region
                    name="preview_reward_text"
                    layout={{ position: 'absolute', width: 274, alignSelf: 'center', height: 28, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPreviewRewardText ?? t('collectibles.preview.reward')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `product_progress_container` of CollectibleHubLayout - configured through the parent's `productProgressContainer` prop. */
export interface CollectibleHubLayoutProductProgressContainerProps {
    captionProcuctScoreText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProductProgressContainer = ({ captionProcuctScoreText, layout, tags }: CollectibleHubLayoutProductProgressContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_progress_container"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 290, top: 220, height: 40, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#5a1003"
                layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 32, justifyContent: 'center' }}
            >
                <Region
                    name="procuct_score_text"
                    layout={{ position: 'absolute', width: 274, alignSelf: 'center', height: 16, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionProcuctScoreText ?? t('collectibles.preview.product.incomplete')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainer2Props {
    bonusOrRewardContainer?: CollectibleHubLayoutBonusOrRewardContainerProps;
    collectionProgressContainer?: CollectibleHubLayoutCollectionProgressContainerProps;
    layout?: BoxLayout;
    productInfoContainer?: CollectibleHubLayoutProductInfoContainerProps;
    productNameContainer?: CollectibleHubLayoutProductNameContainer2Props;
    productProgressContainer?: CollectibleHubLayoutProductProgressContainerProps;
    srcBgStar?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutPreviewContainer2 = ({ bonusOrRewardContainer, collectionProgressContainer, layout, productInfoContainer, productNameContainer, productProgressContainer, srcBgStar, srcPlaceholderImage, srcProductPreview, srcUnknownImage, tags }: CollectibleHubLayoutPreviewContainer2Props) => {
    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 290, top: 34, height: 260, ...layout }}
        >
            <Border
                variant="3"
                name="collection_preview_bg"
                tintColor="#3d1f39"
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, justifyContent: 'center' }}
            >
                <ThemeImage
                    src={layoutImage('collectables_score_background.png')}
                    layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_right.png')}
                    layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_gradient2.png')}
                    tint="#45ace2"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                />
                <ThemeImage
                    name="bg_star"
                    src={srcBgStar ?? layoutImage('bg_star_300x300.png')}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                >
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    visible={false}
                    layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                >
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    visible={false}
                    options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                />
                <WidgetSlot
                    widgetType="room_previewer"
                    name="effect_image_widget"
                    visible={false}
                    options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                    layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                />
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <CollectibleHubLayoutProductNameContainer2 {...productNameContainer} />
                <CollectibleHubLayoutProductInfoContainer {...productInfoContainer} />
                <CollectibleHubLayoutBonusOrRewardContainer {...bonusOrRewardContainer} />
                <CollectibleHubLayoutCollectionProgressContainer {...collectionProgressContainer} />
                <CollectibleHubLayoutProductProgressContainer {...productProgressContainer} />
            </Border>
        </Region>
    );
};

/** Named region `number_container` of CollectibleHubLayout - configured through the parent's `numberContainer` prop. */
export interface CollectibleHubLayoutNumberContainer2Props {
    captionNumber?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutNumberContainer2 = ({ captionNumber, layout, tags }: CollectibleHubLayoutNumberContainer2Props) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Border
                variant="3"
                name="text_border"
                tintColor="#337c00"
                layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
            />
            <Region
                name="number"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNumber ?? 'x10'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem3Props {
    layout?: BoxLayout;
    numberContainer?: CollectibleHubLayoutNumberContainer2Props;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem3 = ({ layout, numberContainer, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage, tags }: CollectibleHubLayoutItemTemplateItem3Props) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <ThemeImage
                name="unknown_image"
                src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 18 }}
            />
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <CollectibleHubLayoutNumberContainer2 {...numberContainer} />
            <ThemeImage
                name="checkmark_icon"
                src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
            />
        </Region>
    );
};

/** Named region `itemgrid_collection` of CollectibleHubLayout - configured through the parent's `itemgridCollection` prop. */
export interface CollectibleHubLayoutItemgridCollectionProps {
    itemsItemgridCollection?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemgridCollection = ({ itemsItemgridCollection, layout, tags }: CollectibleHubLayoutItemgridCollectionProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 123, ...layout }}
        >
            <Region
                name="itemgrid_collection"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridCollection ?? (
                    <CollectibleHubLayoutItemTemplateItem3 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainerProps {
    itemgridCollection?: CollectibleHubLayoutItemgridCollectionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemContainer = ({ itemgridCollection, layout, tags }: CollectibleHubLayoutItemContainerProps) => {
    return (
        <Region
            name="item_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 290, top: 300, height: 123, ...layout }}
        >
            <CollectibleHubLayoutItemgridCollection
                tags={[ 'FURNI_ITEM_GRID' ]}
                {...itemgridCollection}
            />
        </Region>
    );
};

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContentProps {
    captionCollectionName?: string;
    itemContainer?: CollectibleHubLayoutItemContainerProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer2Props;
    progressHeaderContainer?: CollectibleHubLayoutProgressHeaderContainerProps;
    tags?: string[];
}

export const CollectibleHubLayoutCollectionContent = ({ captionCollectionName, itemContainer, layout, previewContainer, progressHeaderContainer, tags }: CollectibleHubLayoutCollectionContentProps) => {
    return (
        <Region
            name="collection_content"
            tags={tags}
            layout={{ position: 'absolute', left: 195, width: 290, top: 3, height: 425, ...layout }}
        >
            <Border
                variant="3"
                name="collection_header_container"
                tintColor="#cbd1d8"
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 30 }}
            >
                <Region
                    name="collection_name"
                    layout={{ position: 'absolute', left: 4, width: 121, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionCollectionName ?? 'Collection name'} />
                </Region>
                <CollectibleHubLayoutProgressHeaderContainer {...progressHeaderContainer} />
            </Border>
            <CollectibleHubLayoutPreviewContainer2 {...previewContainer} />
            <CollectibleHubLayoutItemContainer {...itemContainer} />
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent2Props {
    buttonContainer?: CollectibleHubLayoutButtonContainerProps;
    captionSearchPlaceholder?: string;
    collectionContent?: CollectibleHubLayoutCollectionContentProps;
    layout?: BoxLayout;
    navigationContainer?: CollectibleHubLayoutNavigationContainerProps;
    onSortSelection?: () => void;
    onWalletSelection?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutLoadedContent2 = ({ buttonContainer, captionSearchPlaceholder, collectionContent, layout, navigationContainer, onSortSelection, onWalletSelection, tags }: CollectibleHubLayoutLoadedContent2Props) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="loaded_content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Dropmenu
                variant="3"
                name="wallet_selection"
                onPointerTap={onWalletSelection}
                layout={{ position: 'absolute', left: 4, width: 184, top: 4, height: 24 }}
            >
                Collector Wallet
            </Dropmenu>
            <Dropmenu
                variant="3"
                name="sort_selection"
                onPointerTap={onSortSelection}
                layout={{ position: 'absolute', left: 4, width: 184, top: 32, height: 24 }}
            >
                Sort
            </Dropmenu>
            <Border
                variant="105"
                name="searchContainer"
                layout={{ position: 'absolute', left: 4, width: 184, top: 60, height: 24 }}
            >
                <CollectibleHubLayoutButtonContainer {...buttonContainer} />
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20 }}
                />
                <Region
                    name="search_placeholder"
                    layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSearchPlaceholder ?? t('generic.search')} />
                </Region>
            </Border>
            <CollectibleHubLayoutNavigationContainer {...navigationContainer} />
            <CollectibleHubLayoutCollectionContent {...collectionContent} />
        </Region>
    );
};

/** Named region `loading_contents` of CollectibleHubLayout - configured through the parent's `loadingContents` prop. */
export interface CollectibleHubLayoutLoadingContents2Props {
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    tags?: string[];
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutLoadingContents2 = ({ layout, srcLoadingIcon, tags, visibleLoadingContents }: CollectibleHubLayoutLoadingContents2Props) => {
    return (
        <Region
            name="loading_contents"
            tags={tags}
            visible={visibleLoadingContents ?? false}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a4a49f"
                layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
            />
            <ThemeImage
                name="loading_icon"
                src={srcLoadingIcon ?? layoutImage('loading.png')}
                layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
            />
        </Region>
    );
};

/** Named region `collectionsContainer` of CollectibleHubLayout - configured through the parent's `collectionsContainer` prop. */
export interface CollectibleHubLayoutCollectionsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent2Props;
    loadingContents?: CollectibleHubLayoutLoadingContents2Props;
    tags?: string[];
}

export const CollectibleHubLayoutCollectionsContainer = ({ layout, loadedContent, loadingContents, tags }: CollectibleHubLayoutCollectionsContainerProps) => {
    return (
        <Region
            name="collectionsContainer"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent2 {...loadedContent} />
            <CollectibleHubLayoutLoadingContents2 {...loadingContents} />
        </Region>
    );
};

/** Named region `item_hilight_inner` of CollectibleHubLayout - configured through the parent's `itemHilightInner` prop. */
export interface CollectibleHubLayoutItemHilightInner2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemHilightInner2 = ({ layout, tags }: CollectibleHubLayoutItemHilightInner2Props) => {
    return (
        <Region
            name="item_hilight_inner"
            tags={tags}
            backgroundColor="#63c5e9"
            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16, ...layout }}
        />
    );
};

/** Named region `item_hilight_outer` of CollectibleHubLayout - configured through the parent's `itemHilightOuter` prop. */
export interface CollectibleHubLayoutItemHilightOuter2Props {
    itemHilightInner?: CollectibleHubLayoutItemHilightInner2Props;
    layout?: BoxLayout;
    tags?: string[];
    visibleItemHilightOuter?: boolean;
}

export const CollectibleHubLayoutItemHilightOuter2 = ({ itemHilightInner, layout, tags, visibleItemHilightOuter }: CollectibleHubLayoutItemHilightOuter2Props) => {
    return (
        <Region
            name="item_hilight_outer"
            tags={tags}
            visible={visibleItemHilightOuter ?? false}
            backgroundColor="#82d1ed"
            layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20, ...layout }}
        >
            <CollectibleHubLayoutItemHilightInner2 {...itemHilightInner} />
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem4Props {
    captionItemTitle?: string;
    itemHilightOuter?: CollectibleHubLayoutItemHilightOuter2Props;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem4 = ({ captionItemTitle, itemHilightOuter, layout, onItemTemplate, tags }: CollectibleHubLayoutItemTemplateItem4Props) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <CollectibleHubLayoutItemHilightOuter2 {...itemHilightOuter} />
            </Region>
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                layout={{ position: 'absolute', left: 7, right: 146, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `navigationList` of CollectibleHubLayout - configured through the parent's `navigationList` prop. */
export interface CollectibleHubLayoutNavigationList2Props {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutNavigationList2 = ({ itemsNavigationList, layout, tags }: CollectibleHubLayoutNavigationList2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsNavigationList ?? (
                    <CollectibleHubLayoutItemTemplateItem4 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `navigationContainer` of CollectibleHubLayout - configured through the parent's `navigationContainer` prop. */
export interface CollectibleHubLayoutNavigationContainer2Props {
    layout?: BoxLayout;
    navigationList?: CollectibleHubLayoutNavigationList2Props;
    tags?: string[];
}

export const CollectibleHubLayoutNavigationContainer2 = ({ layout, navigationList, tags }: CollectibleHubLayoutNavigationContainer2Props) => {
    return (
        <Region
            name="navigationContainer"
            tags={tags}
            layout={{ position: 'absolute', left: 8, width: 184, top: 3, bottom: 0, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <CollectibleHubLayoutNavigationList2 {...navigationList} />
        </Region>
    );
};

/** Named region `product_name_container` of CollectibleHubLayout - configured through the parent's `productNameContainer` prop. */
export interface CollectibleHubLayoutProductNameContainer3Props {
    captionPreviewFurniName?: string;
    layout?: BoxLayout;
    onProductNameContainer?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutProductNameContainer3 = ({ captionPreviewFurniName, layout, onProductNameContainer, tags }: CollectibleHubLayoutProductNameContainer3Props) => {
    return (
        <Region
            name="product_name_container"
            tags={tags}
            backgroundColor="#000000"
            onPointerTap={onProductNameContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26, ...layout }}
        >
            <Region
                name="preview_furni_name"
                layout={{ position: 'absolute', left: 0, width: 290, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPreviewFurniName ?? 'Lorem ipsum hot air balloon'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `product_info_entry_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutProductInfoEntryTemplateItem2Props {
    captionProductInfoKey?: string;
    captionProductInfoValue?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProductInfoEntryTemplateItem2 = ({ captionProductInfoKey, captionProductInfoValue, layout, tags }: CollectibleHubLayoutProductInfoEntryTemplateItem2Props) => {
    return (
        <Region
            name="product_info_entry_template"
            tags={tags}
            backgroundColor="#110b14"
            layout={{ width: 242, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="product_info_key"
                layout={{ position: 'absolute', left: 0, width: 136, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionProductInfoKey ?? 'Type'}
                    textOptions={{ fill: '#eb8f01', align: 'right' }}
                />
            </Region>
            <Region
                name="product_info_value"
                layout={{ position: 'absolute', left: 140, width: 102, top: 1, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProductInfoValue ?? 'Floor item'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `product_info_list` of CollectibleHubLayout - configured through the parent's `productInfoList` prop. */
export interface CollectibleHubLayoutProductInfoList2Props {
    itemsProductInfoList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutProductInfoList2 = ({ itemsProductInfoList, layout, tags }: CollectibleHubLayoutProductInfoList2Props) => {
    return (
        <Region
            name="product_info_list"
            tags={tags}
            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsProductInfoList ?? (
                <CollectibleHubLayoutProductInfoEntryTemplateItem2 />
            )}
        </Region>
    );
};

/** Named region `product_info_container` of CollectibleHubLayout - configured through the parent's `productInfoContainer` prop. */
export interface CollectibleHubLayoutProductInfoContainer2Props {
    layout?: BoxLayout;
    productInfoList?: CollectibleHubLayoutProductInfoList2Props;
    tags?: string[];
    visibleProductInfoContainer?: boolean;
}

export const CollectibleHubLayoutProductInfoContainer2 = ({ layout, productInfoList, tags, visibleProductInfoContainer }: CollectibleHubLayoutProductInfoContainer2Props) => {
    return (
        <Region
            name="product_info_container"
            tags={tags}
            visible={visibleProductInfoContainer ?? false}
            backgroundColor="#3b1829"
            layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194, ...layout }}
        >
            <CollectibleHubLayoutProductInfoList2 {...productInfoList} />
        </Region>
    );
};

/** Row template `mintlimit_text` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutMintlimitTextItemProps {
    captionMintlimitText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutMintlimitTextItem = ({ captionMintlimitText, layout, tags }: CollectibleHubLayoutMintlimitTextItemProps) => {
    return (
        <Region
            name="mintlimit_text"
            tags={tags}
            layout={{ width: 80, height: 25, flexShrink: 0, minHeight: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', ...layout }}
        >
            <ThemeText
                text={captionMintlimitText ?? '100/1000'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', align: 'right' }}
            />
        </Region>
    );
};

/** Named region `mintlimit_container` of CollectibleHubLayout - configured through the parent's `mintlimitContainer` prop. */
export interface CollectibleHubLayoutMintlimitContainerProps {
    itemsMintlimitContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutMintlimitContainer = ({ itemsMintlimitContainer, layout, tags }: CollectibleHubLayoutMintlimitContainerProps) => {
    return (
        <Region
            name="mintlimit_container"
            tags={tags}
            layout={{ position: 'absolute', right: 10, top: 196, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsMintlimitContainer ?? (
                <CollectibleHubLayoutMintlimitTextItem />
            )}
            <ThemeImage
                src={layoutImage('collectables_icon_curator_stamp_small.png')}
                layout={{ width: 18, height: 30, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainer3Props {
    captionPriceText?: string;
    layout?: BoxLayout;
    mintlimitContainer?: CollectibleHubLayoutMintlimitContainerProps;
    onBuyButton?: () => void;
    productInfoContainer?: CollectibleHubLayoutProductInfoContainer2Props;
    productNameContainer?: CollectibleHubLayoutProductNameContainer3Props;
    srcBgStar?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutPreviewContainer3 = ({ captionPriceText, layout, mintlimitContainer, onBuyButton, productInfoContainer, productNameContainer, srcBgStar, srcPlaceholderImage, srcProductPreview, srcUnknownImage, tags }: CollectibleHubLayoutPreviewContainer3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, ...layout }}
        >
            <Border
                variant="3"
                name="collection_preview_bg"
                tintColor="#3d1f39"
                layout={{ position: 'absolute', left: 0, width: 296, top: 0, height: 260, justifyContent: 'center' }}
            >
                <ThemeImage
                    src={layoutImage('collectables_score_background.png')}
                    layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_right.png')}
                    layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                />
                <ThemeImage
                    src={layoutImage('collectables_score_background_gradient2.png')}
                    tint="#45ace2"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                />
                <ThemeImage
                    name="bg_star"
                    src={srcBgStar ?? layoutImage('bg_star_300x300.png')}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                >
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    visible={false}
                    layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    visible={false}
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 48, alignSelf: 'center', height: 48 }}
                >
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 48, alignSelf: 'center', height: 48 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    visible={false}
                    options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                />
                <WidgetSlot
                    widgetType="room_previewer"
                    name="effect_image_widget"
                    visible={false}
                    options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                    layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                />
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <CollectibleHubLayoutProductNameContainer3 {...productNameContainer} />
                <CollectibleHubLayoutProductInfoContainer2 {...productInfoContainer} />
                <Region layout={{ position: 'absolute', right: 10, top: 226, flexDirection: 'row', gap: 4 }}>
                    <Region
                        name="price_text"
                        layout={{ width: 50, height: 25, flexShrink: 0, minHeight: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionPriceText ?? '100'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'right' }}
                        />
                    </Region>
                    <Icon
                        variant="70"
                        name="emerald_icon"
                        layout={{ width: 26, height: 20, flexShrink: 0 }}
                    />
                    <Button
                        variant="5"
                        name="buy_button"
                        tintColor="#01a101"
                        onPointerTap={onBuyButton}
                        layout={{ width: 88, height: 30, flexShrink: 0 }}
                    >
                        {t('generic.buy')}
                    </Button>
                </Region>
                <CollectibleHubLayoutMintlimitContainer {...mintlimitContainer} />
            </Border>
        </Region>
    );
};

/** Named region `number_container` of CollectibleHubLayout - configured through the parent's `numberContainer` prop. */
export interface CollectibleHubLayoutNumberContainer3Props {
    captionNumber?: string;
    layout?: BoxLayout;
    srcEmeraldIcon?: string;
    tags?: string[];
    visibleTextBorder?: boolean;
}

export const CollectibleHubLayoutNumberContainer3 = ({ captionNumber, layout, srcEmeraldIcon, tags, visibleTextBorder }: CollectibleHubLayoutNumberContainer3Props) => {
    return (
        <Region
            name="number_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 20, minWidth: 50, maxWidth: 50, ...layout }}
        >
            <Region
                visible={visibleTextBorder ?? false}
                layout={{ position: 'absolute', left: 3, width: 44, top: 5, height: 12 }}
            >
                <Border
                    variant="3"
                    name="text_border"
                    tintColor="#337c00"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Region
                name="number"
                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionNumber ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="emerald_icon"
                src={srcEmeraldIcon ?? layoutImage('pursearea_tiny_emerald_icon.png')}
                layout={{ position: 'absolute', left: 34, width: 12, top: 3, height: 12 }}
            />
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem5Props {
    layout?: BoxLayout;
    numberContainer?: CollectibleHubLayoutNumberContainer3Props;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem5 = ({ layout, numberContainer, onItemTemplate, srcBitmap, srcUnknownImage, tags }: CollectibleHubLayoutItemTemplateItem5Props) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -7, marginBottom: 7, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <ThemeImage
                name="unknown_image"
                src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -7, marginBottom: 7, height: 18 }}
            />
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -7, marginBottom: 7, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <CollectibleHubLayoutNumberContainer3 {...numberContainer} />
        </Region>
    );
};

/** Named region `itemgrid_shop` of CollectibleHubLayout - configured through the parent's `itemgridShop` prop. */
export interface CollectibleHubLayoutItemgridShopProps {
    itemsItemgridShop?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemgridShop = ({ itemsItemgridShop, layout, tags }: CollectibleHubLayoutItemgridShopProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 153, ...layout }}
        >
            <Region
                name="itemgrid_shop"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridShop ?? (
                    <CollectibleHubLayoutItemTemplateItem5 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainer2Props {
    itemgridShop?: CollectibleHubLayoutItemgridShopProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemContainer2 = ({ itemgridShop, layout, tags }: CollectibleHubLayoutItemContainer2Props) => {
    return (
        <Region
            name="item_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 290, top: 270, height: 153, ...layout }}
        >
            <CollectibleHubLayoutItemgridShop
                tags={[ 'FURNI_ITEM_GRID' ]}
                {...itemgridShop}
            />
        </Region>
    );
};

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContent2Props {
    itemContainer?: CollectibleHubLayoutItemContainer2Props;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer3Props;
    tags?: string[];
}

export const CollectibleHubLayoutCollectionContent2 = ({ itemContainer, layout, previewContainer, tags }: CollectibleHubLayoutCollectionContent2Props) => {
    return (
        <Region
            name="collection_content"
            tags={tags}
            layout={{ position: 'absolute', left: 200, width: 290, top: 3, height: 425, ...layout }}
        >
            <CollectibleHubLayoutPreviewContainer3 {...previewContainer} />
            <CollectibleHubLayoutItemContainer2 {...itemContainer} />
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent3Props {
    collectionContent?: CollectibleHubLayoutCollectionContent2Props;
    layout?: BoxLayout;
    navigationContainer?: CollectibleHubLayoutNavigationContainer2Props;
    tags?: string[];
}

export const CollectibleHubLayoutLoadedContent3 = ({ collectionContent, layout, navigationContainer, tags }: CollectibleHubLayoutLoadedContent3Props) => {
    return (
        <Region
            name="loaded_content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 428, ...layout }}
        >
            <CollectibleHubLayoutNavigationContainer2 {...navigationContainer} />
            <CollectibleHubLayoutCollectionContent2 {...collectionContent} />
        </Region>
    );
};

/** Named region `loading_contents` of CollectibleHubLayout - configured through the parent's `loadingContents` prop. */
export interface CollectibleHubLayoutLoadingContents3Props {
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    tags?: string[];
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutLoadingContents3 = ({ layout, srcLoadingIcon, tags, visibleLoadingContents }: CollectibleHubLayoutLoadingContents3Props) => {
    return (
        <Region
            name="loading_contents"
            tags={tags}
            visible={visibleLoadingContents ?? false}
            layout={{ position: 'absolute', left: 5, width: 485, top: 0, height: 429, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a4a49f"
                layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
            />
            <ThemeImage
                name="loading_icon"
                src={srcLoadingIcon ?? layoutImage('loading.png')}
                layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
            />
        </Region>
    );
};

/** Named region `shopContainer` of CollectibleHubLayout - configured through the parent's `shopContainer` prop. */
export interface CollectibleHubLayoutShopContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent3Props;
    loadingContents?: CollectibleHubLayoutLoadingContents3Props;
    tags?: string[];
    visibleShopContainer?: boolean;
}

export const CollectibleHubLayoutShopContainer = ({ layout, loadedContent, loadingContents, tags, visibleShopContainer }: CollectibleHubLayoutShopContainerProps) => {
    return (
        <Region
            name="shopContainer"
            tags={tags}
            visible={visibleShopContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: -5, right: 15, top: 125, height: 428, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent3 {...loadedContent} />
            <CollectibleHubLayoutLoadingContents3 {...loadingContents} />
        </Region>
    );
};

/** Named region `headercontainer` of CollectibleHubLayout - configured through the parent's `headercontainer` prop. */
export interface CollectibleHubLayoutHeadercontainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutHeadercontainer = ({ layout, tags }: CollectibleHubLayoutHeadercontainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="headercontainer"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 50, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, alignSelf: 'center', height: 30, minWidth: 450, maxWidth: 450, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <ThemeText
                    text={t('collectibles.transfer.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacing5Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing5 = ({ layout, tags }: CollectibleHubLayoutSpacing5Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 4, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacing` of CollectibleHubLayout - configured through the parent's `spacing` prop. */
export interface CollectibleHubLayoutSpacing6Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutSpacing6 = ({ layout, tags }: CollectibleHubLayoutSpacing6Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            layout={{ width: 6, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent4Props {
    captionTransferFeeText?: string;
    headercontainer?: CollectibleHubLayoutHeadercontainerProps;
    layout?: BoxLayout;
    onTransferButton?: () => void;
    onTransferWalletSelection?: () => void;
    spacing?: CollectibleHubLayoutSpacing5Props;
    spacing2?: CollectibleHubLayoutSpacing6Props;
    srcTransferFeeIcon?: string;
    tags?: string[];
}

export const CollectibleHubLayoutLoadedContent4 = ({ captionTransferFeeText, headercontainer, layout, onTransferButton, onTransferWalletSelection, spacing, spacing2, srcTransferFeeIcon, tags }: CollectibleHubLayoutLoadedContent4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <CollectibleHubLayoutHeadercontainer {...headercontainer} />
            <Border
                variant="3"
                name="transfer_container"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, width: 488, top: 380, height: 50 }}
            >
                <Dropmenu
                    variant="3"
                    name="transfer_wallet_selection"
                    onPointerTap={onTransferWalletSelection}
                    layout={{ position: 'absolute', left: 10, width: 260, top: 13, height: 24 }}
                />
                <Border
                    variant="3"
                    tintColor="#d6dbe1"
                    blend={0}
                    layout={{ position: 'absolute', left: 315, width: 170, top: 5, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', right: 13, top: 5, flexDirection: 'row' }}>
                        <Region
                            name="transfer_fee_text"
                            layout={{ width: 12, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTransferFeeText ?? '0'}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <CollectibleHubLayoutSpacing5 {...spacing} />
                        <ThemeImage
                            name="transfer_fee_icon"
                            src={srcTransferFeeIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ width: 24, height: 30, flexShrink: 0 }}
                        />
                        <CollectibleHubLayoutSpacing6 {...spacing2} />
                        <Button
                            variant="5"
                            name="transfer_button"
                            tintColor="#2095d4"
                            onPointerTap={onTransferButton}
                            layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                        >
                            {t('collectibles.transfer')}
                        </Button>
                    </Region>
                </Border>
            </Border>
            <ThemeImage
                src={layoutImage('collectables_transfer_safe.png')}
                layout={{ position: 'absolute', left: 42, width: 400, top: 120, height: 180 }}
            />
        </Region>
    );
};

/** Named region `loading_contents` of CollectibleHubLayout - configured through the parent's `loadingContents` prop. */
export interface CollectibleHubLayoutLoadingContents4Props {
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    tags?: string[];
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutLoadingContents4 = ({ layout, srcLoadingIcon, tags, visibleLoadingContents }: CollectibleHubLayoutLoadingContents4Props) => {
    return (
        <Region
            name="loading_contents"
            tags={tags}
            visible={visibleLoadingContents ?? false}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a4a49f"
                layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
            />
            <ThemeImage
                name="loading_icon"
                src={srcLoadingIcon ?? layoutImage('loading.png')}
                layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
            />
        </Region>
    );
};

/** Named region `transferContainer` of CollectibleHubLayout - configured through the parent's `transferContainer` prop. */
export interface CollectibleHubLayoutTransferContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent4Props;
    loadingContents?: CollectibleHubLayoutLoadingContents4Props;
    tags?: string[];
    visibleTransferContainer?: boolean;
}

export const CollectibleHubLayoutTransferContainer = ({ layout, loadedContent, loadingContents, tags, visibleTransferContainer }: CollectibleHubLayoutTransferContainerProps) => {
    return (
        <Region
            name="transferContainer"
            tags={tags}
            visible={visibleTransferContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent4 {...loadedContent} />
            <CollectibleHubLayoutLoadingContents4 {...loadingContents} />
        </Region>
    );
};

/** Named region `category_name_region` of CollectibleHubLayout - configured through the parent's `categoryNameRegion` prop. */
export interface CollectibleHubLayoutCategoryNameRegion3Props {
    captionCollectorLevelHeader?: string;
    layout?: BoxLayout;
    onCategoryNameRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryNameRegion3 = ({ captionCollectorLevelHeader, layout, onCategoryNameRegion, tags }: CollectibleHubLayoutCategoryNameRegion3Props) => {
    return (
        <Region
            name="category_name_region"
            tags={tags}
            onPointerTap={onCategoryNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17, ...layout }}
        >
            <Region
                name="collector_level_header"
                layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorLevelHeader ?? 'Levels Header'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `category_minting_description_region` of CollectibleHubLayout - configured through the parent's `categoryMintingDescriptionRegion` prop. */
export interface CollectibleHubLayoutCategoryMintingDescriptionRegion3Props {
    captionCollectorLevelDescription?: string;
    layout?: BoxLayout;
    onCategoryMintingDescriptionRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryMintingDescriptionRegion3 = ({ captionCollectorLevelDescription, layout, onCategoryMintingDescriptionRegion, tags }: CollectibleHubLayoutCategoryMintingDescriptionRegion3Props) => {
    return (
        <Region
            name="category_minting_description_region"
            tags={tags}
            onPointerTap={onCategoryMintingDescriptionRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30, ...layout }}
        >
            <Region
                name="collector_level_description"
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorLevelDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_collector_header_region` of CollectibleHubLayout - configured through the parent's `categoryCollectorHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryCollectorHeaderRegion2Props {
    categoryMintingDescriptionRegion?: CollectibleHubLayoutCategoryMintingDescriptionRegion3Props;
    categoryNameRegion?: CollectibleHubLayoutCategoryNameRegion3Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryCollectorHeaderRegion2 = ({ categoryMintingDescriptionRegion, categoryNameRegion, layout, tags }: CollectibleHubLayoutCategoryCollectorHeaderRegion2Props) => {
    return (
        <Region
            name="category_collector_header_region"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 80, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryNameRegion3 {...categoryNameRegion} />
            <CollectibleHubLayoutCategoryMintingDescriptionRegion3 {...categoryMintingDescriptionRegion} />
        </Region>
    );
};

/** Named region `category_content_background` of CollectibleHubLayout - configured through the parent's `categoryContentBackground` prop. */
export interface CollectibleHubLayoutCategoryContentBackground2Props {
    categoryCollectorHeaderRegion?: CollectibleHubLayoutCategoryCollectorHeaderRegion2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryContentBackground2 = ({ categoryCollectorHeaderRegion, layout, tags }: CollectibleHubLayoutCategoryContentBackground2Props) => {
    return (
        <Region
            name="category_content_background"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryCollectorHeaderRegion2
                tags={[ 'category_header' ]}
                {...categoryCollectorHeaderRegion}
            />
        </Region>
    );
};

/** Named region `levelsContainer` of CollectibleHubLayout - configured through the parent's `levelsContainer` prop. */
export interface CollectibleHubLayoutLevelsContainerProps {
    categoryContentBackground?: CollectibleHubLayoutCategoryContentBackground2Props;
    layout?: BoxLayout;
    tags?: string[];
    visibleLevelsContainer?: boolean;
}

export const CollectibleHubLayoutLevelsContainer = ({ categoryContentBackground, layout, tags, visibleLevelsContainer }: CollectibleHubLayoutLevelsContainerProps) => {
    return (
        <Region
            name="levelsContainer"
            tags={tags}
            visible={visibleLevelsContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryContentBackground2 {...categoryContentBackground} />
        </Region>
    );
};

/** Named region `category_info_header_region` of CollectibleHubLayout - configured through the parent's `categoryInfoHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryInfoHeaderRegionProps {
    captionCollectorCollectionsHeader?: string;
    layout?: BoxLayout;
    onCategoryInfoHeaderRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryInfoHeaderRegion = ({ captionCollectorCollectionsHeader, layout, onCategoryInfoHeaderRegion, tags }: CollectibleHubLayoutCategoryInfoHeaderRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_info_header_region"
            tags={tags}
            onPointerTap={onCategoryInfoHeaderRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17, ...layout }}
        >
            <Region
                name="collector_collections_header"
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorCollectionsHeader ?? t('collectibles.info.title')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `category_info_description_region` of CollectibleHubLayout - configured through the parent's `categoryInfoDescriptionRegion` prop. */
export interface CollectibleHubLayoutCategoryInfoDescriptionRegionProps {
    captionCollectorProfileDescription?: string;
    captionInfoDesc?: string;
    layout?: BoxLayout;
    onCategoryInfoDescriptionRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryInfoDescriptionRegion = ({ captionCollectorProfileDescription, captionInfoDesc, layout, onCategoryInfoDescriptionRegion, tags }: CollectibleHubLayoutCategoryInfoDescriptionRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_info_description_region"
            tags={tags}
            onPointerTap={onCategoryInfoDescriptionRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 50, ...layout }}
        >
            <Region
                name="collector_profile_description"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <Region
                name="info_desc"
                layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 50, maxWidth: 480, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfoDesc ?? t('collectibles.info.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_info_transfer_region` of CollectibleHubLayout - configured through the parent's `categoryInfoTransferRegion` prop. */
export interface CollectibleHubLayoutCategoryInfoTransferRegionProps {
    captionCollectorProfileDescription?: string;
    captionTransferDesc?: string;
    layout?: BoxLayout;
    onCategoryInfoTransferRegion?: () => void;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryInfoTransferRegion = ({ captionCollectorProfileDescription, captionTransferDesc, layout, onCategoryInfoTransferRegion, tags }: CollectibleHubLayoutCategoryInfoTransferRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_info_transfer_region"
            tags={tags}
            onPointerTap={onCategoryInfoTransferRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 480, top: 75, height: 60, ...layout }}
        >
            <Region
                name="collector_profile_description"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <Region
                name="transfer_desc"
                layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 60, maxWidth: 480, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTransferDesc ?? t('collectibles.info.trading')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `category_collector_header_region` of CollectibleHubLayout - configured through the parent's `categoryCollectorHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryCollectorHeaderRegion3Props {
    categoryInfoDescriptionRegion?: CollectibleHubLayoutCategoryInfoDescriptionRegionProps;
    categoryInfoHeaderRegion?: CollectibleHubLayoutCategoryInfoHeaderRegionProps;
    categoryInfoTransferRegion?: CollectibleHubLayoutCategoryInfoTransferRegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryCollectorHeaderRegion3 = ({ categoryInfoDescriptionRegion, categoryInfoHeaderRegion, categoryInfoTransferRegion, layout, tags }: CollectibleHubLayoutCategoryCollectorHeaderRegion3Props) => {
    return (
        <Region
            name="category_collector_header_region"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 135, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryInfoHeaderRegion {...categoryInfoHeaderRegion} />
            <CollectibleHubLayoutCategoryInfoDescriptionRegion {...categoryInfoDescriptionRegion} />
            <CollectibleHubLayoutCategoryInfoTransferRegion {...categoryInfoTransferRegion} />
        </Region>
    );
};

/** Named region `category_content_background` of CollectibleHubLayout - configured through the parent's `categoryContentBackground` prop. */
export interface CollectibleHubLayoutCategoryContentBackground3Props {
    categoryCollectorHeaderRegion?: CollectibleHubLayoutCategoryCollectorHeaderRegion3Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutCategoryContentBackground3 = ({ categoryCollectorHeaderRegion, layout, tags }: CollectibleHubLayoutCategoryContentBackground3Props) => {
    return (
        <Region
            name="category_content_background"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryCollectorHeaderRegion3
                tags={[ 'category_header' ]}
                {...categoryCollectorHeaderRegion}
            />
        </Region>
    );
};

/** Named region `infoContainer` of CollectibleHubLayout - configured through the parent's `infoContainer` prop. */
export interface CollectibleHubLayoutInfoContainerProps {
    categoryContentBackground?: CollectibleHubLayoutCategoryContentBackground3Props;
    layout?: BoxLayout;
    tags?: string[];
    visibleInfoContainer?: boolean;
}

export const CollectibleHubLayoutInfoContainer = ({ categoryContentBackground, layout, tags, visibleInfoContainer }: CollectibleHubLayoutInfoContainerProps) => {
    return (
        <Region
            name="infoContainer"
            tags={tags}
            visible={visibleInfoContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 419, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryContentBackground3 {...categoryContentBackground} />
            <ThemeImage
                src={layoutImage('collectables_collection_default.png')}
                layout={{ position: 'absolute', left: 128, width: 216, top: 155, height: 264 }}
            />
        </Region>
    );
};

/** Named region `amount_container` of CollectibleHubLayout - configured through the parent's `amountContainer` prop. */
export interface CollectibleHubLayoutAmountContainerProps {
    captionAmountText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutAmountContainer = ({ captionAmountText, layout, tags }: CollectibleHubLayoutAmountContainerProps) => {
    return (
        <Region
            name="amount_container"
            tags={tags}
            layout={{ position: 'absolute', left: 27, width: 20, top: 34, height: 16, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 14 }}
            />
            <Region
                name="amount_text"
                tags={[ 'AMOUNT_TITLE' ]}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionAmountText ?? 'x0'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem6Props {
    amountContainer?: CollectibleHubLayoutAmountContainerProps;
    captionCollectionText?: string;
    captionExpiresText?: string;
    captionItemName?: string;
    captionWalletText?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcUnknownImage?: string;
    tags?: string[];
}

export const CollectibleHubLayoutItemTemplateItem6 = ({ amountContainer, captionCollectionText, captionExpiresText, captionItemName, captionWalletText, layout, onItemTemplate, srcBitmap, srcUnknownImage, tags }: CollectibleHubLayoutItemTemplateItem6Props) => {
    return (
        <Region
            name="item_template"
            tags={tags}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 466, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 464, top: 1, height: 48 }}
                    />
                </Border>
            </Border>
            <Border
                variant="3"
                name="item_border"
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    tintColor="#c8cdd3"
                    layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                />
            </Border>
            <Border
                variant="3"
                name="name_border"
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 54, width: 408, top: 4, height: 16 }}
            >
                <Region
                    name="item_name"
                    tags={[ 'NAME_TITLE' ]}
                    layout={{ position: 'absolute', left: 1, width: 405, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemName ?? 'Item name'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <ThemeImage
                name="unknown_image"
                src={srcUnknownImage ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="pet_image_widget"
                visible={false}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <Region
                name="wallet_text"
                layout={{ position: 'absolute', left: 204, width: 260, top: 34, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionWalletText ?? '0x123123123123123'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#8f9db1', align: 'right' }}
                />
            </Region>
            <Region
                name="collection_text"
                layout={{ position: 'absolute', left: 52, width: 340, top: 20, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCollectionText ?? '<b>Collection:</b> test'} />
            </Region>
            <Region
                name="expires_text"
                layout={{ position: 'absolute', left: 52, width: 340, top: 33, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionExpiresText ?? '<b>Expires:</b> test'} />
            </Region>
            <CollectibleHubLayoutAmountContainer {...amountContainer} />
        </Region>
    );
};

/** Named region `itemlist` of CollectibleHubLayout - configured through the parent's `itemlist` prop. */
export interface CollectibleHubLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemlist = ({ itemsItemlist, layout, tags }: CollectibleHubLayoutItemlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374, ...layout }}
        >
            <Region
                name="itemlist"
                tags={tags}
                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
            >
                {itemsItemlist ?? (
                    <CollectibleHubLayoutItemTemplateItem6 />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `item_container` of CollectibleHubLayout - configured through the parent's `itemContainer` prop. */
export interface CollectibleHubLayoutItemContainer3Props {
    itemlist?: CollectibleHubLayoutItemlistProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutItemContainer3 = ({ itemlist, layout, tags }: CollectibleHubLayoutItemContainer3Props) => {
    return (
        <Region
            name="item_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374, ...layout }}
        >
            <CollectibleHubLayoutItemlist {...itemlist} />
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent5Props {
    itemContainer?: CollectibleHubLayoutItemContainer3Props;
    layout?: BoxLayout;
    onClaimButton?: () => void;
    tags?: string[];
    visibleLoadedContent?: boolean;
}

export const CollectibleHubLayoutLoadedContent5 = ({ itemContainer, layout, onClaimButton, tags, visibleLoadedContent }: CollectibleHubLayoutLoadedContent5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            tags={tags}
            visible={visibleLoadedContent ?? false}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <CollectibleHubLayoutItemContainer3 {...itemContainer} />
            <Border
                variant="3"
                name="bottom_container"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, width: 486, top: 380, height: 50 }}
            >
                <Button
                    variant="5"
                    name="claim_button"
                    tintColor="#2095d4"
                    onPointerTap={onClaimButton}
                    layout={{ position: 'absolute', left: 180, width: 137, top: 10, height: 30, minWidth: 100 }}
                >
                    {t('collectibles.claim_all')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `headercontainer` of CollectibleHubLayout - configured through the parent's `headercontainer` prop. */
export interface CollectibleHubLayoutHeadercontainer2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutHeadercontainer2 = ({ layout, tags }: CollectibleHubLayoutHeadercontainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="headercontainer"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 100, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, top: 28, bottom: 55, minWidth: 450, maxWidth: 450, minHeight: 17, maxHeight: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <ThemeText
                    text={t('collectibles.no_claims')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `image_container` of CollectibleHubLayout - configured through the parent's `imageContainer` prop. */
export interface CollectibleHubLayoutImageContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutImageContainer = ({ layout, tags }: CollectibleHubLayoutImageContainerProps) => {
    return (
        <Region
            name="image_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 100, height: 332, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('image_frank_dont_know.png')}
                layout={{ position: 'absolute', width: 485, alignSelf: 'center', marginTop: -28, marginBottom: 28, height: 176 }}
            />
        </Region>
    );
};

/** Named region `no_content_container` of CollectibleHubLayout - configured through the parent's `noContentContainer` prop. */
export interface CollectibleHubLayoutNoContentContainerProps {
    headercontainer?: CollectibleHubLayoutHeadercontainer2Props;
    imageContainer?: CollectibleHubLayoutImageContainerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const CollectibleHubLayoutNoContentContainer = ({ headercontainer, imageContainer, layout, tags }: CollectibleHubLayoutNoContentContainerProps) => {
    return (
        <Region
            name="no_content_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <CollectibleHubLayoutHeadercontainer2 {...headercontainer} />
            <CollectibleHubLayoutImageContainer {...imageContainer} />
        </Region>
    );
};

/** Named region `loading_contents` of CollectibleHubLayout - configured through the parent's `loadingContents` prop. */
export interface CollectibleHubLayoutLoadingContents5Props {
    layout?: BoxLayout;
    srcLoadingIcon?: string;
    tags?: string[];
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutLoadingContents5 = ({ layout, srcLoadingIcon, tags, visibleLoadingContents }: CollectibleHubLayoutLoadingContents5Props) => {
    return (
        <Region
            name="loading_contents"
            tags={tags}
            visible={visibleLoadingContents ?? false}
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#a4a49f"
                layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
            />
            <ThemeImage
                name="loading_icon"
                src={srcLoadingIcon ?? layoutImage('loading.png')}
                layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
            />
        </Region>
    );
};

/** Named region `rewardsContainer` of CollectibleHubLayout - configured through the parent's `rewardsContainer` prop. */
export interface CollectibleHubLayoutRewardsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent5Props;
    loadingContents?: CollectibleHubLayoutLoadingContents5Props;
    noContentContainer?: CollectibleHubLayoutNoContentContainerProps;
    tags?: string[];
    visibleRewardsContainer?: boolean;
}

export const CollectibleHubLayoutRewardsContainer = ({ layout, loadedContent, loadingContents, noContentContainer, tags, visibleRewardsContainer }: CollectibleHubLayoutRewardsContainerProps) => {
    return (
        <Region
            name="rewardsContainer"
            tags={tags}
            visible={visibleRewardsContainer ?? false}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent5 {...loadedContent} />
            <CollectibleHubLayoutNoContentContainer {...noContentContainer} />
            <CollectibleHubLayoutLoadingContents5 {...loadingContents} />
        </Region>
    );
};
