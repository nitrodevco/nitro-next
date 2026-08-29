import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `995_user_view_xml` (layout "userview_test", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserViewLayoutProps {
    infostandElementList?: UserViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcHomeIcon?: string;
    srcStickerCroco?: string;
}

export const UserViewLayout = ({ infostandElementList, layout, onClose, srcHomeIcon, srcStickerCroco }: UserViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 357, flexShrink: 0 }}
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
                    <ThemeImage
                        name="sticker_croco"
                        src={srcStickerCroco ?? layoutImage('sticker_croco.png')}
                        layout={{ position: 'absolute', left: 2, width: 92, top: 64, height: 63 }}
                    />
                    <UserViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `profile_link` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutProfileLinkItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    tags?: string[];
}

export const UserViewLayoutProfileLinkItem = ({ captionNameText, layout, onProfileLink, tags }: UserViewLayoutProfileLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="profile_link"
            tags={tags}
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ width: 135, height: 12, flexShrink: 0, ...layout }}
        >
            <Region
                name="name_text"
                layout={{ position: 'absolute', left: 0, right: 131, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#3d3d3d"
            >
                <ThemeText
                    text={captionNameText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `images_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutImagesSpacerItem = ({ layout, tags }: UserViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `avatar_image_profile_link` of UserViewLayout - configured through the parent's `avatarImageProfileLink` prop. */
export interface UserViewLayoutAvatarImageProfileLinkProps {
    layout?: BoxLayout;
    onAvatarImageProfileLink?: () => void;
    tags?: string[];
}

export const UserViewLayoutAvatarImageProfileLink = ({ layout, onAvatarImageProfileLink, tags }: UserViewLayoutAvatarImageProfileLinkProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatar_image_profile_link"
            tags={tags}
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onAvatarImageProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 17, width: 66, top: 2, height: 127, justifyContent: 'center', ...layout }}
        >
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                visible={false}
                options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                layout={{ position: 'absolute', width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
            />
        </Region>
    );
};

/** Row template `image_and_badges_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutImageAndBadgesContainerItemProps {
    avatarImageProfileLink?: UserViewLayoutAvatarImageProfileLinkProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutImageAndBadgesContainerItem = ({ avatarImageProfileLink, layout, tags }: UserViewLayoutImageAndBadgesContainerItemProps) => {
    return (
        <Region
            name="image_and_badges_container"
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
            <UserViewLayoutAvatarImageProfileLink {...avatarImageProfileLink} />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_0"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 1, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_group"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 1, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_1"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 44, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_2"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 44, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_3"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 87, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_4"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 87, height: 42 }}
            />
        </Region>
    );
};

/** Row template `motto_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutMottoSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutMottoSpacerItem = ({ layout, tags }: UserViewLayoutMottoSpacerItemProps) => {
    return (
        <Region
            name="motto_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `motto_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutMottoContainerItemProps {
    layout?: BoxLayout;
    srcChangemottoImage?: string;
    tags?: string[];
}

export const UserViewLayoutMottoContainerItem = ({ layout, srcChangemottoImage, tags }: UserViewLayoutMottoContainerItemProps) => {
    const [ mottoTextValue, setMottoTextValue ] = useState('');

    return (
        <Border
            variant="0"
            name="motto_container"
            tags={tags}
            tintColor="#666666"
            layout={{ width: 170, height: 57, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="changemotto.image"
                src={srcChangemottoImage ?? layoutImage('common_small_pen.png')}
                layout={{ position: 'absolute', left: 3, width: 17, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 18 }}
            />
            <TextInput
                value={mottoTextValue}
                onChange={setMottoTextValue}
                maxLength={38}
                textColor="#ffffff"
                layout={{ position: 'absolute', left: 20, width: 140, top: 2, height: 53 }}
            />
        </Border>
    );
};

/** Row template `badges_rank_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBadgesRankSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleBadgesRankSpacer?: boolean;
}

export const UserViewLayoutBadgesRankSpacerItem = ({ layout, tags, visibleBadgesRankSpacer }: UserViewLayoutBadgesRankSpacerItemProps) => {
    return (
        <Region
            name="badges_rank_spacer"
            tags={tags}
            visible={visibleBadgesRankSpacer ?? false}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `badges_rank_region` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBadgesRankRegionItemProps {
    captionBadgesRankText?: string;
    layout?: BoxLayout;
    onBadgesRankRegion?: () => void;
    tags?: string[];
    visibleBadgesRankRegion?: boolean;
}

export const UserViewLayoutBadgesRankRegionItem = ({ captionBadgesRankText, layout, onBadgesRankRegion, tags, visibleBadgesRankRegion }: UserViewLayoutBadgesRankRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badges_rank_region"
            tags={tags}
            visible={visibleBadgesRankRegion ?? false}
            onPointerTap={onBadgesRankRegion}
            cursor="pointer"
            layout={{ width: 170, height: 15, flexShrink: 0, ...layout }}
        >
            <Region
                name="badges_rank_text"
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBadgesRankText ?? t('infostand.text.badges_rank')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `score_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleScoreSpacer?: boolean;
}

export const UserViewLayoutScoreSpacerItem = ({ layout, tags, visibleScoreSpacer }: UserViewLayoutScoreSpacerItemProps) => {
    return (
        <Region
            name="score_spacer"
            tags={tags}
            visible={visibleScoreSpacer ?? false}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `score_text` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreTextItemProps {
    captionScoreText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutScoreTextItem = ({ captionScoreText, layout, tags }: UserViewLayoutScoreTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="score_text"
            tags={tags}
            visible={false}
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionScoreText ?? t('infostand.text.achievement_score')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `score_value` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreValueItemProps {
    captionScoreValue?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutScoreValueItem = ({ captionScoreValue, layout, tags }: UserViewLayoutScoreValueItemProps) => {
    return (
        <Region
            name="score_value"
            tags={tags}
            visible={false}
            layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionScoreValue ?? ''}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `handitem_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHanditemSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleHanditemSpacer?: boolean;
}

export const UserViewLayoutHanditemSpacerItem = ({ layout, tags, visibleHanditemSpacer }: UserViewLayoutHanditemSpacerItemProps) => {
    return (
        <Region
            name="handitem_spacer"
            tags={tags}
            visible={visibleHanditemSpacer ?? false}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `handitem_txt` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHanditemTxtItemProps {
    captionHanditemTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutHanditemTxtItem = ({ captionHanditemTxt, layout, tags }: UserViewLayoutHanditemTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_txt"
            tags={tags}
            visible={false}
            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHanditemTxt ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Row template `generic_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutGenericSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutGenericSpacerItem = ({ layout, tags }: UserViewLayoutGenericSpacerItemProps) => {
    return (
        <Region
            name="generic_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `heart_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHeartRandomusernameItemProps {
    captionHeartRandomusername?: string;
    layout?: BoxLayout;
    onHeartRandomusername?: () => void;
    tags?: string[];
}

export const UserViewLayoutHeartRandomusernameItem = ({ captionHeartRandomusername, layout, onHeartRandomusername, tags }: UserViewLayoutHeartRandomusernameItemProps) => {
    return (
        <Region
            name="heart_randomusername"
            tags={tags}
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onHeartRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionHeartRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `heart_others` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHeartOthersItemProps {
    captionHeartOthers?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutHeartOthersItem = ({ captionHeartOthers, layout, tags }: UserViewLayoutHeartOthersItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="heart_others"
            tags={tags}
            layout={{ width: 170, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHeartOthers ?? t('infostand.relstatus.heart.others')}
                textStyle="text-style-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `relationship_heart` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipHeartItemProps {
    itemsRelationshipHeart?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutRelationshipHeartItem = ({ itemsRelationshipHeart, layout, tags }: UserViewLayoutRelationshipHeartItemProps) => {
    return (
        <Region
            name="relationship_heart"
            tags={tags}
            visible={false}
            layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsRelationshipHeart ?? (
                <>
                    <UserViewLayoutHeartRandomusernameItem />
                    <UserViewLayoutHeartOthersItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('relationship_status_heart.png')}
                layout={{ width: 17, height: 14, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Row template `smile_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutSmileRandomusernameItemProps {
    captionSmileRandomusername?: string;
    layout?: BoxLayout;
    onSmileRandomusername?: () => void;
    tags?: string[];
}

export const UserViewLayoutSmileRandomusernameItem = ({ captionSmileRandomusername, layout, onSmileRandomusername, tags }: UserViewLayoutSmileRandomusernameItemProps) => {
    return (
        <Region
            name="smile_randomusername"
            tags={tags}
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onSmileRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionSmileRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `smile_others` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutSmileOthersItemProps {
    captionSmileOthers?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutSmileOthersItem = ({ captionSmileOthers, layout, tags }: UserViewLayoutSmileOthersItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="smile_others"
            tags={tags}
            layout={{ width: 166, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionSmileOthers ?? t('infostand.relstatus.smile.others')}
                textStyle="text-style-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `relationship_smile` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipSmileItemProps {
    itemsRelationshipSmile?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutRelationshipSmileItem = ({ itemsRelationshipSmile, layout, tags }: UserViewLayoutRelationshipSmileItemProps) => {
    return (
        <Region
            name="relationship_smile"
            tags={tags}
            visible={false}
            layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsRelationshipSmile ?? (
                <>
                    <UserViewLayoutSmileRandomusernameItem />
                    <UserViewLayoutSmileOthersItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('relationship_status_smile.png')}
                layout={{ width: 17, height: 14, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Row template `bobba_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBobbaRandomusernameItemProps {
    captionBobbaRandomusername?: string;
    layout?: BoxLayout;
    onBobbaRandomusername?: () => void;
    tags?: string[];
}

export const UserViewLayoutBobbaRandomusernameItem = ({ captionBobbaRandomusername, layout, onBobbaRandomusername, tags }: UserViewLayoutBobbaRandomusernameItemProps) => {
    return (
        <Region
            name="bobba_randomusername"
            tags={tags}
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onBobbaRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionBobbaRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `bobba_others` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBobbaOthersItemProps {
    captionBobbaOthers?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutBobbaOthersItem = ({ captionBobbaOthers, layout, tags }: UserViewLayoutBobbaOthersItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bobba_others"
            tags={tags}
            layout={{ width: 172, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBobbaOthers ?? t('infostand.relstatus.bobba.others')}
                textStyle="text-style-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `relationship_bobba` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipBobbaItemProps {
    itemsRelationshipBobba?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutRelationshipBobbaItem = ({ itemsRelationshipBobba, layout, tags }: UserViewLayoutRelationshipBobbaItemProps) => {
    return (
        <Region
            name="relationship_bobba"
            tags={tags}
            visible={false}
            layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsRelationshipBobba ?? (
                <>
                    <UserViewLayoutBobbaRandomusernameItem />
                    <UserViewLayoutBobbaOthersItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('relationship_status_bobba.png')}
                layout={{ width: 17, height: 14, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Row template `relationship_status_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipStatusContainerItemProps {
    itemsRelationshipStatusContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutRelationshipStatusContainerItem = ({ itemsRelationshipStatusContainer, layout, tags }: UserViewLayoutRelationshipStatusContainerItemProps) => {
    return (
        <Region
            name="relationship_status_container"
            tags={tags}
            layout={{ width: 170, height: 55, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsRelationshipStatusContainer ?? (
                <>
                    <UserViewLayoutRelationshipHeartItem />
                    <UserViewLayoutRelationshipSmileItem />
                    <UserViewLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};

/** Named region `infostand_element_list` of UserViewLayout - configured through the parent's `infostandElementList` prop. */
export interface UserViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout, tags }: UserViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 277, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <UserViewLayoutProfileLinkItem />
                    <UserViewLayoutImagesSpacerItem />
                    <UserViewLayoutImageAndBadgesContainerItem />
                    <UserViewLayoutMottoSpacerItem />
                    <UserViewLayoutMottoContainerItem />
                    <UserViewLayoutBadgesRankSpacerItem />
                    <UserViewLayoutBadgesRankRegionItem />
                    <UserViewLayoutScoreSpacerItem />
                    <UserViewLayoutScoreTextItem />
                    <UserViewLayoutScoreValueItem />
                    <UserViewLayoutHanditemSpacerItem />
                    <UserViewLayoutHanditemTxtItem />
                    <UserViewLayoutGenericSpacerItem />
                    <UserViewLayoutRelationshipStatusContainerItem />
                </>
            )}
        </Region>
    );
};
