import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TabButton, TabContext, ThemeText } from '#base/theme';

import { CollectibleHubLayoutCollectionsContainer, CollectibleHubLayoutCollectionsContainerProps } from './CollectibleHubLayoutCollectionsContainer';
import { CollectibleHubLayoutCollectorHubHeader, CollectibleHubLayoutCollectorHubHeaderProps } from './CollectibleHubLayoutCollectorHubHeader';
import { CollectibleHubLayoutInfoContainer, CollectibleHubLayoutInfoContainerProps } from './CollectibleHubLayoutInfoContainer';
import { CollectibleHubLayoutMintingContainer, CollectibleHubLayoutMintingContainerProps } from './CollectibleHubLayoutMintingContainer';
import { CollectibleHubLayoutRewardsContainer, CollectibleHubLayoutRewardsContainerProps } from './CollectibleHubLayoutRewardsContainer';
import { CollectibleHubLayoutShopContainer, CollectibleHubLayoutShopContainerProps } from './CollectibleHubLayoutShopContainer';
import { CollectibleHubLayoutTransferContainer, CollectibleHubLayoutTransferContainerProps } from './CollectibleHubLayoutTransferContainer';

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
    selectedTopViewSelectTabContext?: string;
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

export const CollectibleHubLayout = ({ captionCollectorLevelDescription, captionCollectorLevelHeader, captionCollectorProfileDescription, captionCollectorProfileHeader, collectionsContainer, collectorHubHeader, infoContainer, layout, mintingContainer, onCategoryMintingDescriptionRegion, onCategoryMintingDescriptionRegion2, onCategoryNameRegion, onCategoryNameRegion2, onClose, onTopViewCollectionsButton, onTopViewInfoButton, onTopViewLevelsButton, onTopViewMintingButton, onTopViewProfileButton, onTopViewRewardsButton, onTopViewShopButton, onTopViewTransferButton, rewardsContainer, selectedTopViewSelectTabContext, shopContainer, transferContainer, visibleCategoryNameRegion, visibleCollectorProfileContainer, visibleCollectorProfileHeader, visibleInfoContainer, visibleLevelsContainer, visibleMintingContainer, visibleRewardsContainer, visibleShopContainer, visibleTopViewLevelsButton, visibleTopViewProfileButton, visibleTransferContainer }: CollectibleHubLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="CollectorHub"
            name="CollectorHub"
            caption={t('collectibles.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 500, height: 600, minWidth: 500, maxWidth: 500, minHeight: 600, ...layout }}
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
                    selected={selectedTopViewSelectTabContext === 'top_view_rewards_button'}
                    onPointerTap={onTopViewRewardsButton}
                    layout={{ position: 'absolute', left: 0, width: 72, top: 0, height: 32 }}
                >
                    Rewards
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_collections_button"
                    selected={selectedTopViewSelectTabContext === 'top_view_collections_button'}
                    onPointerTap={onTopViewCollectionsButton}
                    layout={{ position: 'absolute', left: 72, width: 87, top: 0, height: 32 }}
                >
                    Collectibles
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_shop_button"
                    selected={selectedTopViewSelectTabContext === 'top_view_shop_button'}
                    onPointerTap={onTopViewShopButton}
                    layout={{ position: 'absolute', left: 159, width: 52, top: 0, height: 32 }}
                >
                    Shop
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_minting_button"
                    selected={selectedTopViewSelectTabContext === 'top_view_minting_button'}
                    onPointerTap={onTopViewMintingButton}
                    layout={{ position: 'absolute', left: 211, width: 66, top: 0, height: 32 }}
                >
                    Minting
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_transfer_button"
                    selected={selectedTopViewSelectTabContext === 'top_view_transfer_button'}
                    onPointerTap={onTopViewTransferButton}
                    layout={{ position: 'absolute', left: 277, width: 70, top: 0, height: 32 }}
                >
                    Transfer
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_info_button"
                    selected={selectedTopViewSelectTabContext === 'top_view_info_button'}
                    onPointerTap={onTopViewInfoButton}
                    layout={{ position: 'absolute', left: 347, width: 46, top: 0, height: 32 }}
                >
                    Info
                </TabButton>
                {(visibleTopViewProfileButton ?? false) && (
                    <TabButton
                        variant="3"
                        name="top_view_profile_button"
                        selected={selectedTopViewSelectTabContext === 'top_view_profile_button'}
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
                        selected={selectedTopViewSelectTabContext === 'top_view_levels_button'}
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
                    layout={{ position: 'absolute', left: 0, right: 98, top: 125, height: 400, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}
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
                                        <ThemeText
                                            text={captionCollectorProfileHeader ?? 'Collector Profile Header'}
                                            textStyle="text-style-u-regular"
                                            name="collector_profile_header"
                                            layout={{ position: 'absolute', left: 0, width: 141, top: 0, bottom: 0, minWidth: 2, maxWidth: 270 }}
                                        />
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
                    layout={{ position: 'absolute', left: 0, right: 3, top: 125, height: 429, overflow: 'hidden' }}
                >
                    <Region
                        name="category_content_background"
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}
                    >
                        <Region
                            name="category_collector_header_region"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80, overflow: 'hidden' }}
                        >
                            <Region
                                name="category_name_region"
                                onPointerTap={onCategoryNameRegion2}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 142, top: 4, height: 17 }}
                            >
                                <ThemeText
                                    text={captionCollectorLevelHeader ?? 'Levels Header'}
                                    textStyle="text-style-u-regular"
                                    name="collector_level_header"
                                    layout={{ position: 'absolute', left: 0, width: 83, top: 0, bottom: 0, minWidth: 2, maxWidth: 270 }}
                                />
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
