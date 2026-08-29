import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `835_packagecard_new_opened_xml` (layout "packagecard_new_opened", 342x360) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewOpenedLayoutProps {
    elementList?: PackagecardNewOpenedLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardNewOpenedLayout = ({ elementList, layout, onClose }: PackagecardNewOpenedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 360, ...layout }}
        >
            <Region
                backgroundColor="#e9e9e9"
                layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305 }}
            >
                <PackagecardNewOpenedLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};

/** Row template `image_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutImageContainerItemProps {
    layout?: BoxLayout;
    srcGiftImage?: string;
    srcImageBg?: string;
}

export const PackagecardNewOpenedLayoutImageContainerItem = ({ layout, srcGiftImage, srcImageBg }: PackagecardNewOpenedLayoutImageContainerItemProps) => {
    return (
        <Region
            name="image_container"
            layout={{ width: 81, height: 81, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image_bg"
                src={srcImageBg}
                layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
            />
            <ThemeImage
                name="gift_image"
                src={srcGiftImage}
                layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
            />
        </Region>
    );
};

/** Row template `message_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutMessageContainerItemProps {
    captionGiftMessage?: string;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutMessageContainerItem = ({ captionGiftMessage, layout }: PackagecardNewOpenedLayoutMessageContainerItemProps) => {
    return (
        <Region
            name="message_container"
            layout={{ width: 184, height: 81, flexShrink: 0, ...layout }}
        >
            <Region
                name="gift_message"
                layout={{ position: 'absolute', left: 0, width: 184, top: 20, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGiftMessage ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 184 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `message_element_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutMessageElementListItemProps {
    itemsMessageElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutMessageElementListItem = ({ itemsMessageElementList, layout }: PackagecardNewOpenedLayoutMessageElementListItemProps) => {
    return (
        <Region
            name="message_element_list"
            layout={{ width: 275, height: 100, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsMessageElementList ?? (
                <>
                    <PackagecardNewOpenedLayoutImageContainerItem />
                    <PackagecardNewOpenedLayoutMessageContainerItem />
                </>
            )}
        </Region>
    );
};

/** Row template `keep_in_room_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutKeepInRoomButtonItemProps {
    layout?: BoxLayout;
    onKeepInRoomButton?: () => void;
}

export const PackagecardNewOpenedLayoutKeepInRoomButtonItem = ({ layout, onKeepInRoomButton }: PackagecardNewOpenedLayoutKeepInRoomButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="keep_in_room_button"
            onPointerTap={onKeepInRoomButton}
            layout={{ width: 224, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.keep_in_room')}
        </ButtonThick>
    );
};

/** Row template `place_in_room_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutPlaceInRoomButtonItemProps {
    layout?: BoxLayout;
    onPlaceInRoomButton?: () => void;
}

export const PackagecardNewOpenedLayoutPlaceInRoomButtonItem = ({ layout, onPlaceInRoomButton }: PackagecardNewOpenedLayoutPlaceInRoomButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="place_in_room_button"
            onPointerTap={onPlaceInRoomButton}
            layout={{ width: 226, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.place_in_room')}
        </ButtonThick>
    );
};

/** Row template `put_in_inventory_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutPutInInventoryButtonItemProps {
    layout?: BoxLayout;
    onPutInInventoryButton?: () => void;
}

export const PackagecardNewOpenedLayoutPutInInventoryButtonItem = ({ layout, onPutInInventoryButton }: PackagecardNewOpenedLayoutPutInInventoryButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="put_in_inventory_button"
            onPointerTap={onPutInInventoryButton}
            layout={{ width: 230, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.put_in_inventory')}
        </Button>
    );
};

/** Row template `separator` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutSeparatorItem = ({ layout }: PackagecardNewOpenedLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            layout={{ width: 336, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `button_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardNewOpenedLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardNewOpenedLayoutKeepInRoomButtonItem />
                    <PackagecardNewOpenedLayoutPlaceInRoomButtonItem />
                    <PackagecardNewOpenedLayoutPutInInventoryButtonItem />
                    <PackagecardNewOpenedLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};

/** Named region `avatar_image_region` of PackagecardNewOpenedLayout - configured through the parent's `avatarImageRegion` prop. */
export interface PackagecardNewOpenedLayoutAvatarImageRegionProps {
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    srcAvatarImage?: string;
}

