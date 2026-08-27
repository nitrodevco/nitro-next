import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1531_collectible_hub_xml` (layout "collectible_view", 500x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectibleHubLayoutProps {
    captionCaptionAllTimeHighScore?: string;
    captionCaptionCurrentScore?: string;
    captionCollectionName?: string;
    captionCollectorCollectionsHeader?: string;
    captionCollectorLevel?: string;
    captionCollectorLevelDescription?: string;
    captionCollectorLevelHeader?: string;
    captionCollectorProfileDescription?: string;
    captionCollectorProfileDescription2?: string;
    captionCollectorProfileDescription3?: string;
    captionCollectorProfileHeader?: string;
    captionCurrentHiscoreKey?: string;
    captionCurrentHiscoreValue?: string;
    captionCurrentScoreKey?: string;
    captionCurrentScoreValue?: string;
    captionEmeraldCurrencyValue?: string;
    captionInfoDesc?: string;
    captionLevelTitle?: string;
    captionMintingDescription?: string;
    captionMintingHeader?: string;
    captionMintLockText?: string;
    captionMintTokenBalance?: string;
    captionNoWalletText?: string;
    captionPreviewFurniName?: string;
    captionPreviewFurniName2?: string;
    captionPreviewFurniName3?: string;
    captionPreviewRewardText?: string;
    captionPreviewScoreText?: string;
    captionPriceText?: string;
    captionProcuctScoreText?: string;
    captionProgressBarText?: string;
    captionProgressBarText2?: string;
    captionProgressText?: string;
    captionRewardFurniName?: string;
    captionSearchPlaceholder?: string;
    captionSilverCostText?: string;
    captionSilverCurrencyValue?: string;
    captionStampPricing?: string;
    captionStampsHeader?: string;
    captionStampsHeader2?: string;
    captionTransferDesc?: string;
    captionTransferFeeText?: string;
    itemsItemgridCollection?: ReactNode;
    itemsItemgridInventory?: ReactNode;
    itemsItemgridShop?: ReactNode;
    itemsItemlist?: ReactNode;
    itemsMintlimitContainer?: ReactNode;
    itemsNavigationList?: ReactNode;
    itemsNavigationList2?: ReactNode;
    itemsProductInfoList?: ReactNode;
    itemsProductInfoList2?: ReactNode;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCategoryInfoDescriptionRegion?: () => void;
    onCategoryInfoHeaderRegion?: () => void;
    onCategoryInfoTransferRegion?: () => void;
    onCategoryMintingDescriptionRegion?: () => void;
    onCategoryMintingDescriptionRegion2?: () => void;
    onCategoryMintingDescriptionRegion3?: () => void;
    onCategoryNameRegion?: () => void;
    onCategoryNameRegion2?: () => void;
    onCategoryNameRegion3?: () => void;
    onClaimButton?: () => void;
    onClaimButton2?: () => void;
    onClose?: () => void;
    onCollectButton?: () => void;
    onCreateWalletButton?: () => void;
    onMoreInfoButton?: () => void;
    onProductNameContainer?: () => void;
    onProductNameContainer2?: () => void;
    onProductNameContainer3?: () => void;
    onSearchClearButton?: () => void;
    onSilverBuyButton?: () => void;
    onSortSelection?: () => void;
    onStampsPurchaseDropdown?: () => void;
    onTopViewCollectionsButton?: () => void;
    onTopViewInfoButton?: () => void;
    onTopViewLevelsButton?: () => void;
    onTopViewMintingButton?: () => void;
    onTopViewProfileButton?: () => void;
    onTopViewRewardsButton?: () => void;
    onTopViewShopButton?: () => void;
    onTopViewTransferButton?: () => void;
    onTransferButton?: () => void;
    onTransferWalletSelection?: () => void;
    onWalletSelection?: () => void;
    srcBgStar?: string;
    srcBgStar2?: string;
    srcBgStar3?: string;
    srcCollectableBgLeft?: string;
    srcCollectableBgRight?: string;
    srcCollectorLevelBg?: string;
    srcCollectorLevelBg2?: string;
    srcEmeraldCurrencyIcon?: string;
    srcLoadingIcon?: string;
    srcLoadingIcon2?: string;
    srcLoadingIcon3?: string;
    srcLoadingIcon4?: string;
    srcLoadingIcon5?: string;
    srcMintLockClosedIcon?: string;
    srcMintLockOpenIcon?: string;
    srcPlaceholderImage?: string;
    srcPlaceholderImage2?: string;
    srcPlaceholderImage3?: string;
    srcProductPreview?: string;
    srcProductPreview2?: string;
    srcProductPreview3?: string;
    srcSearchIcon?: string;
    srcSilverCurrencyIcon?: string;
    srcTransferFeeIcon?: string;
    srcUnknownImage?: string;
    srcUnknownImage2?: string;
    srcUnknownImage3?: string;
    visibleCategoryNameRegion?: boolean;
    visibleCollectionProgressContainer?: boolean;
    visibleCollectorProfileContainer?: boolean;
    visibleInfoContainer?: boolean;
    visibleLevelsContainer?: boolean;
    visibleLoadedContent?: boolean;
    visibleLoadingContents?: boolean;
    visibleLoadingContents2?: boolean;
    visibleLoadingContents3?: boolean;
    visibleLoadingContents4?: boolean;
    visibleLoadingContents5?: boolean;
    visibleMintingContainer?: boolean;
    visibleNoWalletContainer?: boolean;
    visibleProductInfoContainer?: boolean;
    visibleProductInfoContainer2?: boolean;
    visibleProductNameContainer?: boolean;
    visibleRewardsContainer?: boolean;
    visibleShopContainer?: boolean;
    visibleTabBg?: boolean;
    visibleTopViewLevelsButton?: boolean;
    visibleTopViewProfileButton?: boolean;
    visibleTransferContainer?: boolean;
}

export const CollectibleHubLayout = ({ captionCaptionAllTimeHighScore, captionCaptionCurrentScore, captionCollectionName, captionCollectorCollectionsHeader, captionCollectorLevel, captionCollectorLevelDescription, captionCollectorLevelHeader, captionCollectorProfileDescription, captionCollectorProfileDescription2, captionCollectorProfileDescription3, captionCollectorProfileHeader, captionCurrentHiscoreKey, captionCurrentHiscoreValue, captionCurrentScoreKey, captionCurrentScoreValue, captionEmeraldCurrencyValue, captionInfoDesc, captionLevelTitle, captionMintingDescription, captionMintingHeader, captionMintLockText, captionMintTokenBalance, captionNoWalletText, captionPreviewFurniName, captionPreviewFurniName2, captionPreviewFurniName3, captionPreviewRewardText, captionPreviewScoreText, captionPriceText, captionProcuctScoreText, captionProgressBarText, captionProgressBarText2, captionProgressText, captionRewardFurniName, captionSearchPlaceholder, captionSilverCostText, captionSilverCurrencyValue, captionStampPricing, captionStampsHeader, captionStampsHeader2, captionTransferDesc, captionTransferFeeText, itemsItemgridCollection, itemsItemgridInventory, itemsItemgridShop, itemsItemlist, itemsMintlimitContainer, itemsNavigationList, itemsNavigationList2, itemsProductInfoList, itemsProductInfoList2, layout, onBuyButton, onCategoryInfoDescriptionRegion, onCategoryInfoHeaderRegion, onCategoryInfoTransferRegion, onCategoryMintingDescriptionRegion, onCategoryMintingDescriptionRegion2, onCategoryMintingDescriptionRegion3, onCategoryNameRegion, onCategoryNameRegion2, onCategoryNameRegion3, onClaimButton, onClaimButton2, onClose, onCollectButton, onCreateWalletButton, onMoreInfoButton, onProductNameContainer, onProductNameContainer2, onProductNameContainer3, onSearchClearButton, onSilverBuyButton, onSortSelection, onStampsPurchaseDropdown, onTopViewCollectionsButton, onTopViewInfoButton, onTopViewLevelsButton, onTopViewMintingButton, onTopViewProfileButton, onTopViewRewardsButton, onTopViewShopButton, onTopViewTransferButton, onTransferButton, onTransferWalletSelection, onWalletSelection, srcBgStar, srcBgStar2, srcBgStar3, srcCollectableBgLeft, srcCollectableBgRight, srcCollectorLevelBg, srcCollectorLevelBg2, srcEmeraldCurrencyIcon, srcLoadingIcon, srcLoadingIcon2, srcLoadingIcon3, srcLoadingIcon4, srcLoadingIcon5, srcMintLockClosedIcon, srcMintLockOpenIcon, srcPlaceholderImage, srcPlaceholderImage2, srcPlaceholderImage3, srcProductPreview, srcProductPreview2, srcProductPreview3, srcSearchIcon, srcSilverCurrencyIcon, srcTransferFeeIcon, srcUnknownImage, srcUnknownImage2, srcUnknownImage3, visibleCategoryNameRegion, visibleCollectionProgressContainer, visibleCollectorProfileContainer, visibleInfoContainer, visibleLevelsContainer, visibleLoadedContent, visibleLoadingContents, visibleLoadingContents2, visibleLoadingContents3, visibleLoadingContents4, visibleLoadingContents5, visibleMintingContainer, visibleNoWalletContainer, visibleProductInfoContainer, visibleProductInfoContainer2, visibleProductNameContainer, visibleRewardsContainer, visibleShopContainer, visibleTabBg, visibleTopViewLevelsButton, visibleTopViewProfileButton, visibleTransferContainer }: CollectibleHubLayoutProps) => {
    const t = useTranslation();
    const [ stampsPurchaseInputValue, setStampsPurchaseInputValue ] = useState('');
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="CollectorHub"
            name="CollectorHub"
            params={1073774593}
            caption={t('collectibles.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            layout={{ width: 500, height: 600, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="collector_hub_header"
                    backgroundColor="#0b162d"
                    layout={{ position: 'absolute', left: -5, width: 500, top: -2, height: 122 }}
                >
                    <Border
                        variant="3"
                        name="collector_hub_background"
                        params={16}
                        tintColor="#2c1d29"
                        layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 125 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('collectables_score_background_gradient.png')}
                            tint="#804138"
                            layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 122 }}
                        />
                        <ThemeImage
                            name="collectable_bg_left"
                            params={16}
                            src={srcCollectableBgLeft ?? layoutImage('collectables_score_background.png')}
                            tint="#fc7c5a"
                            layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 121 }}
                        />
                        <ThemeImage
                            name="collectable_bg_right"
                            params={16}
                            src={srcCollectableBgRight ?? layoutImage('collectables_score_background_right.png')}
                            tint="#fc7c5a"
                            layout={{ position: 'absolute', left: 332, width: 166, top: -160, height: 286 }}
                        />
                        <ThemeImage
                            name="collector_level_bg2"
                            params={16}
                            src={srcCollectorLevelBg2 ?? layoutImage('collectables_score_element2.png')}
                            tint="#7c8c92"
                            layout={{ position: 'absolute', left: 0, width: 300, top: 17, height: 54 }}
                        />
                        <ThemeImage
                            name="collector_level_bg"
                            params={16}
                            src={srcCollectorLevelBg ?? layoutImage('collectables_score_element.png')}
                            tint="#7c8c92"
                            layout={{ position: 'absolute', left: 299, width: 92, top: 17, height: 72 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('collectables_cabinet_element.png')}
                            layout={{ position: 'absolute', left: -2, width: 130, top: -1, height: 128 }}
                        />
                        <Region
                            name="score_container"
                            params={16}
                            layout={{ position: 'absolute', left: 116, width: 220, top: 21, height: 45 }}
                        >
                            <Region
                                name="current_score_key"
                                params={16}
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
                                params={16}
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
                                params={16}
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
                                params={16}
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
                                params={16}
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
                                params={272}
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
                        <ThemeImage
                            params={16}
                            src={layoutImage('collectables_level_bg.png')}
                            layout={{ position: 'absolute', left: 335, width: 64, top: 2, height: 68 }}
                        />
                        <Region
                            name="level_container"
                            params={16}
                            layout={{ position: 'absolute', left: 344, width: 45, top: 16, height: 35 }}
                        >
                            <Region
                                name="collector_level"
                                params={16}
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
                                params={16}
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
                            params={16}
                            tintColor="#a99490"
                            layout={{ position: 'absolute', left: 419, width: 70, top: 18, height: 22 }}
                        >
                            <Border
                                variant="3"
                                name="silver_currency_container"
                                params={16}
                                tintColor="#3a2f29"
                                layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                            >
                                <Region
                                    name="silver_currency_value"
                                    params={16}
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
                            params={16}
                            src={srcSilverCurrencyIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                            layout={{ position: 'absolute', left: 466, width: 24, top: 17, height: 24 }}
                        />
                        <Border
                            variant="3"
                            name="emerald_currency_border"
                            params={16}
                            tintColor="#a99490"
                            layout={{ position: 'absolute', left: 419, width: 70, top: 48, height: 22 }}
                        >
                            <Border
                                variant="3"
                                name="emerald_currency_container"
                                params={16}
                                tintColor="#3a2f29"
                                layout={{ position: 'absolute', left: 1, width: 68, top: 1, height: 20 }}
                            >
                                <Region
                                    name="emerald_currency_value"
                                    params={16}
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
                            params={16}
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
                            params={16}
                            tintColor="#000000"
                            blend={0.4}
                            layout={{ width: '100%', height: '100%' }}
                        />
                    </Region>
                </Region>
                <TabContext
                    variant="3"
                    name="top_view_select_tab_context"
                    tintColor="#dfdfe1"
                    layout={{ position: 'absolute', left: -5, width: 498, top: 89, height: 34 }}
                >
                    <TabButton
                        variant="3"
                        name="top_view_rewards_button"
                        params={17}
                        onPointerTap={onTopViewRewardsButton}
                        layout={{ position: 'absolute', left: 0, width: 72, top: 0, height: 32 }}
                    >
                        Rewards
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_collections_button"
                        params={17}
                        onPointerTap={onTopViewCollectionsButton}
                        layout={{ position: 'absolute', left: 72, width: 87, top: 0, height: 32 }}
                    >
                        Collectibles
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_shop_button"
                        params={17}
                        onPointerTap={onTopViewShopButton}
                        layout={{ position: 'absolute', left: 159, width: 52, top: 0, height: 32 }}
                    >
                        Shop
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_minting_button"
                        params={17}
                        onPointerTap={onTopViewMintingButton}
                        layout={{ position: 'absolute', left: 211, width: 66, top: 0, height: 32 }}
                    >
                        Minting
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_transfer_button"
                        params={17}
                        onPointerTap={onTopViewTransferButton}
                        layout={{ position: 'absolute', left: 277, width: 70, top: 0, height: 32 }}
                    >
                        Transfer
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_info_button"
                        params={17}
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
                            params={17}
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
                            params={17}
                            onPointerTap={onTopViewLevelsButton}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            Levels
                        </TabButton>
                    </Region>
                </TabContext>
                <Region
                    name="mintingContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073889424}
                    visible={visibleMintingContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 10, top: 125, height: 430, overflow: 'hidden' }}
                >
                    <Region
                        name="loaded_content"
                        params={1073741840}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 430, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_minting_header_region"
                            tags={[ 'category_header' ]}
                            params={1073741840}
                            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 58, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_name_region"
                                params={131089}
                                onPointerTap={onCategoryNameRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                            >
                                <Region
                                    name="minting_header"
                                    params={16}
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
                                params={147473}
                                onPointerTap={onCategoryMintingDescriptionRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 35 }}
                            >
                                <Region
                                    name="minting_description"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 35, minWidth: 2, maxWidth: 480, minHeight: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionMintingDescription ?? t('shop.minting.info.description')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="furniture_container"
                            params={16}
                            layout={{ position: 'absolute', left: 4, width: 480, top: 60, height: 262 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 179, top: 0, height: 260 }}
                            >
                                <Region
                                    name="itemgrid_inventory"
                                    tags={[ 'FURNI_ITEM_GRID' ]}
                                    params={16}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                                >
                                    {itemsItemgridInventory ?? (
                                        <CollectibleHubLayoutItemTemplateItem />
                                    )}
                                </Region>
                            </ScrollArea>
                            <Region
                                name="preview_container"
                                params={16}
                                layout={{ position: 'absolute', left: 191, width: 290, top: 0, height: 260 }}
                            >
                                <Border
                                    variant="3"
                                    name="collection_preview_bg"
                                    params={16}
                                    tintColor="#3d1f39"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background.png')}
                                        layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_right.png')}
                                        layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_gradient2.png')}
                                        tint="#45ace2"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                                    />
                                    <ThemeImage
                                        name="bg_star"
                                        params={16}
                                        src={srcBgStar ?? layoutImage('bg_star_300x300.png')}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                    >
                                        <ThemeImage
                                            name="placeholder_image"
                                            params={16}
                                            src={srcPlaceholderImage ?? layoutImage('collectables_collection_default.png')}
                                            layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="avatar_image"
                                        name="avatar_image_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                                    />
                                    <WidgetSlot
                                        widgetType="badge_image"
                                        name="badge_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -40, width: 80, top: '50%', marginTop: -40, height: 80, overflow: 'hidden' }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -24, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                    >
                                        <ThemeImage
                                            name="unknown_image"
                                            params={3932176}
                                            src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                                            layout={{ position: 'absolute', left: '50%', marginLeft: -24, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="pet_image"
                                        name="pet_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -92, width: 180, top: '50%', marginTop: -70, height: 140, overflow: 'hidden' }}
                                    />
                                    <WidgetSlot
                                        widgetType="room_previewer"
                                        name="effect_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -52, width: 100, top: '50%', marginTop: -130, height: 260, overflow: 'hidden' }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    >
                                        <ThemeImage
                                            name="product_preview"
                                            params={16}
                                            src={srcProductPreview}
                                            layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                        />
                                    </Region>
                                    <Region
                                        name="product_name_container"
                                        params={17}
                                        backgroundColor="#000000"
                                        onPointerTap={onProductNameContainer}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                                    >
                                        <Region
                                            name="preview_furni_name"
                                            params={16}
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
                                        params={16}
                                        layout={{ position: 'absolute', left: 82, width: 200, top: 180, height: 30 }}
                                    >
                                        <Region
                                            params={409616}
                                            layout={{ position: 'absolute', right: 0, top: 0, flexDirection: 'row' }}
                                        >
                                            <Region
                                                name="stamp_pricing"
                                                params={16400}
                                                layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={captionStampPricing ?? '1'}
                                                    textOptions={{ fill: '#ffffff' }}
                                                />
                                            </Region>
                                            <Region
                                                name="spacing"
                                                params={16}
                                                layout={{ width: 3, height: 30, flexShrink: 0 }}
                                            />
                                            <ThemeImage
                                                params={16}
                                                src={layoutImage('collectables_icon_curator_stamp_small.png')}
                                                layout={{ width: 18, height: 30, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                params={16}
                                                layout={{ width: 7, height: 30, flexShrink: 0 }}
                                            />
                                            <Button
                                                variant="5"
                                                name="collect_button"
                                                params={131089}
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
                                        params={16}
                                        tintColor="#5a1003"
                                        blend={0.82}
                                        layout={{ position: 'absolute', left: 4, width: 282, top: 30, height: 50 }}
                                    >
                                        <Region
                                            params={3932161}
                                            layout={{ position: 'absolute', left: '50%', marginLeft: -137, width: 274, top: '50%', marginTop: -9, height: 16, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={t('shop.minting.no_furni')}
                                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                                            />
                                        </Region>
                                    </Border>
                                    <Region
                                        name="mint_info_container"
                                        params={16}
                                        backgroundColor="#000000"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 214, height: 46 }}
                                    >
                                        <Region
                                            name="right_box"
                                            params={16}
                                            layout={{ position: 'absolute', left: 64, width: 226, top: 0, height: 46 }}
                                        >
                                            <Region
                                                name="mint_lock_text"
                                                params={786433}
                                                layout={{ position: 'absolute', left: '50%', marginLeft: -113, width: 290, top: 4, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={captionMintLockText ?? t('shop.minting.region_unlocked')}
                                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290 }}
                                                />
                                            </Region>
                                            <Region
                                                name="progress_bar"
                                                params={16}
                                                backgroundColor="#112e31"
                                                layout={{ position: 'absolute', left: 0, width: 220, top: 24, height: 18 }}
                                            >
                                                <Region
                                                    name="progress_padded_bar"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 1, width: 220, top: 1, height: 16 }}
                                                >
                                                    <Region
                                                        name="progress_bar_top"
                                                        params={16}
                                                        backgroundColor="#00910a"
                                                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8 }}
                                                    />
                                                    <Region
                                                        name="progress_bar_bottom"
                                                        params={16}
                                                        backgroundColor="#037c00"
                                                        layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8 }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="progress_bar_text"
                                                    params={16}
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
                                    <ThemeImage
                                        name="mint_lock_open_icon"
                                        params={16}
                                        src={srcMintLockOpenIcon ?? layoutImage('collectables_lock_open.png')}
                                        layout={{ position: 'absolute', left: 7, width: 51, top: 208, height: 46 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                                    >
                                        <ThemeImage
                                            name="mint_lock_closed_icon"
                                            params={16}
                                            src={srcMintLockClosedIcon ?? layoutImage('collectables_lock_closed.png')}
                                            layout={{ position: 'absolute', left: 7, width: 52, top: 208, height: 46 }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                        </Region>
                        <Region
                            name="category_footer"
                            tags={[ 'category_header' ]}
                            params={1073741840}
                            layout={{ position: 'absolute', left: 0, width: 488, top: 330, height: 100, overflow: 'hidden' }}
                        >
                            <Border
                                variant="3"
                                name="large_border"
                                params={16}
                                tintColor="#bac3cd"
                                layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                            >
                                <Region
                                    name="stamp_purchasing_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                                >
                                    <Border
                                        variant="3"
                                        name="stamps_container"
                                        params={16}
                                        tintColor="#d6dbe1"
                                        layout={{ position: 'absolute', left: 42, width: 200, top: 14, height: 72 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('collectables_icon_curator_stamp_large.png')}
                                            layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                                        />
                                        <Region
                                            name="stamps_header"
                                            params={16}
                                            layout={{ position: 'absolute', left: 68, width: 122, top: 12, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={captionStampsHeader ?? t('shop.minting.tokens')}
                                                textStyle="text-style-u-bold"
                                            />
                                        </Region>
                                        <Region
                                            name="mint_token_balance"
                                            params={16}
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
                                        params={16}
                                        tintColor="#d6dbe1"
                                        layout={{ position: 'absolute', left: 246, width: 200, top: 14, height: 72 }}
                                    >
                                        <Region
                                            params={409616}
                                            layout={{ position: 'absolute', right: 4, top: 4, flexDirection: 'row', gap: 6 }}
                                        >
                                            <Region
                                                name="stamps_header"
                                                params={16}
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
                                                    params={16}
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
                                                params={17}
                                                onPointerTap={onStampsPurchaseDropdown}
                                                layout={{ width: 48, height: 21, flexShrink: 0 }}
                                            >
                                                100
                                            </Dropmenu>
                                        </Region>
                                        <Region
                                            params={409616}
                                            layout={{ position: 'absolute', right: 4, top: 36, flexDirection: 'row' }}
                                        >
                                            <Region
                                                name="silver_cost_text"
                                                params={16}
                                                layout={{ width: 13, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={captionSilverCostText ?? '1'}
                                                    textStyle="text-style-u-bold"
                                                />
                                            </Region>
                                            <Region
                                                name="spacing"
                                                params={16}
                                                layout={{ width: 4, height: 30, flexShrink: 0 }}
                                            />
                                            <ThemeImage
                                                params={16}
                                                src={layoutImage('pursearea_mid_silver_icon.png')}
                                                layout={{ width: 24, height: 30, flexShrink: 0 }}
                                            />
                                            <Region
                                                name="spacing"
                                                params={16}
                                                layout={{ width: 6, height: 30, flexShrink: 0 }}
                                            />
                                            <Button
                                                variant="5"
                                                name="silver_buy_button"
                                                params={131089}
                                                tintColor="#2095d4"
                                                onPointerTap={onSilverBuyButton}
                                                layout={{ width: 100, height: 30, flexShrink: 0, minWidth: 100 }}
                                            >
                                                {t('generic.buy')}
                                            </Button>
                                        </Region>
                                    </Border>
                                </Region>
                                <Region
                                    name="no_wallet_container"
                                    params={16}
                                    visible={visibleNoWalletContainer ?? false}
                                    layout={{ position: 'absolute', left: 0, width: 488, top: 0, height: 100 }}
                                >
                                    <Region
                                        name="no_wallet_text"
                                        params={3145744}
                                        layout={{ position: 'absolute', left: 10, width: 360, top: '50%', marginTop: -50, height: 17, minHeight: 0, maxHeight: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionNoWalletText ?? t('shop.minting.no_wallet.description')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('image_connection_problem.png')}
                                        layout={{ position: 'absolute', left: 380, width: 92, top: 5, height: 90 }}
                                    />
                                    <Button
                                        variant="5"
                                        name="create_wallet_button"
                                        params={131089}
                                        tintColor="#2095d4"
                                        onPointerTap={onCreateWalletButton}
                                        layout={{ position: 'absolute', left: 10, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                                    >
                                        {t('shop.minting.create.wallet')}
                                    </Button>
                                    <Button
                                        variant="5"
                                        name="more_info_button"
                                        params={131089}
                                        tintColor="#2095d4"
                                        onPointerTap={onMoreInfoButton}
                                        layout={{ position: 'absolute', left: 192, width: 170, top: 62, height: 30, minWidth: 170, maxWidth: 170 }}
                                    >
                                        {t('shop.minting.link.wallet')}
                                    </Button>
                                </Region>
                            </Border>
                        </Region>
                    </Region>
                    <Region
                        name="loading_contents"
                        params={16}
                        visible={visibleLoadingContents ?? false}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#a4a49f"
                            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                        />
                        <ThemeImage
                            name="loading_icon"
                            params={16}
                            src={srcLoadingIcon ?? layoutImage('loading.png')}
                            layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="collectorProfileContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073889424}
                    visible={visibleCollectorProfileContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 400, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        params={1073741840}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            tags={[ 'category_header' ]}
                            params={1073741840}
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 56, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_name_region"
                                params={131089}
                                visible={visibleCategoryNameRegion ?? false}
                                onPointerTap={onCategoryNameRegion2}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                            >
                                <Region
                                    name="collector_profile_header"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 17, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionCollectorProfileHeader ?? 'Collector Profile Header'}
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="category_minting_description_region"
                                params={147473}
                                onPointerTap={onCategoryMintingDescriptionRegion2}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30 }}
                            >
                                <Region
                                    name="collector_profile_description"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                </Region>
                <Region
                    name="collectionsContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073889424}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="loaded_content"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Dropmenu
                            variant="3"
                            name="wallet_selection"
                            params={17}
                            onPointerTap={onWalletSelection}
                            layout={{ position: 'absolute', left: 4, width: 184, top: 4, height: 24 }}
                        >
                            Collector Wallet
                        </Dropmenu>
                        <Dropmenu
                            variant="3"
                            name="sort_selection"
                            params={17}
                            onPointerTap={onSortSelection}
                            layout={{ position: 'absolute', left: 4, width: 184, top: 32, height: 24 }}
                        >
                            Sort
                        </Dropmenu>
                        <Border
                            variant="105"
                            name="searchContainer"
                            params={16}
                            layout={{ position: 'absolute', left: 4, width: 184, top: 60, height: 24 }}
                        >
                            <Region
                                name="buttonContainer"
                                params={16}
                                layout={{ position: 'absolute', left: 160, width: 24, top: 0, height: 24 }}
                            >
                                <ThemeImage
                                    name="search_icon"
                                    params={3935424}
                                    src={srcSearchIcon ?? layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 20, top: '50%', marginTop: -10, height: 20 }}
                                />
                                <Button
                                    variant="100"
                                    name="search_clear_button"
                                    tooltip="clear"
                                    params={131089}
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
                                params={16}
                                layout={{ position: 'absolute', left: 4, width: 156, top: 4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionSearchPlaceholder ?? t('generic.search')} />
                            </Region>
                        </Border>
                        <Region
                            name="navigationContainer"
                            params={2064}
                            layout={{ position: 'absolute', left: 4, width: 184, top: 88, bottom: 0 }}
                        >
                            <Border
                                variant="6"
                                params={2064}
                                blend={0.5}
                                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
                            />
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5 }}
                            >
                                <Region
                                    name="navigationList"
                                    params={2064}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    {itemsNavigationList ?? (
                                        <CollectibleHubLayoutItemTemplateItem2 />
                                    )}
                                </Region>
                            </ScrollArea>
                        </Region>
                        <Region
                            name="collection_content"
                            params={16}
                            layout={{ position: 'absolute', left: 195, width: 290, top: 3, height: 425 }}
                        >
                            <Border
                                variant="3"
                                name="collection_header_container"
                                params={16}
                                tintColor="#cbd1d8"
                                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 30 }}
                            >
                                <Region
                                    name="collection_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 121, top: 4, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionCollectionName ?? 'Collection name'} />
                                </Region>
                                <Region
                                    name="progress_header_container"
                                    params={131088}
                                    layout={{ position: 'absolute', left: 248, width: 40, top: 2, height: 26, minWidth: 40, maxWidth: 40 }}
                                >
                                    <Border
                                        variant="3"
                                        name="progress_color"
                                        params={16}
                                        tintColor="#00910a"
                                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 26 }}
                                    />
                                    <Region
                                        name="progress_text"
                                        params={16}
                                        layout={{ position: 'absolute', left: 2, width: 36, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={captionProgressText ?? '88/88'}
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                            <Region
                                name="preview_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 290, top: 34, height: 260 }}
                            >
                                <Border
                                    variant="3"
                                    name="collection_preview_bg"
                                    params={16}
                                    tintColor="#3d1f39"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background.png')}
                                        layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_right.png')}
                                        layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_gradient2.png')}
                                        tint="#45ace2"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                                    />
                                    <ThemeImage
                                        name="bg_star"
                                        params={16}
                                        src={srcBgStar2 ?? layoutImage('bg_star_300x300.png')}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                    >
                                        <ThemeImage
                                            name="placeholder_image"
                                            params={16}
                                            src={srcPlaceholderImage2 ?? layoutImage('collectables_collection_default.png')}
                                            layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="avatar_image"
                                        name="avatar_image_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                                    />
                                    <WidgetSlot
                                        widgetType="badge_image"
                                        name="badge_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -40, width: 80, top: '50%', marginTop: -40, height: 80, overflow: 'hidden' }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -24, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                    >
                                        <ThemeImage
                                            name="unknown_image"
                                            params={3932176}
                                            src={srcUnknownImage2 ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                                            layout={{ position: 'absolute', left: '50%', marginLeft: -24, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="pet_image"
                                        name="pet_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -92, width: 180, top: '50%', marginTop: -70, height: 140, overflow: 'hidden' }}
                                    />
                                    <WidgetSlot
                                        widgetType="room_previewer"
                                        name="effect_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -52, width: 100, top: '50%', marginTop: -130, height: 260, overflow: 'hidden' }}
                                    />
                                    <ThemeImage
                                        name="product_preview"
                                        params={16}
                                        src={srcProductPreview2}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    />
                                    <Region
                                        name="product_name_container"
                                        params={17}
                                        visible={visibleProductNameContainer ?? false}
                                        backgroundColor="#000000"
                                        onPointerTap={onProductNameContainer2}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                                    >
                                        <Region
                                            name="preview_furni_name"
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 290, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={captionPreviewFurniName2 ?? 'Lorem ipsum hot air balloon'}
                                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="product_info_container"
                                        params={16}
                                        visible={visibleProductInfoContainer ?? false}
                                        backgroundColor="#3b1829"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194 }}
                                    >
                                        <Region
                                            name="product_info_list"
                                            params={16}
                                            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2 }}
                                        >
                                            {itemsProductInfoList ?? (
                                                <CollectibleHubLayoutProductInfoEntryTemplateItem />
                                            )}
                                        </Region>
                                    </Region>
                                    <Region
                                        name="bonus_or_reward_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 200 }}
                                    >
                                        <Region
                                            name="completion_header_container"
                                            params={16}
                                            backgroundColor="#000000"
                                            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 60 }}
                                        >
                                            <Region
                                                name="padded_cont"
                                                params={16}
                                                layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 52 }}
                                            >
                                                <Region
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 0, width: 282, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <ThemeText
                                                        text={t('collectibles.preview.completion_bonus')}
                                                        textOptions={{ fill: '#ffd300', align: 'center' }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="reward_furni_name"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 0, width: 282, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <ThemeText
                                                        text={captionRewardFurniName ?? 'Lorem ipsum hot air balloon'}
                                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="progress_bar"
                                                    params={16}
                                                    backgroundColor="#112e31"
                                                    layout={{ position: 'absolute', left: 0, width: 282, top: 34, height: 18 }}
                                                >
                                                    <Region
                                                        name="progress_padded_bar"
                                                        params={16}
                                                        layout={{ position: 'absolute', left: 1, width: 280, top: 1, height: 16 }}
                                                    >
                                                        <Region
                                                            name="progress_bar_top"
                                                            params={16}
                                                            backgroundColor="#00910a"
                                                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 8 }}
                                                        />
                                                        <Region
                                                            name="progress_bar_bottom"
                                                            params={16}
                                                            backgroundColor="#037c00"
                                                            layout={{ position: 'absolute', left: 0, width: 120, top: 8, height: 8 }}
                                                        />
                                                    </Region>
                                                    <Region
                                                        name="progress_bar_text"
                                                        params={16}
                                                        layout={{ position: 'absolute', left: 0, width: 282, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <ThemeText
                                                            text={captionProgressBarText2 ?? t('shop.minting.time_left')}
                                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                                        />
                                                    </Region>
                                                </Region>
                                            </Region>
                                        </Region>
                                        <Button
                                            variant="5"
                                            name="claim_button"
                                            params={393233}
                                            tintColor="#01a101"
                                            onPointerTap={onClaimButton}
                                            layout={{ position: 'absolute', right: 7, width: 97, top: 166, height: 30 }}
                                        >
                                            {t('collectibles.claim')}
                                        </Button>
                                    </Region>
                                    <Region
                                        name="collection_progress_container"
                                        params={16}
                                        visible={visibleCollectionProgressContainer ?? false}
                                        backgroundColor="#000000"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 200, height: 60 }}
                                    >
                                        <Region
                                            name="preview_score_text"
                                            params={786433}
                                            layout={{ position: 'absolute', left: '50%', marginLeft: -145, width: 290, top: 3, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={captionPreviewScoreText ?? t('collectibles.preview.score')}
                                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290, align: 'center' }}
                                            />
                                        </Region>
                                        <Border
                                            variant="3"
                                            params={16}
                                            tintColor="#5a1003"
                                            layout={{ position: 'absolute', left: 4, width: 282, top: 24, height: 32 }}
                                        >
                                            <Region
                                                name="preview_reward_text"
                                                params={3932161}
                                                layout={{ position: 'absolute', left: '50%', marginLeft: -137, width: 274, top: '50%', marginTop: -14, height: 28, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                            >
                                                <ThemeText
                                                    text={captionPreviewRewardText ?? t('collectibles.preview.reward')}
                                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                                                />
                                            </Region>
                                        </Border>
                                    </Region>
                                    <Region
                                        name="product_progress_container"
                                        params={16}
                                        backgroundColor="#000000"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 220, height: 40 }}
                                    >
                                        <Border
                                            variant="3"
                                            params={16}
                                            tintColor="#5a1003"
                                            layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 32 }}
                                        >
                                            <Region
                                                name="procuct_score_text"
                                                params={3932161}
                                                layout={{ position: 'absolute', left: '50%', marginLeft: -137, width: 274, top: '50%', marginTop: -8, height: 16, minWidth: 274, maxWidth: 274, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
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
                            <Region
                                name="item_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 290, top: 300, height: 123 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 123 }}
                                >
                                    <Region
                                        name="itemgrid_collection"
                                        tags={[ 'FURNI_ITEM_GRID' ]}
                                        params={16}
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                                    >
                                        {itemsItemgridCollection ?? (
                                            <CollectibleHubLayoutItemTemplateItem3 />
                                        )}
                                    </Region>
                                </ScrollArea>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="loading_contents"
                        params={16}
                        visible={visibleLoadingContents2 ?? false}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#a4a49f"
                            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                        />
                        <ThemeImage
                            name="loading_icon"
                            params={16}
                            src={srcLoadingIcon2 ?? layoutImage('loading.png')}
                            layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="shopContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073889424}
                    visible={visibleShopContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: -5, right: 15, top: 125, height: 428, overflow: 'hidden' }}
                >
                    <Region
                        name="loaded_content"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 428 }}
                    >
                        <Region
                            name="navigationContainer"
                            params={2064}
                            layout={{ position: 'absolute', left: 8, width: 184, top: 3, bottom: 0 }}
                        >
                            <Border
                                variant="6"
                                params={2064}
                                blend={0.5}
                                layout={{ position: 'absolute', left: 0, width: 184, top: 0, bottom: 0 }}
                            />
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 3, width: 178, top: 5, bottom: 5 }}
                            >
                                <Region
                                    name="navigationList"
                                    params={2064}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    {itemsNavigationList2 ?? (
                                        <CollectibleHubLayoutItemTemplateItem4 />
                                    )}
                                </Region>
                            </ScrollArea>
                        </Region>
                        <Region
                            name="collection_content"
                            params={16}
                            layout={{ position: 'absolute', left: 200, width: 290, top: 3, height: 425 }}
                        >
                            <Region
                                name="preview_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                            >
                                <Border
                                    variant="3"
                                    name="collection_preview_bg"
                                    params={16}
                                    tintColor="#3d1f39"
                                    layout={{ position: 'absolute', left: 0, width: 296, top: 0, height: 260 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background.png')}
                                        layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_right.png')}
                                        layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('collectables_score_background_gradient2.png')}
                                        tint="#45ace2"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
                                    />
                                    <ThemeImage
                                        name="bg_star"
                                        params={16}
                                        src={srcBgStar3 ?? layoutImage('bg_star_300x300.png')}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                    >
                                        <ThemeImage
                                            name="placeholder_image"
                                            params={16}
                                            src={srcPlaceholderImage3 ?? layoutImage('collectables_collection_default.png')}
                                            layout={{ position: 'absolute', left: 91, width: 108, top: 64, height: 132 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="avatar_image"
                                        name="avatar_image_widget"
                                        params={16}
                                        visible={false}
                                        layout={{ position: 'absolute', left: 100, width: 90, top: 53, height: 130 }}
                                    />
                                    <WidgetSlot
                                        widgetType="badge_image"
                                        name="badge_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -43, width: 80, top: '50%', marginTop: -40, height: 80, overflow: 'hidden' }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -27, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                    >
                                        <ThemeImage
                                            name="unknown_image"
                                            params={3932176}
                                            src={srcUnknownImage3 ?? layoutImage('collectables_icon_curator_stamp_large.png')}
                                            layout={{ position: 'absolute', left: '50%', marginLeft: -27, width: 48, top: '50%', marginTop: -24, height: 48 }}
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="pet_image"
                                        name="pet_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'pet_image:zoomX': '2', 'pet_image:zoomY': '2', 'pet_image:shrink_on_overflow': 'true' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -95, width: 180, top: '50%', marginTop: -70, height: 140, overflow: 'hidden' }}
                                    />
                                    <WidgetSlot
                                        widgetType="room_previewer"
                                        name="effect_image_widget"
                                        params={1077674000}
                                        visible={false}
                                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                                        layout={{ position: 'absolute', left: '50%', marginLeft: -55, width: 100, top: '50%', marginTop: -130, height: 260, overflow: 'hidden' }}
                                    />
                                    <ThemeImage
                                        name="product_preview"
                                        params={16}
                                        src={srcProductPreview3}
                                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                                    />
                                    <Region
                                        name="product_name_container"
                                        params={17}
                                        backgroundColor="#000000"
                                        onPointerTap={onProductNameContainer3}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                                    >
                                        <Region
                                            name="preview_furni_name"
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 290, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={captionPreviewFurniName3 ?? 'Lorem ipsum hot air balloon'}
                                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="product_info_container"
                                        params={16}
                                        visible={visibleProductInfoContainer2 ?? false}
                                        backgroundColor="#3b1829"
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194 }}
                                    >
                                        <Region
                                            name="product_info_list"
                                            params={16}
                                            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2 }}
                                        >
                                            {itemsProductInfoList2 ?? (
                                                <CollectibleHubLayoutProductInfoEntryTemplateItem2 />
                                            )}
                                        </Region>
                                    </Region>
                                    <Region
                                        params={409616}
                                        layout={{ position: 'absolute', right: 10, top: 226, flexDirection: 'row', gap: 4 }}
                                    >
                                        <Region
                                            name="price_text"
                                            params={16}
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
                                            params={16}
                                            layout={{ width: 26, height: 20, flexShrink: 0 }}
                                        />
                                        <Button
                                            variant="5"
                                            name="buy_button"
                                            params={131089}
                                            tintColor="#01a101"
                                            onPointerTap={onBuyButton}
                                            layout={{ width: 88, height: 30, flexShrink: 0 }}
                                        >
                                            {t('generic.buy')}
                                        </Button>
                                    </Region>
                                    <Region
                                        name="mintlimit_container"
                                        params={409616}
                                        layout={{ position: 'absolute', right: 10, top: 196, flexDirection: 'row', gap: 4 }}
                                    >
                                        {itemsMintlimitContainer ?? (
                                            <CollectibleHubLayoutMintlimitTextItem />
                                        )}
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('collectables_icon_curator_stamp_small.png')}
                                            layout={{ width: 18, height: 30, flexShrink: 0 }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                            <Region
                                name="item_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 290, top: 270, height: 153 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 153 }}
                                >
                                    <Region
                                        name="itemgrid_shop"
                                        tags={[ 'FURNI_ITEM_GRID' ]}
                                        params={16}
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                                    >
                                        {itemsItemgridShop ?? (
                                            <CollectibleHubLayoutItemTemplateItem5 />
                                        )}
                                    </Region>
                                </ScrollArea>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="loading_contents"
                        params={16}
                        visible={visibleLoadingContents3 ?? false}
                        layout={{ position: 'absolute', left: 5, width: 485, top: 0, height: 429 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#a4a49f"
                            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                        />
                        <ThemeImage
                            name="loading_icon"
                            params={16}
                            src={srcLoadingIcon3 ?? layoutImage('loading.png')}
                            layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="transferContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073758352}
                    visible={visibleTransferContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="loaded_content"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Region
                            name="headercontainer"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 50 }}
                        >
                            <Region
                                params={3935248}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -223.5, width: 450, top: '50%', marginTop: -15, height: 30, minWidth: 450, maxWidth: 450, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('collectibles.transfer.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <Border
                            variant="3"
                            name="transfer_container"
                            params={16}
                            tintColor="#bac3cd"
                            layout={{ position: 'absolute', left: 0, width: 488, top: 380, height: 50 }}
                        >
                            <Dropmenu
                                variant="3"
                                name="transfer_wallet_selection"
                                params={17}
                                onPointerTap={onTransferWalletSelection}
                                layout={{ position: 'absolute', left: 10, width: 260, top: 13, height: 24 }}
                            />
                            <Border
                                variant="3"
                                params={16}
                                tintColor="#d6dbe1"
                                blend={0}
                                layout={{ position: 'absolute', left: 315, width: 170, top: 5, height: 40 }}
                            >
                                <Region
                                    params={409616}
                                    layout={{ position: 'absolute', right: 13, top: 5, flexDirection: 'row' }}
                                >
                                    <Region
                                        name="transfer_fee_text"
                                        params={16}
                                        layout={{ width: 12, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={captionTransferFeeText ?? '0'}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <Region
                                        name="spacing"
                                        params={16}
                                        layout={{ width: 4, height: 30, flexShrink: 0 }}
                                    />
                                    <ThemeImage
                                        name="transfer_fee_icon"
                                        params={16}
                                        src={srcTransferFeeIcon ?? layoutImage('pursearea_mid_silver_icon.png')}
                                        layout={{ width: 24, height: 30, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="spacing"
                                        params={16}
                                        layout={{ width: 6, height: 30, flexShrink: 0 }}
                                    />
                                    <Button
                                        variant="5"
                                        name="transfer_button"
                                        params={131089}
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
                            params={16}
                            src={layoutImage('collectables_transfer_safe.png')}
                            layout={{ position: 'absolute', left: 42, width: 400, top: 120, height: 180 }}
                        />
                    </Region>
                    <Region
                        name="loading_contents"
                        params={16}
                        visible={visibleLoadingContents4 ?? false}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#a4a49f"
                            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                        />
                        <ThemeImage
                            name="loading_icon"
                            params={16}
                            src={srcLoadingIcon4 ?? layoutImage('loading.png')}
                            layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="levelsContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073758352}
                    visible={visibleLevelsContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        params={1073741840}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            tags={[ 'category_header' ]}
                            params={1073741840}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 80, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_name_region"
                                params={131089}
                                onPointerTap={onCategoryNameRegion3}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                            >
                                <Region
                                    name="collector_level_header"
                                    params={16}
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
                                params={147473}
                                onPointerTap={onCategoryMintingDescriptionRegion3}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 380, top: 22, height: 30 }}
                            >
                                <Region
                                    name="collector_level_description"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                </Region>
                <Region
                    name="infoContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073889424}
                    visible={visibleInfoContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 110, top: 125, height: 419, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        params={1073741840}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 390, top: 0, height: 400, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            tags={[ 'category_header' ]}
                            params={1073741840}
                            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 135, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_info_header_region"
                                params={131089}
                                onPointerTap={onCategoryInfoHeaderRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                            >
                                <Region
                                    name="collector_collections_header"
                                    params={16}
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
                                params={147473}
                                onPointerTap={onCategoryInfoDescriptionRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 480, top: 22, height: 50 }}
                            >
                                <Region
                                    name="collector_profile_description"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionCollectorProfileDescription2 ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                                    />
                                </Region>
                                <Region
                                    name="info_desc"
                                    params={1}
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
                                params={147473}
                                onPointerTap={onCategoryInfoTransferRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 480, top: 75, height: 60 }}
                            >
                                <Region
                                    name="collector_profile_description"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 30, minWidth: 2, maxWidth: 380, minHeight: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionCollectorProfileDescription3 ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porta felis sed libero rhoncus, at elementum metus sagittis. '}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                                    />
                                </Region>
                                <Region
                                    name="transfer_desc"
                                    params={1}
                                    layout={{ position: 'absolute', left: 0, width: 480, top: 0, height: 60, maxWidth: 480, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionTransferDesc ?? t('collectibles.info.trading')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 480 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('collectables_collection_default.png')}
                        layout={{ position: 'absolute', left: 128, width: 216, top: 155, height: 264 }}
                    />
                </Region>
                <Region
                    name="rewardsContainer"
                    tags={[ 'TEMPLATE', 'category_container' ]}
                    params={1073758352}
                    visible={visibleRewardsContainer ?? false}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="loaded_content"
                        params={16}
                        visible={visibleLoadedContent ?? false}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Region
                            name="item_container"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 374 }}
                            >
                                <Region
                                    name="itemlist"
                                    params={16}
                                    layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                                >
                                    {itemsItemlist ?? (
                                        <CollectibleHubLayoutItemTemplateItem6 />
                                    )}
                                </Region>
                            </ScrollArea>
                        </Region>
                        <Border
                            variant="3"
                            name="bottom_container"
                            params={16}
                            tintColor="#bac3cd"
                            layout={{ position: 'absolute', left: 0, width: 486, top: 380, height: 50 }}
                        >
                            <Button
                                variant="5"
                                name="claim_button"
                                params={131089}
                                tintColor="#2095d4"
                                onPointerTap={onClaimButton2}
                                layout={{ position: 'absolute', left: 180, width: 137, top: 10, height: 30, minWidth: 100 }}
                            >
                                {t('collectibles.claim_all')}
                            </Button>
                        </Border>
                    </Region>
                    <Region
                        name="no_content_container"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Region
                            name="headercontainer"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 100 }}
                        >
                            <Region
                                params={788496}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -223.5, width: 450, top: 28, bottom: 55, minWidth: 450, maxWidth: 450, minHeight: 17, maxHeight: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('collectibles.no_claims')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 450, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="image_container"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 485, top: 100, height: 332 }}
                        >
                            <ThemeImage
                                params={3932176}
                                src={layoutImage('image_frank_dont_know.png')}
                                layout={{ position: 'absolute', left: '50%', marginLeft: -242.5, width: 485, top: '50%', marginTop: -116, height: 176 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="loading_contents"
                        params={16}
                        visible={visibleLoadingContents5 ?? false}
                        layout={{ position: 'absolute', left: 0, width: 485, top: 0, height: 429 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#a4a49f"
                            layout={{ position: 'absolute', left: 185, width: 113, top: 155, height: 116 }}
                        />
                        <ThemeImage
                            name="loading_icon"
                            params={16}
                            src={srcLoadingIcon5 ?? layoutImage('loading.png')}
                            layout={{ position: 'absolute', left: 205, width: 75, top: 175, height: 75 }}
                        />
                    </Region>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: -8, width: 410, top: 56, height: 1 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('talent_task_progress_bg.png')}
                        layout={{ position: 'absolute', left: -8, width: 410, top: 56, height: 1 }}
                    />
                </Region>
            </Region>
        </Frame>
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
}

export const CollectibleHubLayoutItemTemplateItem = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage }: CollectibleHubLayoutItemTemplateItemProps) => {
    return (
        <Region
            name="item_template"
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                params={16}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    params={16}
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        params={16}
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
                    params={16}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
                />
            </Region>
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                params={1077674000}
                visible={false}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -26.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 18, top: '50%', marginTop: -15.5, height: 18 }}
            >
                <ThemeImage
                    name="unknown_image"
                    params={3932176}
                    src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 18, top: '50%', marginTop: -15.5, height: 18 }}
                />
            </Region>
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                params={1077674000}
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -26.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <Region
                name="number_container"
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50 }}
            >
                <Border
                    variant="3"
                    name="text_border"
                    params={16}
                    tintColor="#337c00"
                    layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
                />
                <Region
                    name="number"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNumber ?? 'x10'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
            >
                <ThemeImage
                    name="checkmark_icon"
                    params={16}
                    src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                    layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
                />
            </Region>
        </Region>
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
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <Region
                    name="item_hilight_outer"
                    params={16}
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
            </Region>
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
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
                params={131088}
                layout={{ position: 'absolute', left: 120, width: 36, top: 3, height: 15, minWidth: 36, maxWidth: 36 }}
            >
                <Border
                    variant="3"
                    name="progress_color"
                    params={16}
                    tintColor="#00910a"
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 14 }}
                />
                <Region
                    name="progress_text"
                    params={16}
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
                params={16}
                backgroundColor="#00910a"
                layout={{ position: 'absolute', left: 0, width: 4, top: 1, height: 19, minWidth: 4, maxWidth: 4, minHeight: 19, maxHeight: 19 }}
            />
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
            params={16}
            backgroundColor="#110b14"
            layout={{ width: 242, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="product_info_key"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 136, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionProductInfoKey ?? 'Type'}
                    textOptions={{ fill: '#eb8f01', align: 'right' }}
                />
            </Region>
            <Region
                name="product_info_value"
                params={16}
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

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem3Props {
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcCheckmarkIcon?: string;
    srcUnknownImage?: string;
}

export const CollectibleHubLayoutItemTemplateItem3 = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcCheckmarkIcon, srcUnknownImage }: CollectibleHubLayoutItemTemplateItem3Props) => {
    return (
        <Region
            name="item_template"
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 61, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                params={16}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    params={16}
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        params={16}
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                params={1077674000}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -26.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <ThemeImage
                name="unknown_image"
                params={3932176}
                src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 18, top: '50%', marginTop: -15.5, height: 18 }}
            />
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                params={1077674000}
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -26.5, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <Region
                name="number_container"
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16, minWidth: 50, maxWidth: 50 }}
            >
                <Border
                    variant="3"
                    name="text_border"
                    params={16}
                    tintColor="#337c00"
                    layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
                />
                <Region
                    name="number"
                    params={16}
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
                params={16}
                src={srcCheckmarkIcon ?? layoutImage('icon_checkmark_small.png')}
                layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
            />
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
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                tags={[ 'SELECTION_HILIGHT' ]}
                params={16}
                backgroundColor="#b4b4ae"
                layout={{ position: 'absolute', left: 1, width: 178, top: 0, height: 21 }}
            >
                <Region
                    name="item_hilight_outer"
                    params={16}
                    visible={visibleItemHilightOuter ?? false}
                    backgroundColor="#82d1ed"
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 20 }}
                >
                    <Region
                        name="item_hilight_inner"
                        params={16}
                        backgroundColor="#63c5e9"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 2, height: 16 }}
                    />
                </Region>
            </Region>
            <Region
                name="item_title"
                tags={[ 'ITEM_TITLE', 'SELECTION_COLOR' ]}
                params={176}
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
            params={16}
            backgroundColor="#110b14"
            layout={{ width: 242, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="product_info_key"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 136, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionProductInfoKey ?? 'Type'}
                    textOptions={{ fill: '#eb8f01', align: 'right' }}
                />
            </Region>
            <Region
                name="product_info_value"
                params={16}
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
            params={16}
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

/** Row template `item_template` of CollectibleHubLayout - pass real rows through its `items…` slot. */
export interface CollectibleHubLayoutItemTemplateItem5Props {
    captionNumber?: string;
    layout?: BoxLayout;
    onItemTemplate?: () => void;
    srcBitmap?: string;
    srcEmeraldIcon?: string;
    srcUnknownImage?: string;
    visibleTextBorder?: boolean;
}

export const CollectibleHubLayoutItemTemplateItem5 = ({ captionNumber, layout, onItemTemplate, srcBitmap, srcEmeraldIcon, srcUnknownImage, visibleTextBorder }: CollectibleHubLayoutItemTemplateItem5Props) => {
    return (
        <Region
            name="item_template"
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 52, height: 62, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                params={16}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    params={16}
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        params={16}
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 2, width: 46, top: 4, height: 40, minWidth: 46, maxWidth: 46 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                params={1077674000}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -27, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <ThemeImage
                name="unknown_image"
                params={3932176}
                src={srcUnknownImage ?? layoutImage('collectables_icon_curator_stamp_small.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 18, top: '50%', marginTop: -16, height: 18 }}
            />
            <WidgetSlot
                widgetType="pet_image"
                name="pet_image_widget"
                params={1077674000}
                visible={false}
                options={{ 'pet_image:shrink_on_overflow': 'true' }}
                layout={{ position: 'absolute', left: '50%', marginLeft: -21, width: 40, top: '50%', marginTop: -27, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40, overflow: 'hidden' }}
            />
            <Region
                name="number_container"
                params={131088}
                layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 20, minWidth: 50, maxWidth: 50 }}
            >
                <Region
                    visible={visibleTextBorder ?? false}
                    layout={{ position: 'absolute', left: 3, width: 44, top: 5, height: 12 }}
                >
                    <Border
                        variant="3"
                        name="text_border"
                        params={16}
                        tintColor="#337c00"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="number"
                    params={16}
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
                    params={16}
                    src={srcEmeraldIcon ?? layoutImage('pursearea_tiny_emerald_icon.png')}
                    layout={{ position: 'absolute', left: 34, width: 12, top: 3, height: 12 }}
                />
            </Region>
        </Region>
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
}

export const CollectibleHubLayoutItemTemplateItem6 = ({ captionAmountText, captionCollectionText, captionExpiresText, captionItemName, captionWalletText, layout, onItemTemplate, srcBitmap, srcUnknownImage }: CollectibleHubLayoutItemTemplateItem6Props) => {
    return (
        <Region
            name="item_template"
            params={131089}
            onPointerTap={onItemTemplate}
            cursor="pointer"
            layout={{ width: 466, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                tags={[ 'ITEM_HILIGHT' ]}
                params={16}
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    params={16}
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 466, top: 0, height: 50 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        params={16}
                        tintColor="#c8cdd3"
                        layout={{ position: 'absolute', left: 1, width: 464, top: 1, height: 48 }}
                    />
                </Border>
            </Border>
            <Border
                variant="3"
                name="item_border"
                params={16}
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <Border
                    variant="3"
                    params={16}
                    tintColor="#c8cdd3"
                    layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                />
            </Border>
            <Border
                variant="3"
                name="name_border"
                params={16}
                tintColor="#8f9db1"
                layout={{ position: 'absolute', left: 54, width: 408, top: 4, height: 16 }}
            >
                <Region
                    name="item_name"
                    tags={[ 'NAME_TITLE' ]}
                    params={16}
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
                params={16}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image_widget"
                params={16}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <ThemeImage
                name="unknown_image"
                params={16}
                src={srcUnknownImage ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="pet_image_widget"
                params={16}
                visible={false}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 10, width: 32, top: 9, height: 32 }}
            />
            <Region
                name="wallet_text"
                params={16}
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
                params={1}
                layout={{ position: 'absolute', left: 52, width: 340, top: 20, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCollectionText ?? '<b>Collection:</b> test'} />
            </Region>
            <Region
                name="expires_text"
                params={1}
                layout={{ position: 'absolute', left: 52, width: 340, top: 33, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionExpiresText ?? '<b>Expires:</b> test'} />
            </Region>
            <Region
                name="amount_container"
                params={16}
                layout={{ position: 'absolute', left: 27, width: 20, top: 34, height: 16 }}
            >
                <Border
                    variant="3"
                    params={16}
                    tintColor="#8f9db1"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 14 }}
                />
                <Region
                    name="amount_text"
                    tags={[ 'AMOUNT_TITLE' ]}
                    params={16}
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
