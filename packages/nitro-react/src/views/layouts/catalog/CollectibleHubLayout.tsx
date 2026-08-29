import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1531_collectible_hub_xml` (layout "collectible_view", 500x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleHubLayoutProps {
    captionCollectorLevelDescription?: string;
    captionCollectorLevelHeader?: string;
    captionCollectorProfileDescription?: string;
    captionCollectorProfileHeader?: string;
    collectionsContainer?: CollectibleHubLayoutCollectionsContainerProps;
    collectorHubHeader?: CollectibleHubLayoutCollectorHubHeaderProps;
    infoContainer?: CollectibleHubLayoutInfoContainerProps;
    layout?: BoxLayout;
    mintingContainer?: CollectibleHubLayoutMintingContainerProps;
    onCategoryMintingDescriptionRegion?: () => void;
    onCategoryMintingDescriptionRegion2?: () => void;
    onCategoryNameRegion?: () => void;
    onCategoryNameRegion2?: () => void;
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
    visibleCategoryNameRegion?: boolean;
    visibleCollectorProfileContainer?: boolean;
    visibleCollectorProfileHeader?: boolean;
    visibleInfoContainer?: boolean;
    visibleLevelsContainer?: boolean;
    visibleMintingContainer?: boolean;
    visibleRewardsContainer?: boolean;
    visibleShopContainer?: boolean;
    visibleTopViewLevelsButton?: boolean;
    visibleTopViewProfileButton?: boolean;
    visibleTransferContainer?: boolean;
}

export const CollectibleHubLayout = ({ captionCollectorLevelDescription, captionCollectorLevelHeader, captionCollectorProfileDescription, captionCollectorProfileHeader, collectionsContainer, collectorHubHeader, infoContainer, layout, mintingContainer, onCategoryMintingDescriptionRegion, onCategoryMintingDescriptionRegion2, onCategoryNameRegion, onCategoryNameRegion2, onClose, onTopViewCollectionsButton, onTopViewInfoButton, onTopViewLevelsButton, onTopViewMintingButton, onTopViewProfileButton, onTopViewRewardsButton, onTopViewShopButton, onTopViewTransferButton, rewardsContainer, shopContainer, transferContainer, visibleCategoryNameRegion, visibleCollectorProfileContainer, visibleCollectorProfileHeader, visibleInfoContainer, visibleLevelsContainer, visibleMintingContainer, visibleRewardsContainer, visibleShopContainer, visibleTopViewLevelsButton, visibleTopViewProfileButton, visibleTransferContainer }: CollectibleHubLayoutProps) => {
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
                {(visibleTopViewProfileButton ?? false) && (
                    <TabButton
                        variant="3"
                        name="top_view_profile_button"
                        onPointerTap={onTopViewProfileButton}
                        layout={{ position: 'absolute', left: 393, width: 135, top: 0, height: 32 }}
                    >
                        My Collector Profile
                    </TabButton>
                )}
                {(visibleTopViewLevelsButton ?? false) && (
                    <TabButton
                        variant="3"
                        name="top_view_levels_button"
                        onPointerTap={onTopViewLevelsButton}
                        layout={{ position: 'absolute', left: 528, width: 58, top: 0, height: 32 }}
                    >
                        Levels
                    </TabButton>
                )}
            </TabContext>
            {(visibleMintingContainer ?? false) && (
                <CollectibleHubLayoutMintingContainer {...mintingContainer} />
            )}
            {(visibleCollectorProfileContainer ?? false) && (
                <Region
                    name="collectorProfileContainer"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 400, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 56, overflow: 'hidden' }}
                        >
                            {(visibleCategoryNameRegion ?? false) && (
                                <Region
                                    name="category_name_region"
                                    onPointerTap={onCategoryNameRegion}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                                >
                                    {(visibleCollectorProfileHeader ?? false) && (
                                        <Region
                                            name="collector_profile_header"
                                            layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={captionCollectorProfileHeader ?? 'Collector Profile Header'}
                                                textStyle="text-style-u-regular"
                                            />
                                        </Region>
                                    )}
                                </Region>
                            )}
                            <Region
                                name="category_minting_description_region"
                                layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                onPointerTap={onCategoryMintingDescriptionRegion}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionCollectorProfileDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            )}
            <CollectibleHubLayoutCollectionsContainer {...collectionsContainer} />
            {(visibleShopContainer ?? false) && (
                <CollectibleHubLayoutShopContainer {...shopContainer} />
            )}
            {(visibleTransferContainer ?? false) && (
                <CollectibleHubLayoutTransferContainer {...transferContainer} />
            )}
            {(visibleLevelsContainer ?? false) && (
                <Region
                    name="levelsContainer"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 80, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_name_region"
                                onPointerTap={onCategoryNameRegion2}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
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
                            <Region
                                name="category_minting_description_region"
                                layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                onPointerTap={onCategoryMintingDescriptionRegion2}
                                cursor="pointer"
                            >
                                <ThemeText
                                    text={captionCollectorLevelDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            )}
            {(visibleInfoContainer ?? false) && (
                <CollectibleHubLayoutInfoContainer {...infoContainer} />
            )}
            {(visibleRewardsContainer ?? false) && (
                <CollectibleHubLayoutRewardsContainer {...rewardsContainer} />
            )}
            {/* `static_bitmap` is hidden and has no name to show it by */}
        </Frame>
    );
};

/** Named region `collector_hub_header` of CollectibleHubLayout - configured through the parent's `collectorHubHeader` prop. */
export interface CollectibleHubLayoutCollectorHubHeaderProps {
    captionCaptionAllTimeHighScore?: string;
    captionCaptionCurrentScore?: string;
    captionCollectorLevel?: string;
    captionCurrentHiscoreKey?: string;
    captionCurrentHiscoreValue?: string;
    captionCurrentScoreKey?: string;
    captionCurrentScoreValue?: string;
    captionEmeraldCurrencyValue?: string;
    captionLevelTitle?: string;
    captionSilverCurrencyValue?: string;
    layout?: BoxLayout;
    srcCollectableBgLeft?: string;
    srcCollectableBgRight?: string;
    srcCollectorLevelBg?: string;
    srcCollectorLevelBg2?: string;
    srcEmeraldCurrencyIcon?: string;
    srcSilverCurrencyIcon?: string;
    visibleCaptionAllTimeHighScore?: boolean;
    visibleCaptionCurrentScore?: boolean;
    visibleTabBg?: boolean;
}

export const CollectibleHubLayoutCollectorHubHeader = ({ captionCaptionAllTimeHighScore, captionCaptionCurrentScore, captionCollectorLevel, captionCurrentHiscoreKey, captionCurrentHiscoreValue, captionCurrentScoreKey, captionCurrentScoreValue, captionEmeraldCurrencyValue, captionLevelTitle, captionSilverCurrencyValue, layout, srcCollectableBgLeft, srcCollectableBgRight, srcCollectorLevelBg, srcCollectorLevelBg2, srcEmeraldCurrencyIcon, srcSilverCurrencyIcon, visibleCaptionAllTimeHighScore, visibleCaptionCurrentScore, visibleTabBg }: CollectibleHubLayoutCollectorHubHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="collector_hub_header"
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
                <Region
                    name="score_container"
                    layout={{ position: 'absolute', left: 116, width: 220, top: 21, height: 45 }}
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
                    {(visibleCaptionCurrentScore ?? false) && (
                        <Region
                            name="caption_current_score"
                            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionCaptionCurrentScore ?? 'My Habbo Collector Score: 999999'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    )}
                    {(visibleCaptionAllTimeHighScore ?? false) && (
                        <Region
                            name="caption_all_time_high_score"
                            layout={{ position: 'absolute', left: 0, width: 197, top: 25, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionCaptionAllTimeHighScore ?? 'My all time high score: 999999'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    )}
                </Region>
                <ThemeImage
                    src={layoutImage('collectables_level_bg.png')}
                    layout={{ position: 'absolute', left: 335, width: 64, top: 2, height: 68 }}
                />
                <Region
                    name="level_container"
                    layout={{ position: 'absolute', left: 344, width: 45, top: 16, height: 35 }}
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
            {(visibleTabBg ?? false) && (
                <Border
                    variant="3"
                    name="tab_bg"
                    tintColor="#000000"
                    blend={0.4}
                    layout={{ position: 'absolute', left: -2, width: 502, top: 91, height: 39 }}
                />
            )}
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItemProps {
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
    visibleBadgeImageWidget?: boolean;
    visibleBitmap?: boolean;
    visibleCheckmarkIcon?: boolean;
    visiblePetImageWidget?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage, visibleBadgeImageWidget, visibleBitmap, visibleCheckmarkIcon, visiblePetImageWidget, visibleUnknownImage }: CollectibleHubLayoutItemTemplateItemProps) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
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
            {(visibleBitmap ?? false) && (
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
                />
            )}
            {(visibleBadgeImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_image_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                />
            )}
            {(visibleUnknownImage ?? false) && (
                <ThemeImage
                    name="unknown_image"
                    src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 18, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 18 }}
                />
            )}
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    options={{ 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                />
            )}
            <Region
                name="number_container"
                layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50 }}
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
            {(visibleCheckmarkIcon ?? false) && (
                <ThemeImage
                    name="checkmark_icon"
                    src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                    layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
                />
            )}
        </Region>
    );
};

/** Named region `itemgrid_inventory` of CollectibleHubLayout - configured through the parent's `itemgridInventory` prop. */
export interface CollectibleHubLayoutItemgridInventoryProps {
    itemsItemgridInventory?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemgridInventory = ({ itemsItemgridInventory, layout }: CollectibleHubLayoutItemgridInventoryProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 179, top: 0, height: 260, ...layout }}
        >
            <Region
                name="itemgrid_inventory"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            >
                {itemsItemgridInventory ?? (
                    <CollectibleHubLayoutItemTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `mint_info_container` of CollectibleHubLayout - configured through the parent's `mintInfoContainer` prop. */
export interface CollectibleHubLayoutMintInfoContainerProps {
    captionMintLockText?: string;
    captionProgressBarText?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutMintInfoContainer = ({ captionMintLockText, captionProgressBarText, layout }: CollectibleHubLayoutMintInfoContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mint_info_container"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 290, top: 214, height: 46, ...layout }}
        >
            <Region
                name="right_box"
                layout={{ position: 'absolute', left: 64, width: 226, top: 0, height: 46, justifyContent: 'center' }}
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
                <Region
                    name="progress_bar"
                    backgroundColor="#112e31"
                    layout={{ position: 'absolute', left: 0, width: 220, top: 24, height: 18 }}
                >
                    <Region
                        name="progress_padded_bar"
                        layout={{ position: 'absolute', left: 1, width: 220, top: 1, height: 16 }}
                    >
                        <Region
                            name="progress_bar_top"
                            backgroundColor="#00910a"
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8 }}
                        />
                        <Region
                            name="progress_bar_bottom"
                            backgroundColor="#037c00"
                            layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8 }}
                        />
                    </Region>
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
            </Region>
        </Region>
    );
};

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainerProps {
    captionPreviewFurniName?: string;
    captionStampPricing?: string;
    layout?: BoxLayout;
    mintInfoContainer?: CollectibleHubLayoutMintInfoContainerProps;
    onCollectButton?: () => void;
    onProductNameContainer?: () => void;
    srcBgStar?: string;
    srcMintLockClosedIcon?: string;
    srcMintLockOpenIcon?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    visibleAvatarImageWidget?: boolean;
    visibleBadgeImageWidget?: boolean;
    visibleEffectImageWidget?: boolean;
    visibleMintLockClosedIcon?: boolean;
    visiblePetImageWidget?: boolean;
    visiblePlaceholderImage?: boolean;
    visibleProductPreview?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutPreviewContainer = ({ captionPreviewFurniName, captionStampPricing, layout, mintInfoContainer, onCollectButton, onProductNameContainer, srcBgStar, srcMintLockClosedIcon, srcMintLockOpenIcon, srcPlaceholderImage, srcProductPreview, srcUnknownImage, visibleAvatarImageWidget, visibleBadgeImageWidget, visibleEffectImageWidget, visibleMintLockClosedIcon, visiblePetImageWidget, visiblePlaceholderImage, visibleProductPreview, visibleUnknownImage }: CollectibleHubLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
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
                {(visiblePlaceholderImage ?? false) && (
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                )}
                {(visibleAvatarImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="avatar_image_widget"
                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                    />
                )}
                {(visibleBadgeImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge_image_widget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                        layout={{ position: 'absolute', width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                    />
                )}
                {(visibleUnknownImage ?? false) && (
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                    />
                )}
                {(visiblePetImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_image_widget"
                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                    />
                )}
                {(visibleEffectImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="room_previewer"
                        name="effect_image_widget"
                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                    />
                )}
                {(visibleProductPreview ?? false) && (
                    <ThemeImage
                        name="product_preview"
                        src={srcProductPreview}
                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                    />
                )}
                <Region
                    name="product_name_container"
                    backgroundColor="#000000"
                    onPointerTap={onProductNameContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
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
                <Region
                    name="collect_container"
                    layout={{ position: 'absolute', left: 82, width: 200, top: 180, height: 30 }}
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
                        <Region
                            name="spacing"
                            layout={{ width: 3, height: 30, flexShrink: 0 }}
                        />
                        <ThemeImage
                            src={layoutImage('collectables_icon_curator_stamp_small.png')}
                            layout={{ width: 18, height: 30, flexShrink: 0 }}
                        />
                        <Region
                            name="spacing"
                            layout={{ width: 7, height: 30, flexShrink: 0 }}
                        />
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
                {(visibleMintLockClosedIcon ?? false) && (
                    <ThemeImage
                        name="mint_lock_closed_icon"
                        src={srcMintLockClosedIcon ?? layoutImage('collectables_lock_closed.png')}
                        layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                    />
                )}
            </Border>
        </Region>
    );
};

/** Named region `furniture_container` of CollectibleHubLayout - configured through the parent's `furnitureContainer` prop. */
export interface CollectibleHubLayoutFurnitureContainerProps {
    itemgridInventory?: CollectibleHubLayoutItemgridInventoryProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainerProps;
}

export const CollectibleHubLayoutFurnitureContainer = ({ itemgridInventory, layout, previewContainer }: CollectibleHubLayoutFurnitureContainerProps) => {
    return (
        <Region
            name="furniture_container"
            layout={{ position: 'absolute', left: 4, width: 480, top: 60, height: 262, ...layout }}
        >
            <CollectibleHubLayoutItemgridInventory {...itemgridInventory} />
            <CollectibleHubLayoutPreviewContainer {...previewContainer} />
        </Region>
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
}

export const CollectibleHubLayoutStampPurchasingContainer = ({ captionMintTokenBalance, captionSilverCostText, captionStampsHeader, captionStampsHeader2, layout, onSilverBuyButton, onStampsPurchaseDropdown }: CollectibleHubLayoutStampPurchasingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="stamp_purchasing_container"
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
                    {/* `border` is hidden and has no name to show it by */}
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
                    <Region
                        name="spacing"
                        layout={{ width: 4, height: 30, flexShrink: 0 }}
                    />
                    <ThemeImage
                        src={layoutImage('pursearea_mid_silver_icon.png')}
                        layout={{ width: 24, height: 30, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        layout={{ width: 6, height: 30, flexShrink: 0 }}
                    />
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

/** Named region `category_footer` of CollectibleHubLayout - configured through the parent's `categoryFooter` prop. */
export interface CollectibleHubLayoutCategoryFooterProps {
    captionNoWalletText?: string;
    layout?: BoxLayout;
    onCreateWalletButton?: () => void;
    onMoreInfoButton?: () => void;
    stampPurchasingContainer?: CollectibleHubLayoutStampPurchasingContainerProps;
    visibleNoWalletContainer?: boolean;
}

export const CollectibleHubLayoutCategoryFooter = ({ captionNoWalletText, layout, onCreateWalletButton, onMoreInfoButton, stampPurchasingContainer, visibleNoWalletContainer }: CollectibleHubLayoutCategoryFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_footer"
            layout={{ position: 'absolute', left: 0, width: 488, top: 330, height: 100, overflow: 'hidden', ...layout }}
        >
            <Border
                variant="3"
                name="large_border"
                tintColor="#bac3cd"
                layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
            >
                <CollectibleHubLayoutStampPurchasingContainer {...stampPurchasingContainer} />
                {(visibleNoWalletContainer ?? false) && (
                    <Region
                        name="no_wallet_container"
                        layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
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
                )}
            </Border>
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContentProps {
    captionMintingDescription?: string;
    captionMintingHeader?: string;
    categoryFooter?: CollectibleHubLayoutCategoryFooterProps;
    furnitureContainer?: CollectibleHubLayoutFurnitureContainerProps;
    layout?: BoxLayout;
    onCategoryMintingDescriptionRegion?: () => void;
    onCategoryNameRegion?: () => void;
}

export const CollectibleHubLayoutLoadedContent = ({ captionMintingDescription, captionMintingHeader, categoryFooter, furnitureContainer, layout, onCategoryMintingDescriptionRegion, onCategoryNameRegion }: CollectibleHubLayoutLoadedContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 430, overflow: 'hidden', ...layout }}
        >
            <Region
                name="category_minting_header_region"
                layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 58, overflow: 'hidden' }}
            >
                <Region
                    name="category_name_region"
                    onPointerTap={onCategoryNameRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
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
                <Region
                    name="category_minting_description_region"
                    layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    onPointerTap={onCategoryMintingDescriptionRegion}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionMintingDescription ?? t('shop.minting.info.description')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                    />
                </Region>
            </Region>
            <CollectibleHubLayoutFurnitureContainer {...furnitureContainer} />
            <CollectibleHubLayoutCategoryFooter {...categoryFooter} />
        </Region>
    );
};

/** Named region `mintingContainer` of CollectibleHubLayout - configured through the parent's `mintingContainer` prop. */
export interface CollectibleHubLayoutMintingContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContentProps;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleMintingContainer?: boolean;
}

export const CollectibleHubLayoutMintingContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleMintingContainer }: CollectibleHubLayoutMintingContainerProps) => {
    return (
        (visibleMintingContainer ?? false) && (
            <Region
                name="mintingContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 10, top: 125, height: 430, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent {...loadedContent} />
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
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
                )}
            </Region>
        )
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem2Props {
    captionItemTitle?: string;
    captionProgressText?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
}

export const CollectibleHubLayoutItemTemplateItem2 = ({ captionItemTitle, captionProgressText, layout, onItemTemplate }: CollectibleHubLayoutItemTemplateItem2Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <Region
                    name="item_hilight_outer"
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
            </Region>
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 7, right: 146, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemTitle ?? 'item'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                name="progress_container"
                layout={{ position: 'absolute', left: 120, width: 36, top: 3, height: 15, minWidth: 36, maxWidth: 36 }}
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
            <Region
                name="progress_color_hint"
                backgroundColor="#00910a"
                layout={{ position: 'absolute', left: 0, width: 4, top: 1, height: 19, minWidth: 4, maxWidth: 4, minHeight: 19, maxHeight: 19 }}
            />
        </Region>
    );
};

/** Named region `navigationList` of CollectibleHubLayout - configured through the parent's `navigationList` prop. */
export interface CollectibleHubLayoutNavigationListProps {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutNavigationList = ({ itemsNavigationList, layout }: CollectibleHubLayoutNavigationListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="navigationList"
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
}

export const CollectibleHubLayoutNavigationContainer = ({ layout, navigationList }: CollectibleHubLayoutNavigationContainerProps) => {
    return (
        <Region
            name="navigationContainer"
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

/** Row template `product_info_entry_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutProductInfoEntryTemplateItemProps {
    captionProductInfoKey?: string;
    captionProductInfoValue?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutProductInfoEntryTemplateItem = ({ captionProductInfoKey, captionProductInfoValue, layout }: CollectibleHubLayoutProductInfoEntryTemplateItemProps) => {
    return (
        <Region
            name="product_info_entry_template"
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

/** Named region `padded_cont` of CollectibleHubLayout - configured through the parent's `paddedCont` prop. */
export interface CollectibleHubLayoutPaddedContProps {
    captionProgressBarText?: string;
    captionRewardFurniName?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutPaddedCont = ({ captionProgressBarText, captionRewardFurniName, layout }: CollectibleHubLayoutPaddedContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="padded_cont"
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
            <Region
                name="progress_bar"
                backgroundColor="#112e31"
                layout={{ position: 'absolute', left: 0, width: 282, top: 34, height: 18 }}
            >
                <Region
                    name="progress_padded_bar"
                    layout={{ position: 'absolute', left: 1, width: 280, top: 1, height: 16 }}
                >
                    <Region
                        name="progress_bar_top"
                        backgroundColor="#00910a"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8 }}
                    />
                    <Region
                        name="progress_bar_bottom"
                        backgroundColor="#037c00"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8 }}
                    />
                </Region>
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
        </Region>
    );
};

