import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `937_furni_view_xml` (layout "furni_view", 429x97) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniViewLayoutProps {
    buttonList?: FurniViewLayoutButtonListProps;
    infostandElementList?: FurniViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onSetValues?: () => void;
    variableList?: FurniViewLayoutVariableListProps;
}

export const FurniViewLayout = ({ buttonList, infostandElementList, layout, onClose, onSetValues, variableList }: FurniViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 97, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 97, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    layout={{ width: 190, height: 372, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <FurniViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Border
                    variant="2"
                    name="custom_variables"
                    tintColor="#999999"
                    layout={{ width: 190, height: 62, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#333333"
                        layout={{ position: 'absolute', left: 3, width: 184, top: 3, height: 56, justifyContent: 'center' }}
                    >
                        <Button
                            variant="3"
                            name="set_values"
                            onPointerTap={onSetValues}
                            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 75, top: 4, height: 24 }}
                        >
                            Set values
                        </Button>
                        <FurniViewLayoutVariableList {...variableList} />
                    </Border>
                </Border>
                <FurniViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};

/** Row template `name_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutNameTextItem = ({ captionNameText, layout }: FurniViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
            />
        </Region>
    );
};

/** Row template `name_extra_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNameExtraTextItemProps {
    captionNameExtraText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutNameExtraTextItem = ({ captionNameExtraText, layout }: FurniViewLayoutNameExtraTextItemProps) => {
    return (
        <Region
            name="name_extra_text"
            visible={false}
            layout={{ width: 159, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameExtraText ?? 'Chest name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
}

export const FurniViewLayoutImagesSpacerItem = ({ layout }: FurniViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `locked_icon` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutLockedIconItemProps {
    layout?: BoxLayout;
    srcLockedIcon?: string;
}

export const FurniViewLayoutLockedIconItem = ({ layout, srcLockedIcon }: FurniViewLayoutLockedIconItemProps) => {
    return (
        <ThemeImage
            name="locked_icon"
            src={srcLockedIcon ?? layoutImage('forum_forum_locked.png')}
            layout={{ width: 13, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `wired_icon` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredIconItemProps {
    layout?: BoxLayout;
    srcWiredIcon?: string;
}

export const FurniViewLayoutWiredIconItem = ({ layout, srcWiredIcon }: FurniViewLayoutWiredIconItemProps) => {
    return (
        <ThemeImage
            name="wired_icon"
            src={srcWiredIcon ?? '${image.library.url}catalogue/icon_80.png'}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `wired_chest_elements` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredChestElementsItemProps {
    itemsWiredChestElements?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutWiredChestElementsItem = ({ itemsWiredChestElements, layout }: FurniViewLayoutWiredChestElementsItemProps) => {
    return (
        <Region
            name="wired_chest_elements"
            layout={{ width: 31, height: 15, flexShrink: 0, flexDirection: 'row', gap: 3, ...layout }}
        >
            {itemsWiredChestElements ?? (
                <>
                    <FurniViewLayoutLockedIconItem />
                    <FurniViewLayoutWiredIconItem />
                </>
            )}
        </Region>
    );
};

/** Named region `unique_item_background_container` of FurniViewLayout - configured through the parent's `uniqueItemBackgroundContainer` prop. */
export interface FurniViewLayoutUniqueItemBackgroundContainerProps {
    layout?: BoxLayout;
    srcUniqueItemBackgroundBottom?: string;
    srcUniqueItemBackgroundBottom2?: string;
    srcUniqueItemBackgroundBottom3?: string;
    srcUniqueItemBackgroundBottom4?: string;
    srcUniqueItemBackgroundBottom5?: string;
    srcUniqueItemBackgroundMid?: string;
    srcUniqueItemBackgroundTop?: string;
    visibleUniqueItemBackgroundContainer?: boolean;
}

export const FurniViewLayoutUniqueItemBackgroundContainer = ({ layout, srcUniqueItemBackgroundBottom, srcUniqueItemBackgroundBottom2, srcUniqueItemBackgroundBottom3, srcUniqueItemBackgroundBottom4, srcUniqueItemBackgroundBottom5, srcUniqueItemBackgroundMid, srcUniqueItemBackgroundTop, visibleUniqueItemBackgroundContainer }: FurniViewLayoutUniqueItemBackgroundContainerProps) => {
    return (
        <Region
            name="unique_item_background_container"
            visible={visibleUniqueItemBackgroundContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, bottom: 0, minHeight: 45, ...layout }}
        >
            <ThemeImage
                name="unique_item_background_bottom"
                src={srcUniqueItemBackgroundBottom ?? layoutImage('unique_item_large_iron.png')}
                layout={{ position: 'absolute', left: 8, width: 5, top: -1, height: 9 }}
            />
            <ThemeImage
                name="unique_item_background_bottom"
                src={srcUniqueItemBackgroundBottom2 ?? layoutImage('unique_item_large_iron.png')}
                layout={{ position: 'absolute', left: 155, width: 5, top: -1, height: 9 }}
            />
            <ThemeImage
                name="unique_item_background_mid"
                src={srcUniqueItemBackgroundMid ?? layoutImage('unique_item_large_glass_mid.png')}
                layout={{ position: 'absolute', left: 0, width: 170, top: 5, bottom: 5 }}
            />
            <ThemeImage
                name="unique_item_background_top"
                src={srcUniqueItemBackgroundTop ?? layoutImage('unique_item_large_glass_top.png')}
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 5 }}
            />
            <ThemeImage
                name="unique_item_background_bottom"
                src={srcUniqueItemBackgroundBottom3 ?? layoutImage('unique_item_large_glass_bottom.png')}
                layout={{ position: 'absolute', left: 0, width: 170, bottom: 0, height: 5 }}
            />
            <ThemeImage
                name="unique_item_background_bottom"
                src={srcUniqueItemBackgroundBottom4 ?? layoutImage('unique_item_large_iron.png')}
                layout={{ position: 'absolute', left: 8, width: 5, bottom: -2, height: 9 }}
            />
            <ThemeImage
                name="unique_item_background_bottom"
                src={srcUniqueItemBackgroundBottom5 ?? layoutImage('unique_item_large_iron.png')}
                layout={{ position: 'absolute', left: 155, width: 5, bottom: -2, height: 9 }}
            />
        </Region>
    );
};

