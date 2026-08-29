import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `959_packagecard_new_xml` (layout "packagecard_new", 334x355) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewLayoutProps {
    elementList?: PackagecardNewLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardNewLayout = ({ elementList, layout, onClose }: PackagecardNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={164097}
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 334, height: 355, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    params={935952}
                    layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, width: 326, top: 0, bottom: 43, minWidth: 326, maxWidth: 380, maxHeight: 345 }}
                >
                    <PackagecardNewLayoutElementList {...elementList} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `top-spacer` of PackagecardNewLayout - configured through the parent's `topSpacer` prop. */
export interface PackagecardNewLayoutTopSpacerProps {
    layout?: BoxLayout;
}

export const PackagecardNewLayoutTopSpacer = ({ layout }: PackagecardNewLayoutTopSpacerProps) => {
    return (
        <Region
            name="top-spacer"
            params={16}
            layout={{ width: 300, height: 3, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `warning_icon_container` of PackagecardNewLayout - configured through the parent's `warningIconContainer` prop. */
export interface PackagecardNewLayoutWarningIconContainerProps {
    layout?: BoxLayout;
    srcWarningIcon?: string;
}

export const PackagecardNewLayoutWarningIconContainer = ({ layout, srcWarningIcon }: PackagecardNewLayoutWarningIconContainerProps) => {
    return (
        <Region
            name="warning_icon_container"
            params={3148816}
            layout={{ position: 'absolute', left: 0, width: 70, alignSelf: 'center', height: 50, maxWidth: 70, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="warning_icon"
                params={3932176}
                src={srcWarningIcon ?? layoutImage('catalogue_ui2_checkmark_m.png')}
                layout={{ position: 'absolute', width: 30, alignSelf: 'center', height: 24 }}
            />
        </Region>
    );
};

/** Named region `bottom-spacer` of PackagecardNewLayout - configured through the parent's `bottomSpacer` prop. */
export interface PackagecardNewLayoutBottomSpacerProps {
    layout?: BoxLayout;
}

export const PackagecardNewLayoutBottomSpacer = ({ layout }: PackagecardNewLayoutBottomSpacerProps) => {
    return (
        <Region
            name="bottom-spacer"
            params={16}
            layout={{ width: 300, height: 3, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `warning` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutWarningItemProps {
    bottomSpacer?: PackagecardNewLayoutBottomSpacerProps;
    captionWarningText?: string;
    layout?: BoxLayout;
    topSpacer?: PackagecardNewLayoutTopSpacerProps;
    warningIconContainer?: PackagecardNewLayoutWarningIconContainerProps;
}

export const PackagecardNewLayoutWarningItem = ({ bottomSpacer, captionWarningText, layout, topSpacer, warningIconContainer }: PackagecardNewLayoutWarningItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warning"
            params={8273936}
            layout={{ width: 306, height: 56, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="3"
                name="warning_background_border"
                params={4063248}
                tintColor="#000000"
                layout={{ position: 'absolute', width: 306, alignSelf: 'center', height: 56, justifyContent: 'center' }}
            >
                <Region
                    params={150736}
                    layout={{ position: 'absolute', alignSelf: 'center', flexDirection: 'column' }}
                >
                    <PackagecardNewLayoutTopSpacer {...topSpacer} />
                    <Border
                        variant="3"
                        name="warning_foreground_border"
                        params={4079632}
                        tintColor="#186e09"
                        layout={{ width: 300, height: 50, flexShrink: 0 }}
                    >
                        <Region
                            name="warning_text"
                            params={3296272}
                            layout={{ position: 'absolute', left: 65, width: 235, alignSelf: 'center', height: 30, minWidth: 235, maxWidth: 235, minHeight: 30, maxHeight: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionWarningText ?? t('gift.trusted.banner.text')}
                                textStyle="text-style-id-regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 235 }}
                            />
                        </Region>
                        <PackagecardNewLayoutWarningIconContainer {...warningIconContainer} />
                    </Border>
                    <PackagecardNewLayoutBottomSpacer {...bottomSpacer} />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `staff_image` of PackagecardNewLayout - configured through the parent's `staffImage` prop. */
export interface PackagecardNewLayoutStaffImageProps {
    layout?: BoxLayout;
    srcStaffImageBackground?: string;
    srcStaffImageForeground?: string;
}

export const PackagecardNewLayoutStaffImage = ({ layout, srcStaffImageBackground, srcStaffImageForeground }: PackagecardNewLayoutStaffImageProps) => {
    return (
        <Region
            name="staff_image"
            params={3932176}
            layout={{ position: 'absolute', width: 54, alignSelf: 'center', marginTop: -23, marginBottom: 23, height: 54, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="staff_image_background"
                params={3932176}
                src={srcStaffImageBackground ?? layoutImage('catalogue_giftcard_icon_bgstar.png')}
                layout={{ position: 'absolute', width: 54, alignSelf: 'center', height: 54 }}
            />
            <ThemeImage
                name="staff_image_foreground"
                params={3934224}
                src={srcStaffImageForeground ?? layoutImage('catalogue_giftcard_staff_icon.png')}
                layout={{ position: 'absolute', width: 34, top: 10, bottom: 10 }}
            />
        </Region>
    );
};

/** Named region `avatar_image_region` of PackagecardNewLayout - configured through the parent's `avatarImageRegion` prop. */
export interface PackagecardNewLayoutAvatarImageRegionProps {
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    srcAvatarImage?: string;
    staffImage?: PackagecardNewLayoutStaffImageProps;
}

export const PackagecardNewLayoutAvatarImageRegion = ({ layout, onAvatarImageRegion, srcAvatarImage, staffImage }: PackagecardNewLayoutAvatarImageRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatar_image_region"
            tooltip={t('widget.furni.present.sender.profile_tooltip')}
            params={3935441}
            onPointerTap={onAvatarImageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 140, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="avatar_image"
                params={16}
                src={srcAvatarImage}
                layout={{ position: 'absolute', left: 11, width: 37, top: 74, height: 48 }}
            />
            <PackagecardNewLayoutStaffImage {...staffImage} />
        </Region>
    );
};

/** Named region `avatar_image_container` of PackagecardNewLayout - configured through the parent's `avatarImageContainer` prop. */
export interface PackagecardNewLayoutAvatarImageContainerProps {
    avatarImageRegion?: PackagecardNewLayoutAvatarImageRegionProps;
    layout?: BoxLayout;
}

export const PackagecardNewLayoutAvatarImageContainer = ({ avatarImageRegion, layout }: PackagecardNewLayoutAvatarImageContainerProps) => {
    return (
        <Region
            name="avatar_image_container"
            params={3932176}
            layout={{ position: 'absolute', marginLeft: -117, marginRight: 117, width: 60, alignSelf: 'center', marginTop: -2.5, marginBottom: 2.5, height: 140, minWidth: 60, maxWidth: 60, minHeight: 140, maxHeight: 140, justifyContent: 'center', ...layout }}
        >
            <PackagecardNewLayoutAvatarImageRegion {...avatarImageRegion} />
        </Region>
    );
};

/** Row template `gift_card_container` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutGiftCardContainerItemProps {
    avatarImageContainer?: PackagecardNewLayoutAvatarImageContainerProps;
    captionMessageFrom?: string;
    captionMessageText?: string;
    layout?: BoxLayout;
    onMessageFrom?: () => void;
    srcGiftCard?: string;
}

export const PackagecardNewLayoutGiftCardContainerItem = ({ avatarImageContainer, captionMessageFrom, captionMessageText, layout, onMessageFrom, srcGiftCard }: PackagecardNewLayoutGiftCardContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="gift_card_container"
            params={13369360}
            layout={{ width: 306, height: 149, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="gift_card"
                params={16}
                src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                layout={{ position: 'absolute', left: 0, width: 306, top: 0, height: 149 }}
            />
            <PackagecardNewLayoutAvatarImageContainer {...avatarImageContainer} />
            <Region
                name="message_text"
                params={1}
                layout={{ position: 'absolute', left: 95, width: 190, top: 31, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessageText ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                />
            </Region>
            <Region
                name="message_from"
                tooltip={t('widget.furni.present.sender.profile_tooltip')}
                params={1}
                layout={{ position: 'absolute', left: 95, width: 190, top: 120, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                onPointerTap={onMessageFrom}
                cursor="pointer"
            >
                <ThemeText
                    text={captionMessageFrom ?? ''}
                    textStyle="text-style-u-italic"
                    textOptions={{ align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `open_gift_button` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutOpenGiftButtonItemProps {
    layout?: BoxLayout;
    onOpenGiftButton?: () => void;
}

export const PackagecardNewLayoutOpenGiftButtonItem = ({ layout, onOpenGiftButton }: PackagecardNewLayoutOpenGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="open_gift_button"
            params={147665}
            tintColor="#00aa00"
            onPointerTap={onOpenGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 328, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.open_gift')}
        </ButtonThick>
    );
};

/** Row template `give_gift_button` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutGiveGiftButtonItemProps {
    layout?: BoxLayout;
    onGiveGiftButton?: () => void;
}

export const PackagecardNewLayoutGiveGiftButtonItem = ({ layout, onGiveGiftButton }: PackagecardNewLayoutGiveGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="give_gift_button"
            params={131281}
            onPointerTap={onGiveGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 330, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.give_gift')}
        </Button>
    );
};

/** Row template `button_list` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardNewLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            params={12730385}
            layout={{ flexShrink: 0, minWidth: 330, maxWidth: 306, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardNewLayoutOpenGiftButtonItem />
                    <PackagecardNewLayoutGiveGiftButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `separator` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const PackagecardNewLayoutSeparatorItem = ({ layout }: PackagecardNewLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            params={3932176}
            layout={{ width: 306, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `element_list` of PackagecardNewLayout - configured through the parent's `elementList` prop. */
export interface PackagecardNewLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewLayoutElementList = ({ itemsElementList, layout }: PackagecardNewLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            params={12730385}
            layout={{ position: 'absolute', left: 10, top: 10, minWidth: 306, maxWidth: 306, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardNewLayoutWarningItem />
                    <PackagecardNewLayoutGiftCardContainerItem />
                    <PackagecardNewLayoutButtonListItem />
                    <PackagecardNewLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};