/** Named region `completion_header_container` of CollectibleHubLayout - configured through the parent's `completionHeaderContainer` prop. */
export interface CollectibleHubLayoutCompletionHeaderContainerProps {
    layout?: BoxLayout;
    paddedCont?: CollectibleHubLayoutPaddedContProps;
}

export const CollectibleHubLayoutCompletionHeaderContainer = ({ layout, paddedCont }: CollectibleHubLayoutCompletionHeaderContainerProps) => {
    return (
        <Region
            name="completion_header_container"
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
}

export const CollectibleHubLayoutBonusOrRewardContainer = ({ completionHeaderContainer, layout, onClaimButton }: CollectibleHubLayoutBonusOrRewardContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bonus_or_reward_container"
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

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainer2Props {
    bonusOrRewardContainer?: CollectibleHubLayoutBonusOrRewardContainerProps;
    captionPreviewFurniName?: string;
    captionPreviewRewardText?: string;
    captionPreviewScoreText?: string;
    captionProcuctScoreText?: string;
    itemsProductInfoList?: ReactNode;
    layout?: BoxLayout;
    onProductNameContainer?: () => void;
    srcBgStar?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    visibleAvatarImageWidget?: boolean;
    visibleBadgeImageWidget?: boolean;
    visibleCollectionProgressContainer?: boolean;
    visibleEffectImageWidget?: boolean;
    visiblePetImageWidget?: boolean;
    visiblePlaceholderImage?: boolean;
    visibleProductInfoContainer?: boolean;
    visibleProductNameContainer?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutPreviewContainer2 = ({ bonusOrRewardContainer, captionPreviewFurniName, captionPreviewRewardText, captionPreviewScoreText, captionProcuctScoreText, itemsProductInfoList, layout, onProductNameContainer, srcBgStar, srcPlaceholderImage, srcProductPreview, srcUnknownImage, visibleAvatarImageWidget, visibleBadgeImageWidget, visibleCollectionProgressContainer, visibleEffectImageWidget, visiblePetImageWidget, visiblePlaceholderImage, visibleProductInfoContainer, visibleProductNameContainer, visibleUnknownImage }: CollectibleHubLayoutPreviewContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
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
                {(visiblePlaceholderImage ?? false) && (
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                )}
                {(visibleAvatarImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="avatar_image_widget"
                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                    />
                )}
                {(visibleBadgeImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge_image_widget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                        layout={{ position: 'absolute', width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                    />
                )}
                {(visibleUnknownImage ?? false) && (
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', width: 48, alignSelf: 'center', height: 48 }}
                    />
                )}
                {(visiblePetImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_image_widget"
                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                    />
                )}
                {(visibleEffectImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="room_previewer"
                        name="effect_image_widget"
                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                    />
                )}
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                {(visibleProductNameContainer ?? false) && (
                    <Region
                        name="product_name_container"
                        backgroundColor="#000000"
                        onPointerTap={onProductNameContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
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
                )}
                {(visibleProductInfoContainer ?? false) && (
                    <Region
                        name="product_info_container"
                        backgroundColor="#3b1829"
                        layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194 }}
                    >
                        <Region
                            name="product_info_list"
                            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2 }}
                        >
                            {itemsProductInfoList ?? (
                                <CollectibleHubLayoutProductInfoEntryTemplateItem />
                            )}
                        </Region>
                    </Region>
                )}
                <CollectibleHubLayoutBonusOrRewardContainer {...bonusOrRewardContainer} />
                {(visibleCollectionProgressContainer ?? false) && (
                    <Region
                        name="collection_progress_container"
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 290, top: 200, height: 60, justifyContent: 'center' }}
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
                )}
                <Region
                    name="product_progress_container"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 220, height: 40 }}
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
            </Border>
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem3Props {
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
    visiblePetImageWidget?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem3 = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage, visiblePetImageWidget }: CollectibleHubLayoutItemTemplateItem3Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
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
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    options={{ 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                />
            )}
            <Region
                name="number_container"
                layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50 }}
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
}