/** Named region `unique_item_overlay_container` of FurniViewLayout - configured through the parent's `uniqueItemOverlayContainer` prop. */
export interface FurniViewLayoutUniqueItemOverlayContainerProps {
    layout?: BoxLayout;
    visibleUniqueItemOverlayContainer?: boolean;
}

export const FurniViewLayoutUniqueItemOverlayContainer = ({ layout, visibleUniqueItemOverlayContainer }: FurniViewLayoutUniqueItemOverlayContainerProps) => {
    return (
        <Region
            name="unique_item_overlay_container"
            visible={visibleUniqueItemOverlayContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, bottom: 0, minHeight: 45, ...layout }}
        >
            <ThemeImage
                src={layoutImage('unique_item_large_glass_shine.png')}
                layout={{ position: 'absolute', left: 0, width: 170, top: 5, bottom: 5 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_preview"
                name="unique_item_plaque_widget"
                layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
            />
        </Region>
    );
};

/** Named region `rarity_item_overlay_container` of FurniViewLayout - configured through the parent's `rarityItemOverlayContainer` prop. */
export interface FurniViewLayoutRarityItemOverlayContainerProps {
    layout?: BoxLayout;
    visibleRarityItemOverlayContainer?: boolean;
}

export const FurniViewLayoutRarityItemOverlayContainer = ({ layout, visibleRarityItemOverlayContainer }: FurniViewLayoutRarityItemOverlayContainerProps) => {
    return (
        <Region
            name="rarity_item_overlay_container"
            visible={visibleRarityItemOverlayContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, bottom: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="rarity_item_overlay_preview"
                name="rarity_item_overlay_widget"
                layout={{ position: 'absolute', left: 128, width: 40, top: 6, height: 40 }}
            />
        </Region>
    );
};

/** Row template `image_container` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutImageContainerItemProps {
    layout?: BoxLayout;
    rarityItemOverlayContainer?: FurniViewLayoutRarityItemOverlayContainerProps;
    srcImage?: string;
    uniqueItemBackgroundContainer?: FurniViewLayoutUniqueItemBackgroundContainerProps;
    uniqueItemOverlayContainer?: FurniViewLayoutUniqueItemOverlayContainerProps;
}

export const FurniViewLayoutImageContainerItem = ({ layout, rarityItemOverlayContainer, srcImage, uniqueItemBackgroundContainer, uniqueItemOverlayContainer }: FurniViewLayoutImageContainerItemProps) => {
    return (
        <Region
            name="image_container"
            layout={{ width: 170, height: 130, flexShrink: 0, minHeight: 45, ...layout }}
        >
            <FurniViewLayoutUniqueItemBackgroundContainer {...uniqueItemBackgroundContainer} />
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 5, width: 140, top: 5, minHeight: 45 }}
            />
            <FurniViewLayoutUniqueItemOverlayContainer {...uniqueItemOverlayContainer} />
            <FurniViewLayoutRarityItemOverlayContainer {...rarityItemOverlayContainer} />
        </Region>
    );
};

/** Row template `nft_indicator` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNftIndicatorItemProps {
    layout?: BoxLayout;
    srcNftIcon?: string;
}

export const FurniViewLayoutNftIndicatorItem = ({ layout, srcNftIcon }: FurniViewLayoutNftIndicatorItemProps) => {
    return (
        <Region
            name="nft_indicator"
            layout={{ width: 170, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="nft_icon"
                src={srcNftIcon}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Row template `owner_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
}

export const FurniViewLayoutOwnerSpacerItem = ({ layout }: FurniViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_region` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
    srcBcwIcon?: string;
    srcTempIcon?: string;
}

export const FurniViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion, srcBcwIcon, srcTempIcon }: FurniViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
            onPointerTap={onOwnerRegion}
            cursor="pointer"
            layout={{ width: 170, height: 17, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Icon
                variant="21"
                name="owner_link"
                layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
            >
                <ThemeImage
                    name="bcw_icon"
                    src={srcBcwIcon ?? '${image.library.url}/catalogue/icon_193.png'}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                />
            </Region>
            <Region
                name="owner_name"
                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOwnerName ?? ''}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', marginLeft: -77.5, marginRight: 77.5, width: 15, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 15 }}
            >
                <ThemeImage
                    name="temp_icon"
                    src={srcTempIcon ?? '${image.library.url}catalogue/icon_80.png'}
                    layout={{ position: 'absolute', marginLeft: -77.5, marginRight: 77.5, width: 15, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 15 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `group_details_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutGroupDetailsSpacerItemProps {
    layout?: BoxLayout;
}

export const FurniViewLayoutGroupDetailsSpacerItem = ({ layout }: FurniViewLayoutGroupDetailsSpacerItemProps) => {
    return (
        <Region
            name="group_details_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `group_details_container` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutGroupDetailsContainerItemProps {
    captionGroupName?: string;
    layout?: BoxLayout;
    onGroupDetailsContainer?: () => void;
}

export const FurniViewLayoutGroupDetailsContainerItem = ({ captionGroupName, layout, onGroupDetailsContainer }: FurniViewLayoutGroupDetailsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_details_container"
            tooltip={t('infostand.group.link.tooltip')}
            onPointerTap={onGroupDetailsContainer}
            cursor="pointer"
            layout={{ width: 170, height: 40, flexShrink: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="group_badge_image"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
            />
            <Region
                name="group_name"
                layout={{ position: 'absolute', left: 45, width: 128, top: 10, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGroupName ?? ''}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 128 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `expiration_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: FurniViewLayoutExpirationTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="expiration_text"
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExpirationText ?? t('infostand.rent.expiration')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `bc_place_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutBcPlaceButtonItemProps {
    layout?: BoxLayout;
    onBcPlaceButton?: () => void;
    srcIcon?: string;
}

export const FurniViewLayoutBcPlaceButtonItem = ({ layout, onBcPlaceButton, srcIcon }: FurniViewLayoutBcPlaceButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="0"
            name="bc_place_button"
            tooltip={t('infostand.button.place_more.tooltip')}
            onPointerTap={onBcPlaceButton}
            layout={{ width: 90, height: 23, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 79, top: 0, height: 22, flexDirection: 'row' }}>
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('infostand_furni_place.png')}
                    layout={{ width: 20, height: 18, flexShrink: 0 }}
                />
                <Region layout={{ width: 59, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('infostand.button.place_more')}
                        textStyle="text-style-regular"
                    />
                </Region>
            </Region>
        </ContainerButton>
    );
};

/** Row template `catalog_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
    srcIcon?: string;
}

export const FurniViewLayoutCatalogButtonItem = ({ layout, onCatalogButton, srcIcon }: FurniViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="0"
            name="catalog_button"
            onPointerTap={onCatalogButton}
            layout={{ width: 72, height: 23, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 2, width: 64, top: 0, height: 22, flexDirection: 'row' }}>
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('infostand_furni_shop.png')}
                    layout={{ width: 20, height: 18, flexShrink: 0 }}
                />
                <Region layout={{ width: 44, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('infostand.button.buy')}
                        textStyle="text-style-regular"
                    />
                </Region>
            </Region>
        </ContainerButton>
    );
};

/** Row template `rent_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
}

export const FurniViewLayoutRentButtonItem = ({ layout, onRentButton }: FurniViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            onPointerTap={onRentButton}
            layout={{ width: 130, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};

/** Row template `extend_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const FurniViewLayoutExtendButtonItem = ({ layout, onExtendButton }: FurniViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            onPointerTap={onExtendButton}
            layout={{ width: 143, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};

/** Row template `buyout_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
}

export const FurniViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton }: FurniViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            onPointerTap={onBuyoutButton}
            layout={{ width: 143, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};

/** Row template `purchase_buttons` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: FurniViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <FurniViewLayoutBcPlaceButtonItem />
                    <FurniViewLayoutCatalogButtonItem />
                    <FurniViewLayoutRentButtonItem />
                    <FurniViewLayoutExtendButtonItem />
                    <FurniViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `furni_details_spacer` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutFurniDetailsSpacerItemProps {
    layout?: BoxLayout;
}

export const FurniViewLayoutFurniDetailsSpacerItem = ({ layout }: FurniViewLayoutFurniDetailsSpacerItemProps) => {
    return (
        <Region
            name="furni_details_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `chest_item_count` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutChestItemCountItemProps {
    captionChestItemCount?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutChestItemCountItem = ({ captionChestItemCount, layout }: FurniViewLayoutChestItemCountItemProps) => {
    return (
        <Region
            name="chest_item_count"
            visible={false}
            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChestItemCount ?? 'Items:'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `furni_details_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutFurniDetailsTextItemProps {
    captionFurniDetailsText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutFurniDetailsTextItem = ({ captionFurniDetailsText, layout }: FurniViewLayoutFurniDetailsTextItemProps) => {
    return (
        <Region
            name="furni_details_text"
            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniDetailsText ?? 'Furni details'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Named region `infostand_element_list` of FurniViewLayout - configured through the parent's `infostandElementList` prop. */
export interface FurniViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: FurniViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 355, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <FurniViewLayoutNameTextItem />
                    <FurniViewLayoutNameExtraTextItem />
                    <FurniViewLayoutImagesSpacerItem />
                    <FurniViewLayoutWiredChestElementsItem />
                    <FurniViewLayoutImageContainerItem />
                    <FurniViewLayoutNftIndicatorItem />
                    <FurniViewLayoutOwnerSpacerItem />
                    <FurniViewLayoutOwnerRegionItem />
                    <FurniViewLayoutGroupDetailsSpacerItem />
                    <FurniViewLayoutGroupDetailsContainerItem />
                    <FurniViewLayoutExpirationTextItem />
                    <FurniViewLayoutPurchaseButtonsItem />
                    <FurniViewLayoutFurniDetailsSpacerItem />
                    <FurniViewLayoutChestItemCountItem />
                    <FurniViewLayoutFurniDetailsTextItem />
                </>
            )}
        </Region>
    );
};