export const PackagecardNewOpenedLayoutAvatarImageRegion = ({ layout, onAvatarImageRegion, srcAvatarImage }: PackagecardNewOpenedLayoutAvatarImageRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatar_image_region"
            tooltip={t('widget.furni.present.sender.profile_tooltip')}
            onPointerTap={onAvatarImageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', width: 45, alignSelf: 'center', height: 45, ...layout }}
        >
            <ThemeImage
                name="avatar_image"
                src={srcAvatarImage}
                layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `avatar_image_container` of PackagecardNewOpenedLayout - configured through the parent's `avatarImageContainer` prop. */
export interface PackagecardNewOpenedLayoutAvatarImageContainerProps {
    avatarImageRegion?: PackagecardNewOpenedLayoutAvatarImageRegionProps;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutAvatarImageContainer = ({ avatarImageRegion, layout }: PackagecardNewOpenedLayoutAvatarImageContainerProps) => {
    return (
        <Region
            name="avatar_image_container"
            layout={{ position: 'absolute', right: 1, width: 45, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 45, justifyContent: 'center', ...layout }}
        >
            <PackagecardNewOpenedLayoutAvatarImageRegion {...avatarImageRegion} />
        </Region>
    );
};

/** Row template `give_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutGiveContainerItemProps {
    avatarImageContainer?: PackagecardNewOpenedLayoutAvatarImageContainerProps;
    layout?: BoxLayout;
    onGiveContainer?: () => void;
    onGiveGiftButton?: () => void;
}

export const PackagecardNewOpenedLayoutGiveContainerItem = ({ avatarImageContainer, layout, onGiveContainer, onGiveGiftButton }: PackagecardNewOpenedLayoutGiveContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_container"
            backgroundColor="#96a4a5"
            onPointerTap={onGiveContainer}
            cursor="pointer"
            layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336, justifyContent: 'center', ...layout }}
        >
            <ButtonThick
                variant="5"
                name="give_gift_button"
                tintColor="#00aa00"
                onPointerTap={onGiveGiftButton}
                layout={{ position: 'absolute', marginLeft: -45, marginRight: 45, width: 246, alignSelf: 'center', marginTop: -21, marginBottom: 21, height: 28, minWidth: 246, maxWidth: 330 }}
            >
                {t('widget.furni.present.give_gift')}
            </ButtonThick>
            <PackagecardNewOpenedLayoutAvatarImageContainer {...avatarImageContainer} />
        </Region>
    );
};

/** Row template `give_element_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutGiveElementListItemProps {
    itemsGiveElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutGiveElementListItem = ({ itemsGiveElementList, layout }: PackagecardNewOpenedLayoutGiveElementListItemProps) => {
    return (
        <Region
            name="give_element_list"
            layout={{ flexShrink: 0, minWidth: 336, maxWidth: 336, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsGiveElementList ?? (
                <PackagecardNewOpenedLayoutGiveContainerItem />
            )}
        </Region>
    );
};

/** Named region `element_list` of PackagecardNewOpenedLayout - configured through the parent's `elementList` prop. */
export interface PackagecardNewOpenedLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutElementList = ({ itemsElementList, layout }: PackagecardNewOpenedLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <PackagecardNewOpenedLayoutMessageElementListItem />
                    <PackagecardNewOpenedLayoutButtonListItem />
                    <PackagecardNewOpenedLayoutGiveElementListItem />
                </>
            )}
        </Region>
    );
};