export const CollectibleHubLayoutItemgridCollection = ({ itemsItemgridCollection, layout }: CollectibleHubLayoutItemgridCollectionProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 123, ...layout }}
        >
            <Region
                name="itemgrid_collection"
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
}

export const CollectibleHubLayoutItemContainer = ({ itemgridCollection, layout }: CollectibleHubLayoutItemContainerProps) => {
    return (
        <Region
            name="item_container"
            layout={{ position: 'absolute', left: 0, width: 290, top: 300, height: 123, ...layout }}
        >
            <CollectibleHubLayoutItemgridCollection {...itemgridCollection} />
        </Region>
    );
};

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContentProps {
    captionCollectionName?: string;
    captionProgressText?: string;
    itemContainer?: CollectibleHubLayoutItemContainerProps;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer2Props;
}

export const CollectibleHubLayoutCollectionContent = ({ captionCollectionName, captionProgressText, itemContainer, layout, previewContainer }: CollectibleHubLayoutCollectionContentProps) => {
    return (
        <Region
            name="collection_content"
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
                <Region
                    name="progress_header_container"
                    layout={{ position: 'absolute', left: 248, width: 40, top: 2, height: 26, minWidth: 40, maxWidth: 40 }}
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
            </Border>
            <CollectibleHubLayoutPreviewContainer2 {...previewContainer} />
            <CollectibleHubLayoutItemContainer {...itemContainer} />
        </Region>
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent2Props {
    captionSearchPlaceholder?: string;
    collectionContent?: CollectibleHubLayoutCollectionContentProps;
    layout?: BoxLayout;
    navigationContainer?: CollectibleHubLayoutNavigationContainerProps;
    onSearchClearButton?: () => void;
    onSortSelection?: () => void;
    onWalletSelection?: () => void;
    srcSearchIcon?: string;
}

export const CollectibleHubLayoutLoadedContent2 = ({ captionSearchPlaceholder, collectionContent, layout, navigationContainer, onSearchClearButton, onSortSelection, onWalletSelection, srcSearchIcon }: CollectibleHubLayoutLoadedContent2Props) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="loaded_content"
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
                <Region
                    name="buttonContainer"
                    layout={{ position: 'absolute', left: 160, width: 24, top: 0, height: 24, justifyContent: 'center' }}
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

/** Named region `collectionsContainer` of CollectibleHubLayout - configured through the parent's `collectionsContainer` prop. */
export interface CollectibleHubLayoutCollectionsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent2Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
}

export const CollectibleHubLayoutCollectionsContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents }: CollectibleHubLayoutCollectionsContainerProps) => {
    return (
        <Region
            name="collectionsContainer"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutLoadedContent2 {...loadedContent} />
            {(visibleLoadingContents ?? false) && (
                <Region
                    name="loading_contents"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
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
            )}
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem4Props {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    visibleItemHilightOuter?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem4 = ({ captionItemTitle, layout, onItemTemplate, visibleItemHilightOuter }: CollectibleHubLayoutItemTemplateItem4Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                {(visibleItemHilightOuter ?? false) && (
                    <Region
                        name="item_hilight_outer"
                        backgroundColor="#82d1ed"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                    >
                        <Region
                            name="item_hilight_inner"
                            backgroundColor="#63c5e9"
                            layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                        />
                    </Region>
                )}
            </Region>
            <Region
                name="item_title"
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

/** Named region `navigationContainer` of CollectibleHubLayout - configured through the parent's `navigationContainer` prop. */
export interface CollectibleHubLayoutNavigationContainer2Props {
    itemsNavigationList?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutNavigationContainer2 = ({ itemsNavigationList, layout }: CollectibleHubLayoutNavigationContainer2Props) => {
    return (
        <Region
            name="navigationContainer"
            layout={{ position: 'absolute', left: 8, width: 184, top: 3, bottom: 0, ...layout }}
        >
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5 }}
            >
                <Region
                    name="navigationList"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsNavigationList ?? (
                        <CollectibleHubLayoutItemTemplateItem4 />
                    )}
                </Region>
            </ScrollArea>
        </Region>
    );
};

/** Row template `product_info_entry_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutProductInfoEntryTemplateItem2Props {
    captionProductInfoKey?: string;
    captionProductInfoValue?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutProductInfoEntryTemplateItem2 = ({ captionProductInfoKey, captionProductInfoValue, layout }: CollectibleHubLayoutProductInfoEntryTemplateItem2Props) => {
    return (
        <Region
            name="product_info_entry_template"
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

/** Row template `mintlimit_text` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutMintlimitTextItemProps {
    captionMintlimitText?: string;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutMintlimitTextItem = ({ captionMintlimitText, layout }: CollectibleHubLayoutMintlimitTextItemProps) => {
    return (
        <Region
            name="mintlimit_text"
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

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainer3Props {
    captionPreviewFurniName?: string;
    captionPriceText?: string;
    itemsMintlimitContainer?: ReactNode;
    itemsProductInfoList?: ReactNode;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onProductNameContainer?: () => void;
    srcBgStar?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    visibleAvatarImageWidget?: boolean;
    visibleBadgeImageWidget?: boolean;
    visibleEffectImageWidget?: boolean;
    visiblePetImageWidget?: boolean;
    visiblePlaceholderImage?: boolean;
    visibleProductInfoContainer?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutPreviewContainer3 = ({ captionPreviewFurniName, captionPriceText, itemsMintlimitContainer, itemsProductInfoList, layout, onBuyButton, onProductNameContainer, srcBgStar, srcPlaceholderImage, srcProductPreview, srcUnknownImage, visibleAvatarImageWidget, visibleBadgeImageWidget, visibleEffectImageWidget, visiblePetImageWidget, visiblePlaceholderImage, visibleProductInfoContainer, visibleUnknownImage }: CollectibleHubLayoutPreviewContainer3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
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
                {(visiblePlaceholderImage ?? false) && (
                    <ThemeImage
                        name="placeholder_image"
                        src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                    />
                )}
                {(visibleAvatarImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="avatar_image_widget"
                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                    />
                )}
                {(visibleBadgeImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge_image_widget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                        layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                    />
                )}
                {(visibleUnknownImage ?? false) && (
                    <ThemeImage
                        name="unknown_image"
                        src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                        layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 48, alignSelf: 'center', height: 48 }}
                    />
                )}
                {(visiblePetImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_image_widget"
                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 180, alignSelf: 'center', height: 140, overflow: 'hidden' }}
                    />
                )}
                {(visibleEffectImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="room_previewer"
                        name="effect_image_widget"
                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                        layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                    />
                )}
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                <Region
                    name="product_name_container"
                    backgroundColor="#000000"
                    onPointerTap={onProductNameContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
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
                {(visibleProductInfoContainer ?? false) && (
                    <Region
                        name="product_info_container"
                        backgroundColor="#3b1829"
                        layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194 }}
                    >
                        <Region
                            name="product_info_list"
                            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2 }}
                        >
                            {itemsProductInfoList ?? (
                                <CollectibleHubLayoutProductInfoEntryTemplateItem2 />
                            )}
                        </Region>
                    </Region>
                )}
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
                <Region
                    name="mintlimit_container"
                    layout={{ position: 'absolute', right: 10, top: 196, flexDirection: 'row', gap: 4 }}
                >
                    {itemsMintlimitContainer ?? (
                        <CollectibleHubLayoutMintlimitTextItem />
                    )}
                    <ThemeImage
                        src={layoutImage('collectables_icon_curator_stamp_small.png')}
                        layout={{ width: 18, height: 30, flexShrink: 0 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem5Props {
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcEmeraldIcon?: string;
    srcUnknownImage?: string;
    visiblePetImageWidget?: boolean;
    visibleTextBorder?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem5 = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcEmeraldIcon, srcUnknownImage, visiblePetImageWidget, visibleTextBorder }: CollectibleHubLayoutItemTemplateItem5Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
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
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="pet_image"
                    name="pet_image_widget"
                    options={{ 'pet_image:shrink_on_overflow': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, alignSelf: 'center', marginTop: -7, marginBottom: 7, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
                />
            )}
            <Region
                name="number_container"
                layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 20, minWidth: 50, maxWidth: 50 }}
            >
                {(visibleTextBorder ?? false) && (
                    <Border
                        variant="3"
                        name="text_border"
                        tintColor="#337c00"
                        layout={{ position: 'absolute', left: 3, width: 44, top: 5, height: 12 }}
                    />
                )}
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
        </Region>
    );
};

/** Named region `itemgrid_shop` of CollectibleHubLayout - configured through the parent's `itemgridShop` prop. */
export interface CollectibleHubLayoutItemgridShopProps {
    itemsItemgridShop?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemgridShop = ({ itemsItemgridShop, layout }: CollectibleHubLayoutItemgridShopProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 153, ...layout }}
        >
            <Region
                name="itemgrid_shop"
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
}

export const CollectibleHubLayoutItemContainer2 = ({ itemgridShop, layout }: CollectibleHubLayoutItemContainer2Props) => {
    return (
        <Region
            name="item_container"
            layout={{ position: 'absolute', left: 0, width: 290, top: 270, height: 153, ...layout }}
        >
            <CollectibleHubLayoutItemgridShop {...itemgridShop} />
        </Region>
    );
};

/** Named region `collection_content` of CollectibleHubLayout - configured through the parent's `collectionContent` prop. */
export interface CollectibleHubLayoutCollectionContent2Props {
    itemContainer?: CollectibleHubLayoutItemContainer2Props;
    layout?: BoxLayout;
    previewContainer?: CollectibleHubLayoutPreviewContainer3Props;
}

export const CollectibleHubLayoutCollectionContent2 = ({ itemContainer, layout, previewContainer }: CollectibleHubLayoutCollectionContent2Props) => {
    return (
        <Region
            name="collection_content"
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
}

export const CollectibleHubLayoutLoadedContent3 = ({ collectionContent, layout, navigationContainer }: CollectibleHubLayoutLoadedContent3Props) => {
    return (
        <Region
            name="loaded_content"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 428, ...layout }}
        >
            <CollectibleHubLayoutNavigationContainer2 {...navigationContainer} />
            <CollectibleHubLayoutCollectionContent2 {...collectionContent} />
        </Region>
    );
};

