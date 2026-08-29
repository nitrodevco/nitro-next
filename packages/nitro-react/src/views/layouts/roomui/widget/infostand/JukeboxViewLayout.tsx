import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `891_jukebox_view_xml` (layout "furni_view", 429x345) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface JukeboxViewLayoutProps {
    infostandElementList?: JukeboxViewLayoutInfostandElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const JukeboxViewLayout = ({ infostandElementList, itemsButtonList, layout, onClose }: JukeboxViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 345, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 345, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 310, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <JukeboxViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <Region
                    name="button_list"
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <JukeboxViewLayoutMoveItem />
                            <JukeboxViewLayoutRotateItem />
                            <JukeboxViewLayoutPickupItem />
                            <JukeboxViewLayoutUseItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `name_text` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutNameTextItem = ({ captionNameText, layout }: JukeboxViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            layout={{ width: 158, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 158 }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
}

export const JukeboxViewLayoutImagesSpacerItem = ({ layout }: JukeboxViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `image` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
}

export const JukeboxViewLayoutImageItem = ({ layout, srcImage }: JukeboxViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            src={srcImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_spacer` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
}

export const JukeboxViewLayoutOwnerSpacerItem = ({ layout }: JukeboxViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_region` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
}

export const JukeboxViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion }: JukeboxViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
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

/** Row template `description_spacer` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutDescriptionSpacerItemProps {
    layout?: BoxLayout;
}

export const JukeboxViewLayoutDescriptionSpacerItem = ({ layout }: JukeboxViewLayoutDescriptionSpacerItemProps) => {
    return (
        <Region
            name="description_spacer"
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `now_playing_text` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutNowPlayingTextItemProps {
    captionNowPlayingText?: string;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutNowPlayingTextItem = ({ captionNowPlayingText, layout }: JukeboxViewLayoutNowPlayingTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="now_playing_text"
            layout={{ width: 170, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNowPlayingText ?? t('infostand.jukebox.text.not.playing')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `trackname_container` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutTracknameContainerItemProps {
    captionTrackNameText?: string;
    layout?: BoxLayout;
    srcIconDisc?: string;
}

export const JukeboxViewLayoutTracknameContainerItem = ({ captionTrackNameText, layout, srcIconDisc }: JukeboxViewLayoutTracknameContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="trackname_container"
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
                    text={captionTrackNameText ?? t('infostand.jukebox.text.track.name')}
                    textStyle="text-style-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `creatorname_container` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutCreatornameContainerItemProps {
    captionTrackCreatorText?: string;
    layout?: BoxLayout;
    srcIconComposer?: string;
}

export const JukeboxViewLayoutCreatornameContainerItem = ({ captionTrackCreatorText, layout, srcIconComposer }: JukeboxViewLayoutCreatornameContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="creatorname_container"
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
                    text={captionTrackCreatorText ?? t('infostand.jukebox.text.creator')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 150 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `expiration_text` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: JukeboxViewLayoutExpirationTextItemProps) => {
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

/** Row template `catalog_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
}

export const JukeboxViewLayoutCatalogButtonItem = ({ layout, onCatalogButton }: JukeboxViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="catalog_button"
            onPointerTap={onCatalogButton}
            textStyle="text-style-button-regular"
            layout={{ width: 60, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buy')}
        </Button>
    );
};

/** Row template `rent_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
}

export const JukeboxViewLayoutRentButtonItem = ({ layout, onRentButton }: JukeboxViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            onPointerTap={onRentButton}
            textStyle="text-style-button-regular"
            layout={{ width: 130, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};

/** Row template `extend_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const JukeboxViewLayoutExtendButtonItem = ({ layout, onExtendButton }: JukeboxViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            onPointerTap={onExtendButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};

/** Row template `buyout_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
}

export const JukeboxViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton }: JukeboxViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            onPointerTap={onBuyoutButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};

/** Row template `purchase_buttons` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: JukeboxViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <JukeboxViewLayoutCatalogButtonItem />
                    <JukeboxViewLayoutRentButtonItem />
                    <JukeboxViewLayoutExtendButtonItem />
                    <JukeboxViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `infostand_element_list` of JukeboxViewLayout - configured through the parent's `infostandElementList` prop. */
export interface JukeboxViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const JukeboxViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: JukeboxViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 290, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <JukeboxViewLayoutNameTextItem />
                    <JukeboxViewLayoutImagesSpacerItem />
                    <JukeboxViewLayoutImageItem />
                    <JukeboxViewLayoutOwnerSpacerItem />
                    <JukeboxViewLayoutOwnerRegionItem />
                    <JukeboxViewLayoutDescriptionSpacerItem />
                    <JukeboxViewLayoutNowPlayingTextItem />
                    <JukeboxViewLayoutTracknameContainerItem />
                    <JukeboxViewLayoutCreatornameContainerItem />
                    <JukeboxViewLayoutExpirationTextItem />
                    <JukeboxViewLayoutPurchaseButtonsItem />
                </>
            )}
        </Region>
    );
};

/** Row template `move` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
}

export const JukeboxViewLayoutMoveItem = ({ layout, onMove }: JukeboxViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            onPointerTap={onMove}
            textStyle="text-style-button-regular"
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};

/** Row template `rotate` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const JukeboxViewLayoutRotateItem = ({ layout, onRotate }: JukeboxViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            onPointerTap={onRotate}
            textStyle="text-style-button-regular"
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};

/** Row template `pickup` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const JukeboxViewLayoutPickupItem = ({ layout, onPickup }: JukeboxViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            onPointerTap={onPickup}
            textStyle="text-style-button-regular"
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};

/** Row template `use` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
}

export const JukeboxViewLayoutUseItem = ({ layout, onUse }: JukeboxViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            onPointerTap={onUse}
            textStyle="text-style-button-regular"
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};
