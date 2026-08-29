import { ReactNode } from 'react';

import { BoxLayout, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1625_club_extend_confirmation_xml` (layout "extend_confirmation", 450x235) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubExtendConfirmationLayoutProps {
    backgroundContainer?: ClubExtendConfirmationLayoutBackgroundContainerProps;
    itemlistVertical?: ClubExtendConfirmationLayoutItemlistVerticalProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcClubTeaser?: string;
}

export const ClubExtendConfirmationLayout = ({ backgroundContainer, itemlistVertical, layout, onClose, srcClubTeaser }: ClubExtendConfirmationLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="frame_title"
            name="frame_title"
            tintColor="#007a98"
            onClose={onClose}
            layout={{ width: 450, height: 235, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ClubExtendConfirmationLayoutBackgroundContainer {...backgroundContainer} />
                <Icon
                    variant="18"
                    name="club_level_icon"
                    layout={{ position: 'absolute', left: 25, width: 85, top: 25, height: 40 }}
                />
                <ClubExtendConfirmationLayoutItemlistVertical {...itemlistVertical} />
                <ThemeImage
                    name="club_teaser"
                    src={srcClubTeaser}
                    layout={{ position: 'absolute', right: 409, width: 40, bottom: -19, height: 144 }}
                />
            </Region>
        </Frame>
    );
};

/** Named region `background_container` of ClubExtendConfirmationLayout - configured through the parent's `backgroundContainer` prop. */
export interface ClubExtendConfirmationLayoutBackgroundContainerProps {
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutBackgroundContainer = ({ layout }: ClubExtendConfirmationLayoutBackgroundContainerProps) => {
    return (
        <Region
            name="background_container"
            backgroundColor="#bcbdbc"
            layout={{ position: 'absolute', left: 1, width: 448, top: 0, height: 25, ...layout }}
        />
    );
};

/** Row template `extend_title` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutExtendTitleItemProps {
    captionExtendTitle?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutExtendTitleItem = ({ captionExtendTitle, layout }: ClubExtendConfirmationLayoutExtendTitleItemProps) => {
    return (
        <Region
            name="extend_title"
            layout={{ width: 266, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionExtendTitle ?? ''}
                textStyle="text-style-u-headline-big"
                textOptions={{ wordWrap: true, wordWrapWidth: 266 }}
            />
        </Region>
    );
};

/** Row template `normal_price_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutNormalPriceContainerItemProps {
    captionNormalPriceLabel?: string;
    captionNormalPricePriceLeft?: string;
    captionNormalPricePriceRight?: string;
    captionPlus?: string;
    layout?: BoxLayout;
    srcNormalPriceIconLeft?: string;
}

export const ClubExtendConfirmationLayoutNormalPriceContainerItem = ({ captionNormalPriceLabel, captionNormalPricePriceLeft, captionNormalPricePriceRight, captionPlus, layout, srcNormalPriceIconLeft }: ClubExtendConfirmationLayoutNormalPriceContainerItemProps) => {
    return (
        <Region
            name="normal_price_container"
            layout={{ width: 285, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="normal_price_label"
                layout={{ position: 'absolute', left: 0, width: 4, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNormalPriceLabel ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="normal_price_price_left"
                layout={{ position: 'absolute', left: 150, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionNormalPricePriceLeft ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="normal_price_icon_left"
                src={srcNormalPriceIconLeft}
                layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
            />
            <Region
                name="plus"
                layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionPlus ?? ' '}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Region
                name="normal_price_price_right"
                layout={{ position: 'absolute', left: 220, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionNormalPricePriceRight ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Icon
                variant="0"
                name="normal_price_icon_right"
                layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `you_save_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutYouSaveContainerItemProps {
    captionPlus?: string;
    captionYouSaveLabel?: string;
    captionYouSavePriceLeft?: string;
    captionYouSavePriceRight?: string;
    layout?: BoxLayout;
    srcYouSaveIconLeft?: string;
}

export const ClubExtendConfirmationLayoutYouSaveContainerItem = ({ captionPlus, captionYouSaveLabel, captionYouSavePriceLeft, captionYouSavePriceRight, layout, srcYouSaveIconLeft }: ClubExtendConfirmationLayoutYouSaveContainerItemProps) => {
    return (
        <Region
            name="you_save_container"
            layout={{ width: 285, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="you_save_label"
                layout={{ position: 'absolute', left: 0, width: 4, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionYouSaveLabel ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="you_save_price_left"
                layout={{ position: 'absolute', left: 150, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionYouSavePriceLeft ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="you_save_icon_left"
                src={srcYouSaveIconLeft}
                layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
            />
            <Region
                name="plus"
                layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionPlus ?? ' '}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Region
                name="you_save_price_right"
                layout={{ position: 'absolute', left: 220, width: 30, bottom: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionYouSavePriceRight ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Icon
                variant="0"
                name="you_save_icon_right"
                layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `total_amount_line` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutTotalAmountLineItemProps {
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutTotalAmountLineItem = ({ layout }: ClubExtendConfirmationLayoutTotalAmountLineItemProps) => {
    return (
        <Region
            name="total_amount_line"
            backgroundColor="#007a98"
            layout={{ width: 285, height: 3, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacer` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutSpacerItem = ({ layout }: ClubExtendConfirmationLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 100, height: 8, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `your_price_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutYourPriceContainerItemProps {
    captionPlus?: string;
    captionYourPriceLabel?: string;
    captionYourPricePriceLeft?: string;
    captionYourPricePriceRight?: string;
    layout?: BoxLayout;
    srcYourPriceIconLeft?: string;
}

export const ClubExtendConfirmationLayoutYourPriceContainerItem = ({ captionPlus, captionYourPriceLabel, captionYourPricePriceLeft, captionYourPricePriceRight, layout, srcYourPriceIconLeft }: ClubExtendConfirmationLayoutYourPriceContainerItemProps) => {
    return (
        <Region
            name="your_price_container"
            layout={{ width: 285, height: 31, flexShrink: 0, ...layout }}
        >
            <Region
                name="your_price_label"
                layout={{ position: 'absolute', left: 0, width: 4, bottom: 12, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionYourPriceLabel ?? ''}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="your_price_price_left"
                layout={{ position: 'absolute', left: 150, width: 30, bottom: 12, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionYourPricePriceLeft ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="your_price_icon_left"
                src={srcYourPriceIconLeft}
                layout={{ position: 'absolute', left: 180, width: 30, top: 0, height: 25 }}
            />
            <Region
                name="plus"
                layout={{ position: 'absolute', left: 212, width: 10, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionPlus ?? ' '}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Region
                name="your_price_price_right"
                layout={{ position: 'absolute', left: 220, width: 30, bottom: 12, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionYourPricePriceRight ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Icon
                variant="0"
                name="your_price_icon_right"
                layout={{ position: 'absolute', left: 255, width: 30, top: 0, height: 25 }}
            />
        </Region>
    );
};

/** Row template `offer_expiration` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutOfferExpirationItemProps {
    captionOfferExpiration?: string;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutOfferExpirationItem = ({ captionOfferExpiration, layout }: ClubExtendConfirmationLayoutOfferExpirationItemProps) => {
    return (
        <Region
            name="offer_expiration"
            layout={{ width: 244, height: 9, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOfferExpiration ?? ''}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 244 }}
            />
        </Region>
    );
};

/** Named region `maybe_later_region` of ClubExtendConfirmationLayout - configured through the parent's `maybeLaterRegion` prop. */
export interface ClubExtendConfirmationLayoutMaybeLaterRegionProps {
    captionMaybeLaterLink?: string;
    layout?: BoxLayout;
    onMaybeLaterRegion?: () => void;
}

export const ClubExtendConfirmationLayoutMaybeLaterRegion = ({ captionMaybeLaterLink, layout, onMaybeLaterRegion }: ClubExtendConfirmationLayoutMaybeLaterRegionProps) => {
    return (
        <Region
            name="maybe_later_region"
            onPointerTap={onMaybeLaterRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 5, top: 0, height: 32, ...layout }}
        >
            <Region
                name="maybe_later_link"
                layout={{ position: 'absolute', left: 0, top: 5, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMaybeLaterLink ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Row template `action_container` of ClubExtendConfirmationLayout - pass real rows through its `items…` slot. */
export interface ClubExtendConfirmationLayoutActionContainerItemProps {
    layout?: BoxLayout;
    maybeLaterRegion?: ClubExtendConfirmationLayoutMaybeLaterRegionProps;
    onBuyNowButton?: () => void;
}

export const ClubExtendConfirmationLayoutActionContainerItem = ({ layout, maybeLaterRegion, onBuyNowButton }: ClubExtendConfirmationLayoutActionContainerItemProps) => {
    return (
        <Region
            name="action_container"
            layout={{ width: 285, height: 40, flexShrink: 0, maxWidth: 285, ...layout }}
        >
            <ButtonThick
                variant="3"
                name="buy_now_button"
                onPointerTap={onBuyNowButton}
                layout={{ position: 'absolute', right: 0, width: 150, top: 0, height: 30, maxWidth: 150 }}
            />
            <ClubExtendConfirmationLayoutMaybeLaterRegion {...maybeLaterRegion} />
        </Region>
    );
};

/** Named region `itemlist_vertical` of ClubExtendConfirmationLayout - configured through the parent's `itemlistVertical` prop. */
export interface ClubExtendConfirmationLayoutItemlistVerticalProps {
    itemsItemlistVertical?: ReactNode;
    layout?: BoxLayout;
}

export const ClubExtendConfirmationLayoutItemlistVertical = ({ itemsItemlistVertical, layout }: ClubExtendConfirmationLayoutItemlistVerticalProps) => {
    return (
        <Region
            name="itemlist_vertical"
            layout={{ position: 'absolute', left: 140, width: 285, top: 25, height: 175, flexDirection: 'column', ...layout }}
        >
            {itemsItemlistVertical ?? (
                <>
                    <ClubExtendConfirmationLayoutExtendTitleItem />
                    <ClubExtendConfirmationLayoutNormalPriceContainerItem />
                    <ClubExtendConfirmationLayoutYouSaveContainerItem />
                    <ClubExtendConfirmationLayoutTotalAmountLineItem />
                    <ClubExtendConfirmationLayoutSpacerItem />
                    <ClubExtendConfirmationLayoutYourPriceContainerItem />
                    <ClubExtendConfirmationLayoutOfferExpirationItem />
                    <ClubExtendConfirmationLayoutActionContainerItem />
                </>
            )}
            <Region layout={{ width: 100, height: 10, flexShrink: 0 }} />
        </Region>
    );
};