/** Named region `shopContainer` of CollectibleHubLayout - configured through the parent's `shopContainer` prop. */
export interface CollectibleHubLayoutShopContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent3Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleShopContainer?: boolean;
}

export const CollectibleHubLayoutShopContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleShopContainer }: CollectibleHubLayoutShopContainerProps) => {
    return (
        (visibleShopContainer ?? false) && (
            <Region
                name="shopContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: -5, right: 15, top: 125, height: 428, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent3 {...loadedContent} />
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 5, width: 485, top: 0, height: 429 }}
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
                )}
            </Region>
        )
    );
};

/** Named region `loaded_content` of CollectibleHubLayout - configured through the parent's `loadedContent` prop. */
export interface CollectibleHubLayoutLoadedContent4Props {
    captionTransferFeeText?: string;
    layout?: BoxLayout;
    onTransferButton?: () => void;
    onTransferWalletSelection?: () => void;
    srcTransferFeeIcon?: string;
}

export const CollectibleHubLayoutLoadedContent4 = ({ captionTransferFeeText, layout, onTransferButton, onTransferWalletSelection, srcTransferFeeIcon }: CollectibleHubLayoutLoadedContent4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="loaded_content"
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, ...layout }}
        >
            <Region
                name="headercontainer"
                layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 50, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, alignSelf: 'center', height: 30, minWidth: 450, maxWidth: 450, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('collectibles.transfer.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                    />
                </Region>
            </Region>
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
                        <Region
                            name="spacing"
                            layout={{ width: 4, height: 30, flexShrink: 0 }}
                        />
                        <ThemeImage
                            name="transfer_fee_icon"
                            src={srcTransferFeeIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ width: 24, height: 30, flexShrink: 0 }}
                        />
                        <Region
                            name="spacing"
                            layout={{ width: 6, height: 30, flexShrink: 0 }}
                        />
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

