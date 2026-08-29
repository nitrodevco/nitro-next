import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1066_rentable_bot_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RentableBotViewLayoutProps {
    buttonList?: RentableBotViewLayoutButtonListProps;
    infostandElementList?: RentableBotViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcHomeIcon?: string;
}

export const RentableBotViewLayout = ({ buttonList, infostandElementList, layout, onClose, srcHomeIcon }: RentableBotViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        src={srcHomeIcon}
                        layout={{ position: 'absolute', left: 8, width: 16, top: 11, height: 15 }}
                    />
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <RentableBotViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <RentableBotViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};

/** Row template `name_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentableBotViewLayoutNameTextItem = ({ captionNameText, layout, tags }: RentableBotViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            tags={tags}
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
    tags?: string[];
}

export const RentableBotViewLayoutImagesSpacerItem = ({ layout, tags }: RentableBotViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `avatar_image_profile_link` of RentableBotViewLayout - configured through the parent's `avatarImageProfileLink` prop. */
export interface RentableBotViewLayoutAvatarImageProfileLinkProps {
    layout?: BoxLayout;
    onAvatarImageProfileLink?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutAvatarImageProfileLink = ({ layout, onAvatarImageProfileLink, tags }: RentableBotViewLayoutAvatarImageProfileLinkProps) => {
    return (
        <Region
            name="avatar_image_profile_link"
            tags={tags}
            onPointerTap={onAvatarImageProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('infostand_bot_info_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 127 }}
            />
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                layout={{ position: 'absolute', width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
            />
        </Region>
    );
};

/** Row template `description_container` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutDescriptionContainerItemProps {
    avatarImageProfileLink?: RentableBotViewLayoutAvatarImageProfileLinkProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentableBotViewLayoutDescriptionContainerItem = ({ avatarImageProfileLink, layout, tags }: RentableBotViewLayoutDescriptionContainerItemProps) => {
    return (
        <Region
            name="description_container"
            tags={tags}
            backgroundColor="#6d6d6d"
            layout={{ width: 193, height: 132, flexShrink: 0, ...layout }}
        >
            <Border
                variant="0"
                name="grey_bg"
                tintColor="#666666"
                layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130 }}
            />
            <RentableBotViewLayoutAvatarImageProfileLink {...avatarImageProfileLink} />
            <WidgetSlot
                widgetType="badge_image"
                name="badge"
                options={{ 'badge_image:badge_id': 'BOT', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 116, width: 42, top: 21, height: 42 }}
            />
        </Region>
    );
};

/** Row template `handitem_spacer` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RentableBotViewLayoutHanditemSpacerItem = ({ layout, tags }: RentableBotViewLayoutHanditemSpacerItemProps) => {
    return (
        <Region
            name="handitem_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `handitem_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutHanditemTextItemProps {
    captionHanditemText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentableBotViewLayoutHanditemTextItem = ({ captionHanditemText, layout, tags }: RentableBotViewLayoutHanditemTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_text"
            tags={tags}
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
    tags?: string[];
}

export const RentableBotViewLayoutDescriptionTextItem = ({ captionDescriptionText, layout, tags }: RentableBotViewLayoutDescriptionTextItemProps) => {
    return (
        <Region
            name="description_text"
            tags={tags}
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
    tags?: string[];
}

export const RentableBotViewLayoutOwnerTextItem = ({ captionOwnerText, layout, tags }: RentableBotViewLayoutOwnerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="owner_text"
            tags={tags}
            layout={{ width: 126, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOwnerText ?? t('infostand.text.botowner')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Named region `infostand_element_list` of RentableBotViewLayout - configured through the parent's `infostandElementList` prop. */
export interface RentableBotViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RentableBotViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout, tags }: RentableBotViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3, ...layout }}
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
    );
};

/** Named region `whisper` of RentableBotViewLayout - configured through the parent's `whisper` prop. */
export interface RentableBotViewLayoutWhisperProps {
    layout?: BoxLayout;
    onWhisper?: () => void;
    onWhisper2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutWhisper = ({ layout, onWhisper, onWhisper2, tags }: RentableBotViewLayoutWhisperProps) => {
    const t = useTranslation();

    return (
        <Region
            name="whisper"
            tags={tags}
            onPointerTap={onWhisper}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="whisper"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onWhisper2}
                layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.whisper')}
            </Button>
        </Region>
    );
};

