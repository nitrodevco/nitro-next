import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutBonusOrRewardContainer, CollectibleHubLayoutBonusOrRewardContainerProps } from './CollectibleHubLayoutBonusOrRewardContainer';
import { CollectibleHubLayoutProductInfoEntryTemplateItem } from './CollectibleHubLayoutProductInfoEntryTemplateItem';

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainer2Props {
    avatarImageWidget?: ReactNode;
    badgeImageWidget?: ReactNode;
    bonusOrRewardContainer?: CollectibleHubLayoutBonusOrRewardContainerProps;
    captionPreviewFurniName?: string;
    captionPreviewRewardText?: string;
    captionPreviewScoreText?: string;
    captionProcuctScoreText?: string;
    effectImageWidget?: ReactNode;
    itemsProductInfoList?: ReactNode;
    layout?: BoxLayout;
    onProductNameContainer?: () => void;
    petImageWidget?: ReactNode;
    srcBgStar?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    tintProductPreview?: string;
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

export const CollectibleHubLayoutPreviewContainer2 = ({ avatarImageWidget, badgeImageWidget, bonusOrRewardContainer, captionPreviewFurniName, captionPreviewRewardText, captionPreviewScoreText, captionProcuctScoreText, effectImageWidget, itemsProductInfoList, layout, onProductNameContainer, petImageWidget, srcBgStar, srcPlaceholderImage, srcProductPreview, srcUnknownImage, tintProductPreview, visibleAvatarImageWidget, visibleBadgeImageWidget, visibleCollectionProgressContainer, visibleEffectImageWidget, visiblePetImageWidget, visiblePlaceholderImage, visibleProductInfoContainer, visibleProductNameContainer, visibleUnknownImage }: CollectibleHubLayoutPreviewContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 34, height: 260, ...layout }}
        >
            <Border
                variant="3"
                name="collection_preview_bg"
                tintColor="#3d1f39"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
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
                    >
                        {avatarImageWidget}
                    </WidgetSlot>
                )}
                {(visibleBadgeImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="badge_image"
                        name="badge_image_widget"
                        options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                        layout={{ position: 'absolute', width: 80, alignSelf: 'center', height: 80, overflow: 'hidden' }}
                    >
                        {badgeImageWidget}
                    </WidgetSlot>
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
                    >
                        {petImageWidget}
                    </WidgetSlot>
                )}
                {(visibleEffectImageWidget ?? false) && (
                    <WidgetSlot
                        widgetType="room_previewer"
                        name="effect_image_widget"
                        options={{ 'room_previewer:offsetx': '2', 'room_previewer:offsety': '36' }}
                        layout={{ position: 'absolute', marginLeft: -2, marginRight: 2, width: 100, alignSelf: 'center', height: 260, overflow: 'hidden' }}
                    >
                        {effectImageWidget}
                    </WidgetSlot>
                )}
                <ThemeImage
                    name="product_preview"
                    src={srcProductPreview}
                    tint={tintProductPreview}
                    layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                />
                {(visibleProductNameContainer ?? false) && (
                    <Region
                        name="product_name_container"
                        backgroundColor="#000000"
                        onPointerTap={onProductNameContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
                    >
                        <ThemeText
                            text={captionPreviewFurniName ?? 'Lorem ipsum hot air balloon'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                            name="preview_furni_name"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 5, height: 17 }}
                        />
                    </Region>
                )}
                {(visibleProductInfoContainer ?? false) && (
                    <Region
                        name="product_info_container"
                        backgroundColor="#3b1829"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 26, height: 194 }}
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
                        layout={{ position: 'absolute', left: 0, right: 0, top: 200, height: 60, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPreviewScoreText ?? t('collectibles.preview.score')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 290, align: 'center' }}
                            name="preview_score_text"
                            verticalAlign="top"
                            layout={{ position: 'absolute', width: 290, top: 3, height: 17, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17 }}
                        />
                        <Border
                            variant="3"
                            tintColor="#5a1003"
                            layout={{ position: 'absolute', left: 4, width: 282, top: 24, height: 32, justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionPreviewRewardText ?? t('collectibles.preview.reward')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                                name="preview_reward_text"
                                verticalAlign="top"
                                layout={{ position: 'absolute', width: 274, alignSelf: 'center', height: 28, minWidth: 274, maxWidth: 274 }}
                            />
                        </Border>
                    </Region>
                )}
                <Region
                    name="product_progress_container"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 220, height: 40 }}
                >
                    <Border
                        variant="3"
                        tintColor="#5a1003"
                        layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 32, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionProcuctScoreText ?? t('collectibles.preview.product.incomplete')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                            name="procuct_score_text"
                            verticalAlign="top"
                            layout={{ position: 'absolute', width: 274, alignSelf: 'center', height: 16, minWidth: 274, maxWidth: 274 }}
                        />
                    </Border>
                </Region>
            </Border>
        </Region>
    );
};