/** Named region `transferContainer` of CollectibleHubLayout - configured through the parent's `transferContainer` prop. */
export interface CollectibleHubLayoutTransferContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent4Props;
    srcLoadingIcon?: string;
    visibleLoadingContents?: boolean;
    visibleTransferContainer?: boolean;
}

export const CollectibleHubLayoutTransferContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadingContents, visibleTransferContainer }: CollectibleHubLayoutTransferContainerProps) => {
    return (
        (visibleTransferContainer ?? false) && (
            <Region
                name="transferContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutLoadedContent4 {...loadedContent} />
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
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
                )}
            </Region>
        )
    );
};

/** Named region `category_collector_header_region` of CollectibleHubLayout - configured through the parent's `categoryCollectorHeaderRegion` prop. */
export interface CollectibleHubLayoutCategoryCollectorHeaderRegionProps {
    captionCollectorCollectionsHeader?: string;
    captionCollectorProfileDescription?: string;
    captionCollectorProfileDescription2?: string;
    captionInfoDesc?: string;
    captionTransferDesc?: string;
    layout?: BoxLayout;
    onCategoryInfoDescriptionRegion?: () => void;
    onCategoryInfoHeaderRegion?: () => void;
    onCategoryInfoTransferRegion?: () => void;
    visibleCollectorProfileDescription?: boolean;
    visibleCollectorProfileDescription2?: boolean;
}

