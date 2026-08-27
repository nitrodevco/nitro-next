import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `835_packagecard_new_opened_xml` (layout "packagecard_new_opened", 342x360) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewOpenedLayoutProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PackagecardNewOpenedLayout = ({ itemsElementList, layout, onClose }: PackagecardNewOpenedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 360, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={147472}
                    backgroundColor="#e9e9e9"
                    layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305 }}
                >
                    <Region
                        name="element_list"
                        params={4341777}
                        layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305, flexDirection: 'column', gap: 10 }}
                    >
                        {itemsElementList ?? (
                            <>
                                <PackagecardNewOpenedLayoutMessageElementListItem />
                                <PackagecardNewOpenedLayoutButtonListItem />
                                <PackagecardNewOpenedLayoutGiveElementListItem />
                            </>
                        )}
                    </Region>
                </Region>
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
            params={12582928}
            layout={{ width: 81, height: 81, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="image_bg"
                params={16}
                src={srcImageBg}
                layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
            />
            <ThemeImage
                name="gift_image"
                params={16}
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
            params={16515088}
            layout={{ width: 184, height: 81, flexShrink: 0, ...layout }}
        >
            <Region
                name="gift_message"
                params={16}
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
            params={4194321}
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
            params={12714001}
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
            params={12714001}
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
            params={12714001}
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
            params={16}
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
            params={16662545}
            layout={{ width: 336, height: 115, flexShrink: 0, flexDirection: 'column', gap: 10, ...layout }}
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

/** Row template `give_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutGiveContainerItemProps {
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    onGiveGiftButton?: () => void;
    srcAvatarImage?: string;
}

export const PackagecardNewOpenedLayoutGiveContainerItem = ({ layout, onAvatarImageRegion, onGiveGiftButton, srcAvatarImage }: PackagecardNewOpenedLayoutGiveContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_container"
            params={16401}
            backgroundColor="#96a4a5"
            layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336, ...layout }}
        >
            <ButtonThick
                variant="5"
                name="give_gift_button"
                params={16649425}
                tintColor="#00aa00"
                onPointerTap={onGiveGiftButton}
                layout={{ position: 'absolute', left: 0, width: 246, top: 0, height: 28, minWidth: 246, maxWidth: 330 }}
            >
                {t('widget.furni.present.give_gift')}
            </ButtonThick>
            <Region
                name="avatar_image_container"
                params={3407888}
                layout={{ position: 'absolute', left: 290, width: 45, top: 13, height: 45 }}
            >
                <Region
                    name="avatar_image_region"
                    tooltip={t('widget.furni.present.sender.profile_tooltip')}
                    params={3935441}
                    onPointerTap={onAvatarImageRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
                >
                    <ThemeImage
                        name="avatar_image"
                        params={16}
                        src={srcAvatarImage}
                        layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
                    />
                </Region>
            </Region>
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
            params={16662545}
            layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsGiveElementList ?? (
                <PackagecardNewOpenedLayoutGiveContainerItem />
            )}
        </Region>
    );
};
