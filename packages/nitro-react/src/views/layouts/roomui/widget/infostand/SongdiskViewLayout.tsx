import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1053_songdisk_view_xml` (layout "furni_view", 429x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SongdiskViewLayoutProps {
    buttonList?: SongdiskViewLayoutButtonListProps;
    infostandElementList?: SongdiskViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const SongdiskViewLayout = ({ buttonList, infostandElementList, layout, onClose }: SongdiskViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 25, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 25, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 290, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <SongdiskViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <SongdiskViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};

/** Row template `name_text` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutNameTextItem = ({ captionNameText, layout, tags }: SongdiskViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            tags={tags}
            layout={{ width: 154, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutImagesSpacerItem = ({ layout, tags }: SongdiskViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `image` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
    tags?: string[];
}

export const SongdiskViewLayoutImageItem = ({ layout, srcImage, tags }: SongdiskViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            tags={tags}
            src={srcImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_spacer` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutOwnerSpacerItem = ({ layout, tags }: SongdiskViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_region` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion, tags }: SongdiskViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
            tags={tags}
            onPointerTap={onOwnerRegion}
            cursor="pointer"
            layout={{ width: 170, height: 17, flexShrink: 0, ...layout }}
        >
            <Icon
                variant="21"
                name="owner_link"
                layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
            />
            <Region
                name="owner_name"
                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOwnerName ?? ''}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `description_spacer` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutDescriptionSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutDescriptionSpacerItem = ({ layout, tags }: SongdiskViewLayoutDescriptionSpacerItemProps) => {
    return (
        <Region
            name="description_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `trackname_container` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutTracknameContainerItemProps {
    captionTrackNameText?: string;
    layout?: BoxLayout;
    srcIconDisc?: string;
    tags?: string[];
}

export const SongdiskViewLayoutTracknameContainerItem = ({ captionTrackNameText, layout, srcIconDisc, tags }: SongdiskViewLayoutTracknameContainerItemProps) => {
    return (
        <Region
            name="trackname_container"
            tags={tags}
            layout={{ width: 170, height: 14, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon_disc"
                src={srcIconDisc ?? layoutImage('jb_icon_disc.png')}
                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
            />
            <Region
                name="track_name_text"
                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrackNameText ?? ''}
                    textStyle="text-style-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `creatorname_container` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutCreatornameContainerItemProps {
    captionTrackCreatorText?: string;
    layout?: BoxLayout;
    srcIconComposer?: string;
    tags?: string[];
}

export const SongdiskViewLayoutCreatornameContainerItem = ({ captionTrackCreatorText, layout, srcIconComposer, tags }: SongdiskViewLayoutCreatornameContainerItemProps) => {
    return (
        <Region
            name="creatorname_container"
            tags={tags}
            layout={{ width: 170, height: 15, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon_composer"
                src={srcIconComposer ?? layoutImage('jb_icon_composer.png')}
                layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 14 }}
            />
            <Region
                name="track_creator_text"
                layout={{ position: 'absolute', left: 20, width: 150, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrackCreatorText ?? ''}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `expiration_text` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutExpirationTextItem = ({ captionExpirationText, layout, tags }: SongdiskViewLayoutExpirationTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="expiration_text"
            tags={tags}
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExpirationText ?? t('infostand.rent.expiration')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `catalog_button` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutCatalogButtonItem = ({ layout, onCatalogButton, tags }: SongdiskViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="catalog_button"
            tags={tags}
            onPointerTap={onCatalogButton}
            textStyle="text-style-button-regular"
            layout={{ width: 60, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buy')}
        </Button>
    );
};

/** Row template `rent_button` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutRentButtonItem = ({ layout, onRentButton, tags }: SongdiskViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            tags={tags}
            onPointerTap={onRentButton}
            textStyle="text-style-button-regular"
            layout={{ width: 130, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};

/** Row template `extend_button` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutExtendButtonItem = ({ layout, onExtendButton, tags }: SongdiskViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            tags={tags}
            onPointerTap={onExtendButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};

/** Row template `buyout_button` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton, tags }: SongdiskViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            tags={tags}
            onPointerTap={onBuyoutButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};

/** Row template `purchase_buttons` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout, tags }: SongdiskViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            tags={tags}
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <SongdiskViewLayoutCatalogButtonItem tags={[ 'catalog' ]} />
                    <SongdiskViewLayoutRentButtonItem />
                    <SongdiskViewLayoutExtendButtonItem />
                    <SongdiskViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `infostand_element_list` of SongdiskViewLayout - configured through the parent's `infostandElementList` prop. */
export interface SongdiskViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout, tags }: SongdiskViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 271, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <SongdiskViewLayoutNameTextItem />
                    <SongdiskViewLayoutImagesSpacerItem />
                    <SongdiskViewLayoutImageItem />
                    <SongdiskViewLayoutOwnerSpacerItem />
                    <SongdiskViewLayoutOwnerRegionItem />
                    <SongdiskViewLayoutDescriptionSpacerItem />
                    <SongdiskViewLayoutTracknameContainerItem />
                    <SongdiskViewLayoutCreatornameContainerItem />
                    <SongdiskViewLayoutExpirationTextItem />
                    <SongdiskViewLayoutPurchaseButtonsItem />
                </>
            )}
        </Region>
    );
};

/** Row template `move` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutMoveItem = ({ layout, onMove, tags }: SongdiskViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            tags={tags}
            onPointerTap={onMove}
            textStyle="text-style-button-regular"
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};

/** Row template `rotate` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutRotateItem = ({ layout, onRotate, tags }: SongdiskViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            tags={tags}
            onPointerTap={onRotate}
            textStyle="text-style-button-regular"
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};

/** Row template `pickup` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
    tags?: string[];
}

export const SongdiskViewLayoutPickupItem = ({ layout, onPickup, tags }: SongdiskViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            tags={tags}
            onPointerTap={onPickup}
            textStyle="text-style-button-regular"
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};

/** Named region `button_list` of SongdiskViewLayout - configured through the parent's `buttonList` prop. */
export interface SongdiskViewLayoutButtonListProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const SongdiskViewLayoutButtonList = ({ itemsButtonList, layout, tags }: SongdiskViewLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            tags={tags}
            layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <SongdiskViewLayoutMoveItem />
                    <SongdiskViewLayoutRotateItem />
                    <SongdiskViewLayoutPickupItem />
                </>
            )}
        </Region>
    );
};