export const CollectibleHubLayoutCategoryCollectorHeaderRegion = ({ captionCollectorCollectionsHeader, captionCollectorProfileDescription, captionCollectorProfileDescription2, captionInfoDesc, captionTransferDesc, layout, onCategoryInfoDescriptionRegion, onCategoryInfoHeaderRegion, onCategoryInfoTransferRegion, visibleCollectorProfileDescription, visibleCollectorProfileDescription2 }: CollectibleHubLayoutCategoryCollectorHeaderRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_collector_header_region"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 135, overflow: 'hidden', ...layout }}
        >
            <Region
                name="category_info_header_region"
                onPointerTap={onCategoryInfoHeaderRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
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
            <Region
                name="category_info_description_region"
                onPointerTap={onCategoryInfoDescriptionRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 50 }}
            >
                {(visibleCollectorProfileDescription ?? false) && (
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
                )}
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
            <Region
                name="category_info_transfer_region"
                onPointerTap={onCategoryInfoTransferRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 480, top: 75, height: 60 }}
            >
                {(visibleCollectorProfileDescription2 ?? false) && (
                    <Region
                        name="collector_profile_description"
                        layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCollectorProfileDescription2 ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                        />
                    </Region>
                )}
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
        </Region>
    );
};

/** Named region `category_content_background` of CollectibleHubLayout - configured through the parent's `categoryContentBackground` prop. */
export interface CollectibleHubLayoutCategoryContentBackgroundProps {
    categoryCollectorHeaderRegion?: CollectibleHubLayoutCategoryCollectorHeaderRegionProps;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutCategoryContentBackground = ({ categoryCollectorHeaderRegion, layout }: CollectibleHubLayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden', ...layout }}
        >
            <CollectibleHubLayoutCategoryCollectorHeaderRegion {...categoryCollectorHeaderRegion} />
        </Region>
    );
};

