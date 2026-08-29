import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `980_crackable_furni_view_xml` (layout "crackable_furni_view", 429x306) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CrackableFurniViewLayoutProps {
    buttonList?: CrackableFurniViewLayoutButtonListProps;
    infostandElementList?: CrackableFurniViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const CrackableFurniViewLayout = ({ buttonList, infostandElementList, layout, onClose }: CrackableFurniViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 429, height: 306, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 429, top: 0, height: 306, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="2"
                    name="info_border"
                    tintColor="#3d3d3d"
                    layout={{ width: 190, height: 271, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <CrackableFurniViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <CrackableFurniViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};

/** Row template `name_text` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutNameTextItem = ({ captionNameText, layout, tags }: CrackableFurniViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            tags={tags}
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
    tags?: string[];
}

export const CrackableFurniViewLayoutImagesSpacerItem = ({ layout, tags }: CrackableFurniViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `image` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutImageItemProps {
    layout?: BoxLayout;
    srcImage?: string;
    tags?: string[];
}

export const CrackableFurniViewLayoutImageItem = ({ layout, srcImage, tags }: CrackableFurniViewLayoutImageItemProps) => {
    return (
        <ThemeImage
            name="image"
            tags={tags}
            src={srcImage}
            layout={{ width: 140, height: 120, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `owner_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutOwnerSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutOwnerSpacerItem = ({ layout, tags }: CrackableFurniViewLayoutOwnerSpacerItemProps) => {
    return (
        <Region
            name="owner_spacer"
            tags={tags}
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
    tags?: string[];
}

export const CrackableFurniViewLayoutOwnerRegionItem = ({ captionOwnerName, layout, onOwnerRegion, tags }: CrackableFurniViewLayoutOwnerRegionItemProps) => {
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

/** Row template `description_spacer` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutDescriptionSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutDescriptionSpacerItem = ({ layout, tags }: CrackableFurniViewLayoutDescriptionSpacerItemProps) => {
    return (
        <Region
            name="description_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `hits_remaining` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutHitsRemainingItemProps {
    captionHitsRemaining?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutHitsRemainingItem = ({ captionHitsRemaining, layout, tags }: CrackableFurniViewLayoutHitsRemainingItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hits_remaining"
            tags={tags}
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
    tags?: string[];
}

export const CrackableFurniViewLayoutExpirationTextItem = ({ captionExpirationText, layout, tags }: CrackableFurniViewLayoutExpirationTextItemProps) => {
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

/** Row template `catalog_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutCatalogButtonItemProps {
    layout?: BoxLayout;
    onCatalogButton?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutCatalogButtonItem = ({ layout, onCatalogButton, tags }: CrackableFurniViewLayoutCatalogButtonItemProps) => {
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

/** Row template `rent_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutRentButtonItem = ({ layout, onRentButton, tags }: CrackableFurniViewLayoutRentButtonItemProps) => {
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

/** Row template `extend_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutExtendButtonItem = ({ layout, onExtendButton, tags }: CrackableFurniViewLayoutExtendButtonItemProps) => {
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

/** Row template `buyout_button` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton, tags }: CrackableFurniViewLayoutBuyoutButtonItemProps) => {
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

/** Row template `purchase_buttons` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutPurchaseButtonsItemProps {
    itemsPurchaseButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutPurchaseButtonsItem = ({ itemsPurchaseButtons, layout, tags }: CrackableFurniViewLayoutPurchaseButtonsItemProps) => {
    return (
        <Region
            name="purchase_buttons"
            tags={tags}
            layout={{ width: 170, height: 22, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsPurchaseButtons ?? (
                <>
                    <CrackableFurniViewLayoutCatalogButtonItem tags={[ 'catalog' ]} />
                    <CrackableFurniViewLayoutRentButtonItem />
                    <CrackableFurniViewLayoutExtendButtonItem />
                    <CrackableFurniViewLayoutBuyoutButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `infostand_element_list` of CrackableFurniViewLayout - configured through the parent's `infostandElementList` prop. */
export interface CrackableFurniViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout, tags }: CrackableFurniViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 251, flexDirection: 'column', gap: 5, ...layout }}
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
    );
};

/** Row template `move` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutMoveItem = ({ layout, onMove, tags }: CrackableFurniViewLayoutMoveItemProps) => {
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

/** Row template `rotate` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutRotateItem = ({ layout, onRotate, tags }: CrackableFurniViewLayoutRotateItemProps) => {
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

/** Row template `pickup` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutPickupItem = ({ layout, onPickup, tags }: CrackableFurniViewLayoutPickupItemProps) => {
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

/** Row template `use` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
    tags?: string[];
}

export const CrackableFurniViewLayoutUseItem = ({ layout, onUse, tags }: CrackableFurniViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            tags={tags}
            onPointerTap={onUse}
            textStyle="text-style-button-regular"
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};

/** Named region `button_list` of CrackableFurniViewLayout - configured through the parent's `buttonList` prop. */
export interface CrackableFurniViewLayoutButtonListProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const CrackableFurniViewLayoutButtonList = ({ itemsButtonList, layout, tags }: CrackableFurniViewLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            tags={tags}
            layout={{ width: 1280, height: 25, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
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
    );
};
