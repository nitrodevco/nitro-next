import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1194_new_extended_profile_xml` (layout "new_extended_profile", 521x537) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewExtendedProfileLayoutProps {
    blockedContainer?: NewExtendedProfileLayoutBlockedContainerProps;
    bottomContainer?: NewExtendedProfileLayoutBottomContainerProps;
    layout?: BoxLayout;
    middle?: NewExtendedProfileLayoutMiddleProps;
    onBlockButton?: () => void;
    onClose?: () => void;
    spacer?: NewExtendedProfileLayoutSpacerProps;
    spacer2?: NewExtendedProfileLayoutSpacer5Props;
    top?: NewExtendedProfileLayoutTopProps;
}

export const NewExtendedProfileLayout = ({ blockedContainer, bottomContainer, layout, middle, onBlockButton, onClose, spacer, spacer2, top }: NewExtendedProfileLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('extendedprofile.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 521, height: 537, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 6, width: 500, top: -1, height: 495, flexDirection: 'column', gap: 6 }}>
                    <NewExtendedProfileLayoutTop {...top} />
                    <NewExtendedProfileLayoutSpacer {...spacer} />
                    <NewExtendedProfileLayoutMiddle {...middle} />
                    <NewExtendedProfileLayoutSpacer5 {...spacer2} />
                    <NewExtendedProfileLayoutBottomContainer {...bottomContainer} />
                </Region>
                <ContainerButton
                    variant="7"
                    name="block_button"
                    dynamicStyle="button"
                    onPointerTap={onBlockButton}
                    layout={{ position: 'absolute', left: 481, width: 24, top: 4, height: 24 }}
                >
                    <ThemeImage
                        src={layoutImage('extended_profile_block_icon.png')}
                        layout={{ position: 'absolute', left: 4, width: 16, top: 4, height: 16 }}
                    />
                </ContainerButton>
                <NewExtendedProfileLayoutBlockedContainer {...blockedContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `avatar` of NewExtendedProfileLayout - configured through the parent's `avatar` prop. */
export interface NewExtendedProfileLayoutAvatarProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutAvatar = ({ layout }: NewExtendedProfileLayoutAvatarProps) => {
    return (
        <Region
            name="avatar"
            layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 113, ...layout }}
        >
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_image"
                options={{ 'avatar_image:cropped': 'true' }}
                layout={{ position: 'absolute', right: 12, width: 34, bottom: 29, height: 84 }}
            />
        </Region>
    );
};

/** Row template `user_name` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserNameItemProps {
    captionUserName?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserNameItem = ({ captionUserName, layout }: NewExtendedProfileLayoutUserNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_name"
            layout={{ width: 141, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionUserName ?? t('extendedprofile.username')} />
        </Region>
    );
};

/** Row template `motto_txt` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutMottoTxtItemProps {
    captionMottoTxt?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutMottoTxtItem = ({ captionMottoTxt, layout }: NewExtendedProfileLayoutMottoTxtItemProps) => {
    return (
        <Region
            name="motto_txt"
            layout={{ width: 200, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMottoTxt ?? ''}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
            />
        </Region>
    );
};

/** Row template `user_created` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserCreatedItemProps {
    captionUserCreated?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserCreatedItem = ({ captionUserCreated, layout }: NewExtendedProfileLayoutUserCreatedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_created"
            layout={{ width: 129, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionUserCreated ?? t('extendedprofile.created')} />
        </Region>
    );
};

/** Row template `user_activity_points` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserActivityPointsItemProps {
    captionUserActivityPoints?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserActivityPointsItem = ({ captionUserActivityPoints, layout }: NewExtendedProfileLayoutUserActivityPointsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_activity_points"
            visible={false}
            layout={{ width: 161, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionUserActivityPoints ?? t('extendedprofile.activitypoints')} />
        </Region>
    );
};

/** Row template `user_last_login` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserLastLoginItemProps {
    captionUserLastLogin?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserLastLoginItem = ({ captionUserLastLogin, layout }: NewExtendedProfileLayoutUserLastLoginItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_last_login"
            layout={{ width: 137, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionUserLastLogin ?? t('extendedprofile.last.login')} />
        </Region>
    );
};

/** Row template `online_offline_container` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutOnlineOfflineContainerItemProps {
    layout?: BoxLayout;
    srcHiddenIcon?: string;
    srcOfflineIcon?: string;
    srcOnlineIcon?: string;
}

export const NewExtendedProfileLayoutOnlineOfflineContainerItem = ({ layout, srcHiddenIcon, srcOfflineIcon, srcOnlineIcon }: NewExtendedProfileLayoutOnlineOfflineContainerItemProps) => {
    return (
        <Region
            name="online_offline_container"
            layout={{ width: 40, height: 23, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="offline_icon"
                src={srcOfflineIcon ?? '${image.library.url}guilds/offline_icon.png'}
                layout={{ position: 'absolute', left: 0, width: 40, top: 3, height: 18 }}
            />
            <ThemeImage
                name="online_icon"
                src={srcOnlineIcon ?? '${image.library.url}guilds/online_icon.png'}
                layout={{ position: 'absolute', left: 1, width: 37, top: 3, height: 18 }}
            />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 40, top: 3, height: 18 }}
            >
                <ThemeImage
                    name="hidden_icon"
                    src={srcHiddenIcon ?? '${image.library.url}guilds/hidden_icon.png'}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 3, height: 18 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `friendstatus` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutFriendstatusItemProps {
    captionFriendRequestSentTxt?: string;
    captionStatusTxt?: string;
    layout?: BoxLayout;
    onAddasfriendButton?: () => void;
    visibleAddasfriendButton?: boolean;
    visibleOkIcon?: boolean;
}

export const NewExtendedProfileLayoutFriendstatusItem = ({ captionFriendRequestSentTxt, captionStatusTxt, layout, onAddasfriendButton, visibleAddasfriendButton, visibleOkIcon }: NewExtendedProfileLayoutFriendstatusItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friendstatus"
            layout={{ width: 140, height: 23, flexShrink: 0, maxWidth: 140, minHeight: 23, maxHeight: 23, ...layout }}
        >
            <Region
                visible={visibleOkIcon ?? false}
                layout={{ position: 'absolute', left: 0, width: 16, top: 5, height: 16 }}
            >
                <Icon
                    variant="8"
                    name="ok_icon"
                    tintColor="#3ce600"
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Region
                name="status_txt"
                visible={false}
                layout={{ position: 'absolute', left: 16, width: 132, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusTxt ?? t('extendedprofile.friend')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="friend_request_sent_txt"
                layout={{ position: 'absolute', left: 0, width: 189, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFriendRequestSentTxt ?? t('extendedprofile.friendrequestsent')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                visible={visibleAddasfriendButton ?? false}
                layout={{ position: 'absolute', left: 12, width: 105, top: 0, height: 23, minWidth: 105, maxWidth: 105 }}
            >
                <Button
                    variant="3"
                    name="addasfriend_button"
                    onPointerTap={onAddasfriendButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('extendedprofile.addasafriend')}
                </Button>
            </Region>
        </Region>
    );
};

/** Row template `status` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutStatusItemProps {
    itemsStatus?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutStatusItem = ({ itemsStatus, layout }: NewExtendedProfileLayoutStatusItemProps) => {
    return (
        <Region
            name="status"
            layout={{ width: 198, height: 27, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsStatus ?? (
                <>
                    <NewExtendedProfileLayoutOnlineOfflineContainerItem />
                    <NewExtendedProfileLayoutFriendstatusItem />
                </>
            )}
        </Region>
    );
};

/** Named region `user_info` of NewExtendedProfileLayout - configured through the parent's `userInfo` prop. */
export interface NewExtendedProfileLayoutUserInfoProps {
    itemsUserInfo?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserInfo = ({ itemsUserInfo, layout }: NewExtendedProfileLayoutUserInfoProps) => {
    return (
        <Region
            name="user_info"
            layout={{ position: 'absolute', left: 56, width: 200, top: -4, height: 118, flexDirection: 'column', ...layout }}
        >
            {itemsUserInfo ?? (
                <>
                    <NewExtendedProfileLayoutUserNameItem />
                    <NewExtendedProfileLayoutMottoTxtItem />
                    <NewExtendedProfileLayoutUserCreatedItem />
                    <NewExtendedProfileLayoutUserActivityPointsItem />
                    <NewExtendedProfileLayoutUserLastLoginItem />
                    <NewExtendedProfileLayoutStatusItem />
                </>
            )}
            <Region layout={{ width: 200, height: 1, flexShrink: 0 }} />
        </Region>
    );
};

/** Named region `change_own_attributes` of NewExtendedProfileLayout - configured through the parent's `changeOwnAttributes` prop. */
export interface NewExtendedProfileLayoutChangeOwnAttributesProps {
    captionChangeBadges?: string;
    captionChangeLooks?: string;
    layout?: BoxLayout;
    onChangeBadges?: () => void;
    onChangeLooks?: () => void;
}

export const NewExtendedProfileLayoutChangeOwnAttributes = ({ captionChangeBadges, captionChangeLooks, layout, onChangeBadges, onChangeLooks }: NewExtendedProfileLayoutChangeOwnAttributesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="change_own_attributes"
            layout={{ position: 'absolute', left: 0, width: 257, top: 117, height: 15, ...layout }}
        >
            <Region
                name="change_looks"
                layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onChangeLooks}
                cursor="pointer"
            >
                <ThemeText
                    text={captionChangeLooks ?? t('extended.profile.change.looks')}
                    textStyle="text-style-il-link-regular"
                />
            </Region>
            <Region
                name="change_badges"
                layout={{ position: 'absolute', right: 3, width: 169, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onChangeBadges}
                cursor="pointer"
            >
                <ThemeText
                    text={captionChangeBadges ?? t('extended.profile.change.badges')}
                    textStyle="text-style-il-link-regular"
                />
            </Region>
        </Region>
    );
};

/** Row template `top_left` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutTopLeftItemProps {
    avatar?: NewExtendedProfileLayoutAvatarProps;
    changeOwnAttributes?: NewExtendedProfileLayoutChangeOwnAttributesProps;
    layout?: BoxLayout;
    userInfo?: NewExtendedProfileLayoutUserInfoProps;
}

export const NewExtendedProfileLayoutTopLeftItem = ({ avatar, changeOwnAttributes, layout, userInfo }: NewExtendedProfileLayoutTopLeftItemProps) => {
    return (
        <Region
            name="top_left"
            layout={{ width: 257, height: 192, flexShrink: 0, ...layout }}
        >
            <NewExtendedProfileLayoutAvatar {...avatar} />
            <NewExtendedProfileLayoutUserInfo {...userInfo} />
            <NewExtendedProfileLayoutChangeOwnAttributes {...changeOwnAttributes} />
            <Border
                variant="2"
                name="badges"
                tintColor="#afafaf"
                layout={{ position: 'absolute', left: 1, width: 256, top: 136, height: 55 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_0"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 7, width: 42, top: 6, height: 42 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_1"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 57, width: 42, top: 6, height: 42 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_2"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 107, width: 42, top: 6, height: 42 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_3"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 157, width: 42, top: 6, height: 42 }}
                />
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_4"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 207, width: 42, top: 6, height: 42 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `spacer` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacerItem = ({ layout }: NewExtendedProfileLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 1, height: 192, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `heart_friend_name_link_region` of NewExtendedProfileLayout - configured through the parent's `heartFriendNameLinkRegion` prop. */
export interface NewExtendedProfileLayoutHeartFriendNameLinkRegionProps {
    captionHeartFriendNameLinkText?: string;
    layout?: BoxLayout;
    onHeartFriendNameLinkRegion?: () => void;
}

export const NewExtendedProfileLayoutHeartFriendNameLinkRegion = ({ captionHeartFriendNameLinkText, layout, onHeartFriendNameLinkRegion }: NewExtendedProfileLayoutHeartFriendNameLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="heart_friend_name_link_region"
            onPointerTap={onHeartFriendNameLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160, ...layout }}
        >
            <Region
                name="heart_friend_name_link_text"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 16, maxWidth: 160, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHeartFriendNameLinkText ?? t('extendedprofile.add.friends')} />
            </Region>
        </Region>
    );
};

/** Row template `relationship_heart` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipHeartItemProps {
    captionHeartTxt?: string;
    heartFriendNameLinkRegion?: NewExtendedProfileLayoutHeartFriendNameLinkRegionProps;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutRelationshipHeartItem = ({ captionHeartTxt, heartFriendNameLinkRegion, layout }: NewExtendedProfileLayoutRelationshipHeartItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_heart"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_heart.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                <NewExtendedProfileLayoutHeartFriendNameLinkRegion {...heartFriendNameLinkRegion} />
            </Border>
            <WidgetSlot
                widgetType="avatar_image"
                name="heart_head"
                options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
            />
            <Region
                name="heart_txt"
                layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeartTxt ?? t('extendedprofile.no.friends.in.this.category')}
                    textOptions={{ fill: '#7f7f7f' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `smile_friend_name_link_region` of NewExtendedProfileLayout - configured through the parent's `smileFriendNameLinkRegion` prop. */
export interface NewExtendedProfileLayoutSmileFriendNameLinkRegionProps {
    captionSmileFriendNameLinkText?: string;
    layout?: BoxLayout;
    onSmileFriendNameLinkRegion?: () => void;
}

export const NewExtendedProfileLayoutSmileFriendNameLinkRegion = ({ captionSmileFriendNameLinkText, layout, onSmileFriendNameLinkRegion }: NewExtendedProfileLayoutSmileFriendNameLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="smile_friend_name_link_region"
            onPointerTap={onSmileFriendNameLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160, ...layout }}
        >
            <Region
                name="smile_friend_name_link_text"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 16, maxWidth: 160, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSmileFriendNameLinkText ?? t('extendedprofile.add.friends')} />
            </Region>
        </Region>
    );
};

/** Row template `relationship_smile` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipSmileItemProps {
    captionSmileTxt?: string;
    layout?: BoxLayout;
    smileFriendNameLinkRegion?: NewExtendedProfileLayoutSmileFriendNameLinkRegionProps;
}

export const NewExtendedProfileLayoutRelationshipSmileItem = ({ captionSmileTxt, layout, smileFriendNameLinkRegion }: NewExtendedProfileLayoutRelationshipSmileItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_smile"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_smile.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                <NewExtendedProfileLayoutSmileFriendNameLinkRegion {...smileFriendNameLinkRegion} />
            </Border>
            <WidgetSlot
                widgetType="avatar_image"
                name="smile_head"
                options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
            />
            <Region
                name="smile_txt"
                layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSmileTxt ?? t('extendedprofile.no.friends.in.this.category')}
                    textOptions={{ fill: '#7f7f7f' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `bobba_friend_name_link_region` of NewExtendedProfileLayout - configured through the parent's `bobbaFriendNameLinkRegion` prop. */
export interface NewExtendedProfileLayoutBobbaFriendNameLinkRegionProps {
    captionBobbaFriendNameLinkText?: string;
    layout?: BoxLayout;
    onBobbaFriendNameLinkRegion?: () => void;
}

export const NewExtendedProfileLayoutBobbaFriendNameLinkRegion = ({ captionBobbaFriendNameLinkText, layout, onBobbaFriendNameLinkRegion }: NewExtendedProfileLayoutBobbaFriendNameLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bobba_friend_name_link_region"
            onPointerTap={onBobbaFriendNameLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 7, width: 160, top: 3, height: 16, maxWidth: 160, ...layout }}
        >
            <Region
                name="bobba_friend_name_link_text"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 16, maxWidth: 160, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBobbaFriendNameLinkText ?? t('extendedprofile.add.friends')} />
            </Region>
        </Region>
    );
};

/** Row template `relationship_bobba` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRelationshipBobbaItemProps {
    bobbaFriendNameLinkRegion?: NewExtendedProfileLayoutBobbaFriendNameLinkRegionProps;
    captionBobbaTxt?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutRelationshipBobbaItem = ({ bobbaFriendNameLinkRegion, captionBobbaTxt, layout }: NewExtendedProfileLayoutRelationshipBobbaItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="relationship_bobba"
            layout={{ width: 227, height: 47, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('relationship_status_bobba.png')}
                layout={{ position: 'absolute', left: 3, width: 16, top: 15, height: 14 }}
            />
            <Border
                variant="2"
                layout={{ position: 'absolute', left: 23, width: 202, top: 11, height: 22 }}
            >
                <NewExtendedProfileLayoutBobbaFriendNameLinkRegion {...bobbaFriendNameLinkRegion} />
            </Border>
            <WidgetSlot
                widgetType="avatar_image"
                name="bobba_head"
                options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                layout={{ position: 'absolute', left: 191, width: 33, bottom: 11, height: 34 }}
            />
            <Region
                name="bobba_txt"
                layout={{ position: 'absolute', left: 31, width: 210, top: 33, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBobbaTxt ?? t('extendedprofile.no.friends.in.this.category')}
                    textOptions={{ fill: '#7f7f7f' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `relationships` of NewExtendedProfileLayout - configured through the parent's `relationships` prop. */
export interface NewExtendedProfileLayoutRelationshipsProps {
    itemsRelationships?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutRelationships = ({ itemsRelationships, layout }: NewExtendedProfileLayoutRelationshipsProps) => {
    return (
        <Region
            name="relationships"
            layout={{ position: 'absolute', left: 0, width: 227, top: 39, height: 156, flexDirection: 'column', ...layout }}
        >
            {itemsRelationships ?? (
                <>
                    <NewExtendedProfileLayoutRelationshipHeartItem />
                    <NewExtendedProfileLayoutRelationshipSmileItem />
                    <NewExtendedProfileLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};

/** Row template `top_right` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutTopRightItemProps {
    captionFriendCount?: string;
    captionRelStatusLabelTxt?: string;
    layout?: BoxLayout;
    relationships?: NewExtendedProfileLayoutRelationshipsProps;
}

export const NewExtendedProfileLayoutTopRightItem = ({ captionFriendCount, captionRelStatusLabelTxt, layout, relationships }: NewExtendedProfileLayoutTopRightItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_right"
            layout={{ width: 226, height: 192, flexShrink: 0, ...layout }}
        >
            <Region
                name="friend_count"
                layout={{ position: 'absolute', left: 0, width: 161, top: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionFriendCount ?? t('extendedprofile.friends.count')} />
            </Region>
            <Region
                name="rel_status_label_txt"
                layout={{ position: 'absolute', left: 0, width: 150, top: 24, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRelStatusLabelTxt ?? t('extendedprofile.relstatus')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <NewExtendedProfileLayoutRelationships {...relationships} />
        </Region>
    );
};

/** Named region `top` of NewExtendedProfileLayout - configured through the parent's `top` prop. */
export interface NewExtendedProfileLayoutTopProps {
    itemsTop?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutTop = ({ itemsTop, layout }: NewExtendedProfileLayoutTopProps) => {
    return (
        <Region
            name="top"
            layout={{ width: 500, height: 207, flexShrink: 0, flexDirection: 'row', gap: 8, ...layout }}
        >
            {itemsTop ?? (
                <>
                    <NewExtendedProfileLayoutTopLeftItem />
                    <NewExtendedProfileLayoutSpacerItem />
                    <NewExtendedProfileLayoutTopRightItem />
                </>
            )}
        </Region>
    );
};

/** Named region `spacer` of NewExtendedProfileLayout - configured through the parent's `spacer` prop. */
export interface NewExtendedProfileLayoutSpacerProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacer = ({ layout }: NewExtendedProfileLayoutSpacerProps) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 512, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `spacer` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutSpacerItem2Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacerItem2 = ({ layout }: NewExtendedProfileLayoutSpacerItem2Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 1, height: 39, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacer` of NewExtendedProfileLayout - configured through the parent's `spacer` prop. */
export interface NewExtendedProfileLayoutSpacer2Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacer2 = ({ layout }: NewExtendedProfileLayoutSpacer2Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ position: 'absolute', left: 165, width: 1, top: -6, height: 39, ...layout }}
        />
    );
};