/** Named region `infoContainer` of CollectibleHubLayout - configured through the parent's `infoContainer` prop. */
export interface CollectibleHubLayoutInfoContainerProps {
    categoryContentBackground?: CollectibleHubLayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
    visibleInfoContainer?: boolean;
}

export const CollectibleHubLayoutInfoContainer = ({ categoryContentBackground, layout, visibleInfoContainer }: CollectibleHubLayoutInfoContainerProps) => {
    return (
        (visibleInfoContainer ?? false) && (
            <Region
                name="infoContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 419, overflow: 'hidden', ...layout }}
            >
                <CollectibleHubLayoutCategoryContentBackground {...categoryContentBackground} />
                <ThemeImage
                    src={layoutImage('collectables_collection_default.png')}
                    layout={{ position: 'absolute', left: 128, width: 216, top: 155, height: 264 }}
                />
            </Region>
        )
    );
};

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem6Props {
    captionAmountText?: string;
    captionCollectionText?: string;
    captionExpiresText?: string;
    captionItemName?: string;
    captionWalletText?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcUnknownImage?: string;
    visiblePetImageWidget?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem6 = ({ captionAmountText, captionCollectionText, captionExpiresText, captionItemName, captionWalletText, layout, onItemTemplate, srcBitmap, srcUnknownImage, visiblePetImageWidget }: CollectibleHubLayoutItemTemplateItem6Props) => {
    return (
        <Region
            name="item_template"
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 466, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
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
            {(visiblePetImageWidget ?? false) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="pet_image_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
                />
            )}
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
            <Region
                name="amount_container"
                layout={{ position: 'absolute', left: 27, width: 20, top: 34, height: 16 }}
            >
                <Border
                    variant="3"
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 14 }}
                />
                <Region
                    name="amount_text"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionAmountText ?? 'x0'}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `itemlist` of CollectibleHubLayout - configured through the parent's `itemlist` prop. */
