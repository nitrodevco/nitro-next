import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `980_crackable_furni_view_xml` (layout "crackable_furni_view", 429x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CrackableFurniViewLayoutProps {
    itemsButtonList?: ReactNode;
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const CrackableFurniViewLayout = ({ itemsButtonList, itemsInfostandElementList, layout, onClose }: CrackableFurniViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 306, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 306, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="2"
                    name="info_border"
                    params={16}
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 271, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        params={17}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <Region
                        name="infostand_element_list"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 251, flexDirection: 'column', gap: 5 }}
                    >
                        {itemsInfostandElementList ?? (
                            <>
                                <CrackableFurniViewLayoutNameTextItem />
                                <CrackableFurniViewLayoutImagesSpacerItem />
                                <CrackableFurniViewLayoutImageItem />
                                <CrackableFurniViewLayoutOwnerSpacerItem />
                                <CrackableFurniViewLayoutOwnerRegionItem />
                                <CrackableFurniViewLayoutDescriptionSpacerItem />
                                <CrackableFurniViewLayoutHitsRemainingItem />
                                <CrackableFurniViewLayoutExpirationTextItem />
                                <CrackableFurniViewLayoutPurchaseButtonsItem />
                            </>
                        )}
                    </Region>
                </Border>
                <Region
                    name="button_list"
                    params={16}
                    layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonList ?? (
                        <>
                            <CrackableFurniViewLayoutMoveItem />
                            <CrackableFurniViewLayoutRotateItem />
                            <CrackableFurniViewLayoutPickupItem />
                            <CrackableFurniViewLayoutUseItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `name_text` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutNameTextItem = ({ captionNameText, layout }: CrackableFurniViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            params={144}
            layout={{ width: 158, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? 'Furni name'}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 158 }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutImagesSpacerItem = ({ layout }: CrackableFurniViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            params={16}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `image` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
}

export const CrackableFurniViewLayoutImageItem = ({ layout, srcImage }: CrackableFurniViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            params={16}
            src={srcImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutOwnerSpacerItem = ({ layout }: CrackableFurniViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            params={16}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_region` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutOwnerRegionItemProps {
    captionOwnerName?: string;
    layout?: BoxLayout;
    onOwnerRegion?: () => void;
}

export const CrackableFurniViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion }: CrackableFurniViewLayoutOwnerRegionItemProps) => {
    return (
        <Region
            name="owner_region"
            params={17}
            onPointerTap={onOwnerRegion}
            cursor="pointer"
            layout={{ width: 170, height: 17, flexShrink: 0, ...layout }}
        >
            <Icon
                variant="21"
                name="owner_link"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 20, top: 2, height: 15 }}
            />
            <Region
                name="owner_name"
                params={16}
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

/** Row template `description_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutDescriptionSpacerItemProps {
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutDescriptionSpacerItem = ({ layout }: CrackableFurniViewLayoutDescriptionSpacerItemProps) => {
    return (
        <Region
            name="description_spacer"
            params={16}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `hits_remaining` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutHitsRemainingItemProps {
    captionHitsRemaining?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutHitsRemainingItem = ({ captionHitsRemaining, layout }: CrackableFurniViewLayoutHitsRemainingItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hits_remaining"
            params={16}
            layout={{ width: 170, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHitsRemaining ?? t('infostand.crackable_furni.hits_remaining')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `expiration_text` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutExpirationTextItemProps {
    captionExpirationText?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutExpirationTextItem = ({ captionExpirationText, layout }: CrackableFurniViewLayoutExpirationTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="expiration_text"
            params={16}
            layout={{ width: 170, height: 23, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExpirationText ?? t('infostand.rent.expiration')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `catalog_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
}

export const CrackableFurniViewLayoutCatalogButtonItem = ({ layout, onCatalogButton }: CrackableFurniViewLayoutCatalogButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="catalog_button"
            tags={[ 'catalog' ]}
            params={131089}
            onPointerTap={onCatalogButton}
            textStyle="text-style-button-regular"
            layout={{ width: 60, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buy')}
        </Button>
    );
};

/** Row template `rent_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
}

export const CrackableFurniViewLayoutRentButtonItem = ({ layout, onRentButton }: CrackableFurniViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            params={131089}
            onPointerTap={onRentButton}
            textStyle="text-style-button-regular"
            layout={{ width: 130, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};

/** Row template `extend_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const CrackableFurniViewLayoutExtendButtonItem = ({ layout, onExtendButton }: CrackableFurniViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            params={131089}
            onPointerTap={onExtendButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};

/** Row template `buyout_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
}

export const CrackableFurniViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton }: CrackableFurniViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            params={131089}
            onPointerTap={onBuyoutButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};

/** Row template `purchase_buttons` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout }: CrackableFurniViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            params={16}
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <CrackableFurniViewLayoutCatalogButtonItem />
                    <CrackableFurniViewLayoutRentButtonItem />
                    <CrackableFurniViewLayoutExtendButtonItem />
                    <CrackableFurniViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `move` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
}

export const CrackableFurniViewLayoutMoveItem = ({ layout, onMove }: CrackableFurniViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            params={131089}
            onPointerTap={onMove}
            textStyle="text-style-button-regular"
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};

/** Row template `rotate` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const CrackableFurniViewLayoutRotateItem = ({ layout, onRotate }: CrackableFurniViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            params={131089}
            onPointerTap={onRotate}
            textStyle="text-style-button-regular"
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};

/** Row template `pickup` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const CrackableFurniViewLayoutPickupItem = ({ layout, onPickup }: CrackableFurniViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            params={131089}
            onPointerTap={onPickup}
            textStyle="text-style-button-regular"
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};

/** Row template `use` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
}

export const CrackableFurniViewLayoutUseItem = ({ layout, onUse }: CrackableFurniViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            params={131089}
            onPointerTap={onUse}
            textStyle="text-style-button-regular"
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};