/** Row template `rooms_button` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRoomsButtonItemProps {
    captionRoomsLinkText?: string;
    layout?: BoxLayout;
    onRoomsButton?: () => void;
    spacer?: NewExtendedProfileLayoutSpacer2Props;
}

export const NewExtendedProfileLayoutRoomsButtonItem = ({ captionRoomsLinkText, layout, onRoomsButton, spacer }: NewExtendedProfileLayoutRoomsButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms_button"
            onPointerTap={onRoomsButton}
            cursor="pointer"
            layout={{ width: 166, height: 30, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', width: 162, top: 0, height: 30, minHeight: 30, maxHeight: 30, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('extended_profile_rooms.png')}
                    layout={{ width: 32, height: 28, flexShrink: 0 }}
                />
                <Region
                    name="rooms_link_text"
                    layout={{ width: 124, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomsLinkText ?? t('extendedprofile.rooms')}
                        textStyle="text-style-il-link-strong"
                    />
                </Region>
            </Region>
            <NewExtendedProfileLayoutSpacer2 {...spacer} />
        </Region>
    );
};

/** Named region `spacer` of NewExtendedProfileLayout - configured through the parent's `spacer` prop. */
export interface NewExtendedProfileLayoutSpacer3Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacer3 = ({ layout }: NewExtendedProfileLayoutSpacer3Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ position: 'absolute', left: 165, width: 1, top: -6, height: 39, ...layout }}
        />
    );
};