/** Named region `ignore` of RentableBotViewLayout - configured through the parent's `ignore` prop. */
export interface RentableBotViewLayoutIgnoreProps {
    layout?: BoxLayout;
    onIgnore?: () => void;
    onIgnore2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutIgnore = ({ layout, onIgnore, onIgnore2, tags }: RentableBotViewLayoutIgnoreProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ignore"
            tags={tags}
            onPointerTap={onIgnore}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 100, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="ignore"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onIgnore2}
                layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.ignore')}
            </Button>
        </Region>
    );
};

/** Named region `unignore` of RentableBotViewLayout - configured through the parent's `unignore` prop. */
export interface RentableBotViewLayoutUnignoreProps {
    layout?: BoxLayout;
    onUnignore?: () => void;
    onUnignore2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutUnignore = ({ layout, onUnignore, onUnignore2, tags }: RentableBotViewLayoutUnignoreProps) => {
    const t = useTranslation();

    return (
        <Region
            name="unignore"
            tags={tags}
            onPointerTap={onUnignore}
            cursor="pointer"
            layout={{ position: 'absolute', left: 220, width: 100, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="unignore"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onUnignore2}
                layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.unignore')}
            </Button>
        </Region>
    );
};

/** Named region `move` of RentableBotViewLayout - configured through the parent's `move` prop. */
export interface RentableBotViewLayoutMoveProps {
    layout?: BoxLayout;
    onMove?: () => void;
    onMove2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutMove = ({ layout, onMove, onMove2, tags }: RentableBotViewLayoutMoveProps) => {
    const t = useTranslation();

    return (
        <Region
            name="move"
            tags={tags}
            onPointerTap={onMove}
            cursor="pointer"
            layout={{ position: 'absolute', left: 330, width: 132, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="move"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onMove2}
                layout={{ position: 'absolute', left: 0, width: 132, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.move')}
            </Button>
        </Region>
    );
};

/** Named region `rotate` of RentableBotViewLayout - configured through the parent's `rotate` prop. */
export interface RentableBotViewLayoutRotateProps {
    layout?: BoxLayout;
    onRotate?: () => void;
    onRotate2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutRotate = ({ layout, onRotate, onRotate2, tags }: RentableBotViewLayoutRotateProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rotate"
            tags={tags}
            onPointerTap={onRotate}
            cursor="pointer"
            layout={{ position: 'absolute', left: 472, width: 139, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="rotate"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onRotate2}
                layout={{ position: 'absolute', left: 0, width: 139, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.rotate')}
            </Button>
        </Region>
    );
};

/** Named region `pick` of RentableBotViewLayout - configured through the parent's `pick` prop. */
export interface RentableBotViewLayoutPickProps {
    layout?: BoxLayout;
    onPick?: () => void;
    onPick2?: () => void;
    tags?: string[];
}

export const RentableBotViewLayoutPick = ({ layout, onPick, onPick2, tags }: RentableBotViewLayoutPickProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick"
            tags={tags}
            onPointerTap={onPick}
            cursor="pointer"
            layout={{ position: 'absolute', left: 621, width: 137, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="pick"
                tags={[ 'CMD_BUTTON' ]}
                onPointerTap={onPick2}
                layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 25, minHeight: 22 }}
            >
                {t('infostand.button.pickup')}
            </Button>
        </Region>
    );
};

/** Named region `button_list` of RentableBotViewLayout - configured through the parent's `buttonList` prop. */
export interface RentableBotViewLayoutButtonListProps {
    ignore?: RentableBotViewLayoutIgnoreProps;
    layout?: BoxLayout;
    move?: RentableBotViewLayoutMoveProps;
    pick?: RentableBotViewLayoutPickProps;
    rotate?: RentableBotViewLayoutRotateProps;
    tags?: string[];
    unignore?: RentableBotViewLayoutUnignoreProps;
    whisper?: RentableBotViewLayoutWhisperProps;
}

export const RentableBotViewLayoutButtonList = ({ ignore, layout, move, pick, rotate, tags, unignore, whisper }: RentableBotViewLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            tags={tags}
            layout={{ width: 1800, height: 25, flexShrink: 0, ...layout }}
        >
            <RentableBotViewLayoutWhisper
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...whisper}
            />
            <RentableBotViewLayoutIgnore
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...ignore}
            />
            <RentableBotViewLayoutUnignore
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...unignore}
            />
            <RentableBotViewLayoutMove
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...move}
            />
            <RentableBotViewLayoutRotate
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...rotate}
            />
            <RentableBotViewLayoutPick
                tags={[ 'CMD_BUTTON_REGION' ]}
                {...pick}
            />
        </Region>
    );
};
