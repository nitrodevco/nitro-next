import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `941_packagecard_info_xml` (layout "packagecard_new", 342x298) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardInfoLayoutProps {
    elementList?: PackagecardInfoLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardInfoLayout = ({ elementList, layout, onClose }: PackagecardInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 298, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: -2, width: 336, top: 0, height: 246, minWidth: 330, maxWidth: 380, justifyContent: 'center' }}>
                <PackagecardInfoLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};

/** Named region `avatar_image_region` of PackagecardInfoLayout - configured through the parent's `avatarImageRegion` prop. */
export interface PackagecardInfoLayoutAvatarImageRegionProps {
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    srcAvatarImage?: string;
}

export const PackagecardInfoLayoutAvatarImageRegion = ({ layout, onAvatarImageRegion, srcAvatarImage }: PackagecardInfoLayoutAvatarImageRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatar_image_region"
            tooltip={t('widget.furni.present.sender.profile_tooltip')}
            onPointerTap={onAvatarImageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 149, ...layout }}
        >
            <ThemeImage
                name="avatar_image"
                src={srcAvatarImage}
                layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 149 }}
            />
        </Region>
    );
};

/** Named region `avatar_image_container` of PackagecardInfoLayout - configured through the parent's `avatarImageContainer` prop. */
export interface PackagecardInfoLayoutAvatarImageContainerProps {
    avatarImageRegion?: PackagecardInfoLayoutAvatarImageRegionProps;
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutAvatarImageContainer = ({ avatarImageRegion, layout }: PackagecardInfoLayoutAvatarImageContainerProps) => {
    return (
        <Region
            name="avatar_image_container"
            layout={{ position: 'absolute', left: 15, width: 60, top: 5, height: 149, minWidth: 60, maxWidth: 60, minHeight: 149, maxHeight: 149, justifyContent: 'center', ...layout }}
        >
            <PackagecardInfoLayoutAvatarImageRegion {...avatarImageRegion} />
        </Region>
    );
};

/** Row template `gift_card_container` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutGiftCardContainerItemProps {
    avatarImageContainer?: PackagecardInfoLayoutAvatarImageContainerProps;
    captionMessageFrom?: string;
    captionMessageText?: string;
    layout?: BoxLayout;
    onMessageFrom?: () => void;
    srcGiftCard?: string;
}

export const PackagecardInfoLayoutGiftCardContainerItem = ({ avatarImageContainer, captionMessageFrom, captionMessageText, layout, onMessageFrom, srcGiftCard }: PackagecardInfoLayoutGiftCardContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="gift_card_container"
            layout={{ width: 330, height: 159, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="gift_card"
                src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                layout={{ position: 'absolute', left: 10, width: 306, top: 10, height: 149 }}
            />
            <PackagecardInfoLayoutAvatarImageContainer {...avatarImageContainer} />
            <Region
                name="message_text"
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
                layout={{ position: 'absolute', left: 95, width: 190, top: 123, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
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

/** Row template `open_gift_button` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutOpenGiftButtonItemProps {
    layout?: BoxLayout;
    onOpenGiftButton?: () => void;
}

export const PackagecardInfoLayoutOpenGiftButtonItem = ({ layout, onOpenGiftButton }: PackagecardInfoLayoutOpenGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="open_gift_button"
            tintColor="#00aa00"
            onPointerTap={onOpenGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 328, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.open_gift')}
        </ButtonThick>
    );
};

/** Row template `give_gift_button` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutGiveGiftButtonItemProps {
    layout?: BoxLayout;
    onGiveGiftButton?: () => void;
}

export const PackagecardInfoLayoutGiveGiftButtonItem = ({ layout, onGiveGiftButton }: PackagecardInfoLayoutGiveGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="give_gift_button"
            onPointerTap={onGiveGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 330, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.give_gift')}
        </Button>
    );
};

/** Row template `button_list` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardInfoLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, minWidth: 330, maxWidth: 360, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardInfoLayoutOpenGiftButtonItem />
                    <PackagecardInfoLayoutGiveGiftButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `separator` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutSeparatorItem = ({ layout }: PackagecardInfoLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 336, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `element_list` of PackagecardInfoLayout - configured through the parent's `elementList` prop. */
export interface PackagecardInfoLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardInfoLayoutElementList = ({ itemsElementList, layout }: PackagecardInfoLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', top: 0, minWidth: 330, maxWidth: 370, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardInfoLayoutGiftCardContainerItem />
                    <PackagecardInfoLayoutButtonListItem />
                    <PackagecardInfoLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};