/** Row template `badgeCountRegion` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutBadgeCountRegionItemProps {
    captionBadgeCount?: string;
    captionBadgeCountLabel?: string;
    captionBadgeRank?: string;
    layout?: BoxLayout;
    onBadgeCountRegion?: () => void;
    spacer?: NewExtendedProfileLayoutSpacer3Props;
}

export const NewExtendedProfileLayoutBadgeCountRegionItem = ({ captionBadgeCount, captionBadgeCountLabel, captionBadgeRank, layout, onBadgeCountRegion, spacer }: NewExtendedProfileLayoutBadgeCountRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badgeCountRegion"
            onPointerTap={onBadgeCountRegion}
            cursor="pointer"
            layout={{ width: 166, height: 32, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 127, top: 0, height: 30, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('badge_rarity_badges_emblem.png')}
                    layout={{ width: 25, height: 25, flexShrink: 0 }}
                />
                <Region
                    name="badgeCountLabel"
                    layout={{ width: 42, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBadgeCountLabel ?? t('inventory.badges')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <Region layout={{ width: 48, height: 30, flexShrink: 0, flexDirection: 'row', gap: 2 }}>
                    <Region
                        name="badgeCount"
                        layout={{ width: 10, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBadgeCount ?? '0'}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="badgeRank"
                        layout={{ width: 36, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBadgeRank ?? '(#123)'}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                </Region>
            </Region>
            <NewExtendedProfileLayoutSpacer3 {...spacer} />
        </Region>
    );
};

/** Named region `spacer` of NewExtendedProfileLayout - configured through the parent's `spacer` prop. */
export interface NewExtendedProfileLayoutSpacer4Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacer4 = ({ layout }: NewExtendedProfileLayoutSpacer4Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ position: 'absolute', left: 166, width: 1, top: -6, height: 39, ...layout }}
        />
    );
};

