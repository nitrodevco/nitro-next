import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1066_rentable_bot_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentableBotViewLayoutProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onIgnore?: () => void;
    onIgnore2?: () => void;
    onMove?: () => void;
    onMove2?: () => void;
    onPick?: () => void;
    onPick2?: () => void;
    onRotate?: () => void;
    onRotate2?: () => void;
    onUnignore?: () => void;
    onUnignore2?: () => void;
    onWhisper?: () => void;
    onWhisper2?: () => void;
    srcHomeIcon?: string;
}

export const RentableBotViewLayout = ({ itemsInfostandElementList, layout, onClose, onIgnore, onIgnore2, onMove, onMove2, onPick, onPick2, onRotate, onRotate2, onUnignore, onUnignore2, onWhisper, onWhisper2, srcHomeIcon }: RentableBotViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="1"
                    name="info_border"
                    params={17}
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        params={17}
                        src={srcHomeIcon}
                        layout={{ position: 'absolute', left: 8, width: 16, top: 11, height: 15 }}
                    />
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
                        layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3 }}
                    >
                        {itemsInfostandElementList ?? (
                            <>
                                <RentableBotViewLayoutNameTextItem />
                                <RentableBotViewLayoutImagesSpacerItem />
                                <RentableBotViewLayoutDescriptionContainerItem />
                                <RentableBotViewLayoutHanditemSpacerItem />
                                <RentableBotViewLayoutHanditemTextItem />
                                <RentableBotViewLayoutDescriptionTextItem />
                                <RentableBotViewLayoutOwnerTextItem />
                            </>
                        )}
                    </Region>
                </Border>
                <Region
                    name="button_list"
                    params={16}
                    layout={{ width: 1800, height: 25, flexShrink: 0 }}
                >
                    <Region
                        name="whisper"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onWhisper}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="whisper"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onWhisper2}
                            layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.whisper')}
                        </Button>
                    </Region>
                    <Region
                        name="ignore"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onIgnore}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 110, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="ignore"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onIgnore2}
                            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.ignore')}
                        </Button>
                    </Region>
                    <Region
                        name="unignore"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onUnignore}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 220, width: 100, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="unignore"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onUnignore2}
                            layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.unignore')}
                        </Button>
                    </Region>
                    <Region
                        name="move"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onMove}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 330, width: 132, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="move"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onMove2}
                            layout={{ position: 'absolute', left: 0, width: 132, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.move')}
                        </Button>
                    </Region>
                    <Region
                        name="rotate"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onRotate}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 472, width: 139, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="rotate"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onRotate2}
                            layout={{ position: 'absolute', left: 0, width: 139, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.rotate')}
                        </Button>
                    </Region>
                    <Region
                        name="pick"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        onPointerTap={onPick}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 621, width: 137, top: 0, height: 25 }}
                    >
                        <Button
                            variant="1"
                            name="pick"
                            tags={[ 'CMD_BUTTON' ]}
                            params={131089}
                            onPointerTap={onPick2}
                            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
                        >
                            {t('infostand.button.pickup')}
                        </Button>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `name_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutNameTextItem = ({ captionNameText, layout }: RentableBotViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            params={146}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#3d3d3d"
        >
            <ThemeText
                text={captionNameText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
}

export const RentableBotViewLayoutImagesSpacerItem = ({ layout }: RentableBotViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            params={16}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `description_container` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionContainerItemProps {
    layout?: BoxLayout;
    onAvatarImageProfileLink?: () => void;
}

export const RentableBotViewLayoutDescriptionContainerItem = ({ layout, onAvatarImageProfileLink }: RentableBotViewLayoutDescriptionContainerItemProps) => {
    return (
        <Region
            name="description_container"
            params={16}
            backgroundColor="#6d6d6d"
            layout={{ width: 193, height: 132, flexShrink: 0, ...layout }}
        >
            <Border
                variant="0"
                name="grey_bg"
                params={16}
                tintColor="#666666"
                layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130 }}
            />
            <Region
                name="avatar_image_profile_link"
                params={17}
                onPointerTap={onAvatarImageProfileLink}
                cursor="pointer"
                layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('infostand_bot_info_bg.png')}
                    layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 127 }}
                />
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    params={3282}
                    options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                    layout={{ position: 'absolute', left: 16, width: 34, top: 21, height: 84 }}
                />
            </Region>
            <WidgetSlot
                widgetType="badge_image"
                name="badge"
                params={17}
                options={{ 'badge_image:badge_id': 'BOT', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 116, width: 42, top: 21, height: 42 }}
            />
        </Region>
    );
};

/** Row template `handitem_spacer` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemSpacerItemProps {
    layout?: BoxLayout;
}

export const RentableBotViewLayoutHanditemSpacerItem = ({ layout }: RentableBotViewLayoutHanditemSpacerItemProps) => {
    return (
        <Region
            name="handitem_spacer"
            params={16}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `handitem_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemTextItemProps {
    captionHanditemText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutHanditemTextItem = ({ captionHanditemText, layout }: RentableBotViewLayoutHanditemTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_text"
            params={16}
            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHanditemText ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `description_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionTextItemProps {
    captionDescriptionText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutDescriptionTextItem = ({ captionDescriptionText, layout }: RentableBotViewLayoutDescriptionTextItemProps) => {
    return (
        <Region
            name="description_text"
            params={16}
            layout={{ width: 170, height: 31, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescriptionText ?? ''}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `owner_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutOwnerTextItemProps {
    captionOwnerText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutOwnerTextItem = ({ captionOwnerText, layout }: RentableBotViewLayoutOwnerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="owner_text"
            params={16}
            layout={{ width: 126, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOwnerText ?? t('infostand.text.botowner')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