export interface CollectibleHubLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const CollectibleHubLayoutItemlist = ({ itemsItemlist, layout }: CollectibleHubLayoutItemlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374, ...layout }}
        >
            <Region
                name="itemlist"
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
}

export const CollectibleHubLayoutItemContainer3 = ({ itemlist, layout }: CollectibleHubLayoutItemContainer3Props) => {
    return (
        <Region
            name="item_container"
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
    visibleLoadedContent?: boolean;
}

export const CollectibleHubLayoutLoadedContent5 = ({ itemContainer, layout, onClaimButton, visibleLoadedContent }: CollectibleHubLayoutLoadedContent5Props) => {
    const t = useTranslation();

    return (
        (visibleLoadedContent ?? false) && (
            <Region
                name="loaded_content"
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
        )
    );
};

/** Named region `rewardsContainer` of CollectibleHubLayout - configured through the parent's `rewardsContainer` prop. */
export interface CollectibleHubLayoutRewardsContainerProps {
    layout?: BoxLayout;
    loadedContent?: CollectibleHubLayoutLoadedContent5Props;
    srcLoadingIcon?: string;
    visibleLoadedContent?: boolean;
    visibleLoadingContents?: boolean;
    visibleRewardsContainer?: boolean;
}

export const CollectibleHubLayoutRewardsContainer = ({ layout, loadedContent, srcLoadingIcon, visibleLoadedContent, visibleLoadingContents, visibleRewardsContainer }: CollectibleHubLayoutRewardsContainerProps) => {
    const t = useTranslation();

    return (
        (visibleRewardsContainer ?? false) && (
            <Region
                name="rewardsContainer"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden', ...layout }}
            >
                {(visibleLoadedContent ?? false) && (
                    <CollectibleHubLayoutLoadedContent5 {...loadedContent} />
                )}
                <Region
                    name="no_content_container"
                    layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                >
                    <Region
                        name="headercontainer"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 100, justifyContent: 'center' }}
                    >
                        <Region layout={{ position: 'absolute', marginLeft: 1.5, marginRight: -1.5, width: 450, top: 28, bottom: 55, minWidth: 450, maxWidth: 450, minHeight: 17, maxHeight: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('collectibles.no_claims')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="image_container"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 100, height: 332, justifyContent: 'center' }}
                    >
                        <ThemeImage
                            src={layoutImage('image_frank_dont_know.png')}
                            layout={{ position: 'absolute', width: 485, alignSelf: 'center', marginTop: -28, marginBottom: 28, height: 176 }}
                        />
                    </Region>
                </Region>
                {(visibleLoadingContents ?? false) && (
                    <Region
                        name="loading_contents"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
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
                )}
            </Region>
        )
    );
};
