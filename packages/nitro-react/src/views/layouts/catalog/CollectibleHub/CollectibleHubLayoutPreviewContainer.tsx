import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CollectibleHubLayoutMintInfoContainer, CollectibleHubLayoutMintInfoContainerProps } from './CollectibleHubLayoutMintInfoContainer';

/** Named region `preview_container` of CollectibleHubLayout - configured through the parent's `previewContainer` prop. */
export interface CollectibleHubLayoutPreviewContainerProps {
    avatarImageWidget?: ReactNode;
    badgeImageWidget?: ReactNode;
    captionPreviewFurniName?: string;
    captionStampPricing?: string;
    effectImageWidget?: ReactNode;
    layout?: BoxLayout;
    mintInfoContainer?: CollectibleHubLayoutMintInfoContainerProps;
    onCollectButton?: () => void;
    onProductNameContainer?: () => void;
    petImageWidget?: ReactNode;
    spacing?: ReactNode;
    spacing2?: ReactNode;
    srcBgStar?: string;
    srcMintLockClosedIcon?: string;
    srcMintLockOpenIcon?: string;
    srcPlaceholderImage?: string;
    srcProductPreview?: string;
    srcUnknownImage?: string;
    tintProductPreview?: string;
    visibleAvatarImageWidget?: boolean;
    visibleBadgeImageWidget?: boolean;
    visibleEffectImageWidget?: boolean;
    visibleMintLockClosedIcon?: boolean;
    visiblePetImageWidget?: boolean;
    visiblePlaceholderImage?: boolean;
    visibleProductPreview?: boolean;
    visibleUnknownImage?: boolean;
}

export const CollectibleHubLayoutPreviewContainer = ({ avatarImageWidget, badgeImageWidget, captionPreviewFurniName, captionStampPricing, effectImageWidget, layout, mintInfoContainer, onCollectButton, onProductNameContainer, petImageWidget, spacing, spacing2, srcBgStar, srcMintLockClosedIcon, srcMintLockOpenIcon, srcPlaceholderImage, srcProductPreview, srcUnknownImage, tintProductPreview, visibleAvatarImageWidget, visibleBadgeImageWidget, visibleEffectImageWidget, visibleMintLockClosedIcon, visiblePetImageWidget, visiblePlaceholderImage, visibleProductPreview, visibleUnknownImage }: CollectibleHubLayoutPreviewContainerProps) => {
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
                {(visibleProductPreview ?? false) && (
                    <ThemeImage
                        name="product_preview"
                        src={srcProductPreview}
                        tint={tintProductPreview}
                        layout={{ position: 'absolute', left: -5, width: 300, top: -20, height: 300 }}
                    />
                )}
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
                <Region
                    name="collect_container"
                    layout={{ position: 'absolute', left: 82, width: 200, top: 180, height: 30 }}
                >
                    <Region layout={{ position: 'absolute', right: 0, top: 0, bottom: 0, flexDirection: 'row' }}>
                        <ThemeText
                            text={captionStampPricing ?? '1'}
                            textOptions={{ fill: '#ffffff' }}
                            name="stamp_pricing"
                            layout={{ width: 10, height: 17, flexShrink: 0 }}
                        />
                        <Region
                            name="spacing"
                            layout={{ width: 3, height: 30, flexShrink: 0 }}
                        >
                            {spacing}
                        </Region>
                        <ThemeImage
                            src={layoutImage('collectables_icon_curator_stamp_small.png')}
                            layout={{ width: 18, height: 30, flexShrink: 0 }}
                        />
                        <Region
                            name="spacing"
                            layout={{ width: 7, height: 30, flexShrink: 0 }}
                        >
                            {spacing2}
                        </Region>
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
                    <ThemeText
                        text={t('shop.minting.no_furni')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 274, align: 'center' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', width: 274, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 16, minWidth: 274, maxWidth: 274 }}
                    />
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