/** Row template `levelRegion` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutLevelRegionItemProps {
    captionLevelLabel?: string;
    captionLevelValue?: string;
    layout?: BoxLayout;
    onLevelRegion?: () => void;
    spacer?: NewExtendedProfileLayoutSpacer4Props;
}

export const NewExtendedProfileLayoutLevelRegionItem = ({ captionLevelLabel, captionLevelValue, layout, onLevelRegion, spacer }: NewExtendedProfileLayoutLevelRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="levelRegion"
            onPointerTap={onLevelRegion}
            cursor="pointer"
            layout={{ width: 167, height: 30, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 123, top: 0, height: 30, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('extended_profile_icon_level.png')}
                    layout={{ width: 29, height: 28, flexShrink: 0 }}
                />
                <Region
                    name="levelLabel"
                    layout={{ width: 72, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLevelLabel ?? t('generic.level')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <Region
                    name="levelValue"
                    layout={{ width: 10, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLevelValue ?? '0'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
            <NewExtendedProfileLayoutSpacer4 {...spacer} />
        </Region>
    );
};

/** Named region `middle` of NewExtendedProfileLayout - configured through the parent's `middle` prop. */
export interface NewExtendedProfileLayoutMiddleProps {
    itemsMiddle?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutMiddle = ({ itemsMiddle, layout }: NewExtendedProfileLayoutMiddleProps) => {
    return (
        <Region
            name="middle"
            layout={{ width: 500, height: 27, flexShrink: 0, minWidth: 495, flexDirection: 'row', ...layout }}
        >
            {itemsMiddle ?? (
                <>
                    <NewExtendedProfileLayoutSpacerItem2 />
                    <NewExtendedProfileLayoutRoomsButtonItem />
                    <NewExtendedProfileLayoutBadgeCountRegionItem />
                    <NewExtendedProfileLayoutLevelRegionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `spacer` of NewExtendedProfileLayout - configured through the parent's `spacer` prop. */
export interface NewExtendedProfileLayoutSpacer5Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutSpacer5 = ({ layout }: NewExtendedProfileLayoutSpacer5Props) => {
    return (
        <Region
            name="spacer"
            backgroundColor="#afafaf"
            layout={{ width: 512, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `groups_list` of NewExtendedProfileLayout - configured through the parent's `groupsList` prop. */
export interface NewExtendedProfileLayoutGroupsListProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutGroupsList = ({ layout }: NewExtendedProfileLayoutGroupsListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, width: 74, top: 27, height: 195, ...layout }}
        >
            <Region
                name="groups_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Row template `all_groups` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutAllGroupsItemProps {
    captionTotalGroupCount?: string;
    groupsList?: NewExtendedProfileLayoutGroupsListProps;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutAllGroupsItem = ({ captionTotalGroupCount, groupsList, layout }: NewExtendedProfileLayoutAllGroupsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="all_groups"
            layout={{ width: 83, height: 227, flexShrink: 0, ...layout }}
        >
            <Region
                name="total_group_count"
                layout={{ position: 'absolute', left: 0, width: 159, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTotalGroupCount ?? t('extendedprofile.groups.count')} />
            </Region>
            <NewExtendedProfileLayoutGroupsList {...groupsList} />
        </Region>
    );
};

/** Named region `group_cont` of NewExtendedProfileLayout - configured through the parent's `groupCont` prop. */
export interface NewExtendedProfileLayoutGroupContProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutGroupCont = ({ layout }: NewExtendedProfileLayoutGroupContProps) => {
    return (
        <Region
            name="group_cont"
            layout={{ position: 'absolute', left: 33, width: 343, top: 5, height: 214, ...layout }}
        />
    );
};

/** Row template `group_details` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutGroupDetailsItemProps {
    groupCont?: NewExtendedProfileLayoutGroupContProps;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutGroupDetailsItem = ({ groupCont, layout }: NewExtendedProfileLayoutGroupDetailsItemProps) => {
    return (
        <Border
            variant="2"
            name="group_details"
            tintColor="#afafaf"
            layout={{ width: 410, height: 224, flexShrink: 0, ...layout }}
        >
            <NewExtendedProfileLayoutGroupCont {...groupCont} />
        </Border>
    );
};

/** Named region `bottom` of NewExtendedProfileLayout - configured through the parent's `bottom` prop. */
export interface NewExtendedProfileLayoutBottomProps {
    itemsBottom?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBottom = ({ itemsBottom, layout }: NewExtendedProfileLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 236, flexDirection: 'row', gap: 6, ...layout }}
        >
            {itemsBottom ?? (
                <>
                    <NewExtendedProfileLayoutAllGroupsItem />
                    <NewExtendedProfileLayoutGroupDetailsItem />
                </>
            )}
        </Region>
    );
};

/** Named region `bottom_container` of NewExtendedProfileLayout - configured through the parent's `bottomContainer` prop. */
export interface NewExtendedProfileLayoutBottomContainerProps {
    bottom?: NewExtendedProfileLayoutBottomProps;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBottomContainer = ({ bottom, layout }: NewExtendedProfileLayoutBottomContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bottom_container"
            layout={{ width: 500, height: 236, flexShrink: 0, ...layout }}
        >
            <NewExtendedProfileLayoutBottom {...bottom} />
            <Border
                variant="3"
                name="full_profile_hidden"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 498, top: 5, height: 226, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: -10.5, marginRight: 10.5, width: 215, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('profile.full_profile_hidden')}
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `blocked_bg` of NewExtendedProfileLayout - configured through the parent's `blockedBg` prop. */
export interface NewExtendedProfileLayoutBlockedBgProps {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBlockedBg = ({ layout }: NewExtendedProfileLayoutBlockedBgProps) => {
    return (
        <Region
            name="blocked_bg"
            backgroundColor="#898985"
            layout={{ position: 'absolute', left: 0, width: 519, top: 0, height: 497, ...layout }}
        />
    );
};

/** Named region `blocked_bg` of NewExtendedProfileLayout - configured through the parent's `blockedBg` prop. */
export interface NewExtendedProfileLayoutBlockedBg2Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBlockedBg2 = ({ layout }: NewExtendedProfileLayoutBlockedBg2Props) => {
    return (
        <Region
            name="blocked_bg"
            backgroundColor="#898985"
            layout={{ position: 'absolute', left: 1, width: 517, top: 497, height: 2, ...layout }}
        />
    );
};

/** Named region `blocked_bg` of NewExtendedProfileLayout - configured through the parent's `blockedBg` prop. */
export interface NewExtendedProfileLayoutBlockedBg3Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBlockedBg3 = ({ layout }: NewExtendedProfileLayoutBlockedBg3Props) => {
    return (
        <Region
            name="blocked_bg"
            backgroundColor="#898985"
            layout={{ position: 'absolute', left: 2, width: 515, top: 499, height: 1, ...layout }}
        />
    );
};

/** Named region `blocked_bg` of NewExtendedProfileLayout - configured through the parent's `blockedBg` prop. */
export interface NewExtendedProfileLayoutBlockedBg4Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBlockedBg4 = ({ layout }: NewExtendedProfileLayoutBlockedBg4Props) => {
    return (
        <Region
            name="blocked_bg"
            backgroundColor="#898985"
            layout={{ position: 'absolute', left: 3, width: 513, top: 500, height: 1, ...layout }}
        />
    );
};

/** Named region `blocked_bg` of NewExtendedProfileLayout - configured through the parent's `blockedBg` prop. */
export interface NewExtendedProfileLayoutBlockedBg5Props {
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBlockedBg5 = ({ layout }: NewExtendedProfileLayoutBlockedBg5Props) => {
    return (
        <Region
            name="blocked_bg"
            backgroundColor="#898985"
            layout={{ position: 'absolute', left: 5, width: 509, top: 501, height: 1, ...layout }}
        />
    );
};

/** Named region `blocked_container` of NewExtendedProfileLayout - configured through the parent's `blockedContainer` prop. */
export interface NewExtendedProfileLayoutBlockedContainerProps {
    blockedBg?: NewExtendedProfileLayoutBlockedBgProps;
    blockedBg2?: NewExtendedProfileLayoutBlockedBg2Props;
    blockedBg3?: NewExtendedProfileLayoutBlockedBg3Props;
    blockedBg4?: NewExtendedProfileLayoutBlockedBg4Props;
    blockedBg5?: NewExtendedProfileLayoutBlockedBg5Props;
    captionBlockedHtml?: string;
    layout?: BoxLayout;
    onBlockedContainer?: () => void;
    srcFrankStop?: string;
    visibleBlockedContainer?: boolean;
}

export const NewExtendedProfileLayoutBlockedContainer = ({ blockedBg, blockedBg2, blockedBg3, blockedBg4, blockedBg5, captionBlockedHtml, layout, onBlockedContainer, srcFrankStop, visibleBlockedContainer }: NewExtendedProfileLayoutBlockedContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="blocked_container"
            visible={visibleBlockedContainer ?? false}
            onPointerTap={onBlockedContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: -2, width: 519, top: -3, height: 503, ...layout }}
        >
            <NewExtendedProfileLayoutBlockedBg {...blockedBg} />
            <NewExtendedProfileLayoutBlockedBg2 {...blockedBg2} />
            <NewExtendedProfileLayoutBlockedBg3 {...blockedBg3} />
            <NewExtendedProfileLayoutBlockedBg4 {...blockedBg4} />
            <NewExtendedProfileLayoutBlockedBg5 {...blockedBg5} />
            <Border
                variant="2"
                tintColor="#e9e9e1"
                layout={{ position: 'absolute', left: 44, width: 250, alignSelf: 'center', marginTop: -6.5, marginBottom: 6.5, height: 100 }}
            >
                <Region
                    name="blocked_html"
                    layout={{ position: 'absolute', left: 13, width: 218, top: 14, minWidth: 218, maxWidth: 218, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBlockedHtml ?? t('extendedprofile.blocked')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 218 }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="frank_stop"
                src={srcFrankStop ?? layoutImage('extended_profile_frank_stop.png')}
                layout={{ position: 'absolute', left: 312, width: 148, top: 146, height: 192 }}
            />
        </Region>
    );
};