/** Named region `variable_list` of FurniViewLayout - configured through the parent's `variableList` prop. */
export interface FurniViewLayoutVariableListProps {
    captionName?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutVariableList = ({ captionName, layout }: FurniViewLayoutVariableListProps) => {
    const [ valueValue, setValueValue ] = useState('');

    return (
        <Region
            name="variable_list"
            layout={{ position: 'absolute', left: 0, top: 32, flexDirection: 'column', ...layout }}
        >
            <Region layout={{ width: 183, height: 26, flexShrink: 0 }}>
                <Region
                    name="name"
                    layout={{ position: 'absolute', left: 1, width: 41, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'Name:'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <TextInput
                    value={valueValue}
                    onChange={setValueValue}
                    layout={{ position: 'absolute', left: 80, width: 100, top: 2, height: 17 }}
                />
                <Border
                    variant="3"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 80, width: 100, top: 0, height: 20 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `move` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
}

export const FurniViewLayoutMoveItem = ({ layout, onMove }: FurniViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            onPointerTap={onMove}
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};

/** Row template `rotate` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const FurniViewLayoutRotateItem = ({ layout, onRotate }: FurniViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            onPointerTap={onRotate}
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};

/** Row template `pickup` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const FurniViewLayoutPickupItem = ({ layout, onPickup }: FurniViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            onPointerTap={onPickup}
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};

/** Row template `save_branding_configuration` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutSaveBrandingConfigurationItemProps {
    layout?: BoxLayout;
    onSaveBrandingConfiguration?: () => void;
}

export const FurniViewLayoutSaveBrandingConfigurationItem = ({ layout, onSaveBrandingConfiguration }: FurniViewLayoutSaveBrandingConfigurationItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="save_branding_configuration"
            onPointerTap={onSaveBrandingConfiguration}
            layout={{ width: 175, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.savebranding')}
        </Button>
    );
};

/** Row template `use` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
}

export const FurniViewLayoutUseItem = ({ layout, onUse }: FurniViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            onPointerTap={onUse}
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};

/** Row template `wired_inspect` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredInspectItemProps {
    layout?: BoxLayout;
    onWiredInspect?: () => void;
}

export const FurniViewLayoutWiredInspectItem = ({ layout, onWiredInspect }: FurniViewLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="wired_inspect"
            onPointerTap={onWiredInspect}
            layout={{ width: 59, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.wired_inspect')}
        </Button>
    );
};

/** Named region `button_list` of FurniViewLayout - configured through the parent's `buttonList` prop. */
export interface FurniViewLayoutButtonListProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const FurniViewLayoutButtonList = ({ itemsButtonList, layout }: FurniViewLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <FurniViewLayoutMoveItem />
                    <FurniViewLayoutRotateItem />
                    <FurniViewLayoutPickupItem />
                    <FurniViewLayoutSaveBrandingConfigurationItem />
                    <FurniViewLayoutUseItem />
                    <FurniViewLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};
