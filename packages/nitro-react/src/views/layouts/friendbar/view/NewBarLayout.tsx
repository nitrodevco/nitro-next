import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `24_new_bar_xml` (layout "new_bar", 300x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewBarLayoutProps {
    border?: NewBarLayoutBorderProps;
    layout?: BoxLayout;
}

export const NewBarLayout = ({ border, layout }: NewBarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 48, ...layout }}>
            <NewBarLayoutBorder {...border} />
        </Region>
    );
};

/** Named region `collapse_left` of NewBarLayout - configured through the parent's `collapseLeft` prop. */
export interface NewBarLayoutCollapseLeftProps {
    layout?: BoxLayout;
    onCollapseLeft?: () => void;
    srcIconsToolbarCollapseLeft?: string;
}

export const NewBarLayoutCollapseLeft = ({ layout, onCollapseLeft, srcIconsToolbarCollapseLeft }: NewBarLayoutCollapseLeftProps) => {
    return (
        <Region
            name="collapse_left"
            params={17}
            onPointerTap={onCollapseLeft}
            cursor="pointer"
            layout={{ position: 'absolute', left: 135, width: 15, top: 0, height: 46, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
            />
            <ThemeImage
                name="icons_toolbar_collapse_left"
                tags={[ 'ICON_BMP', '#icon' ]}
                params={208}
                src={srcIconsToolbarCollapseLeft ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `icon_all_friends` of NewBarLayout - configured through the parent's `iconAllFriends` prop. */
export interface NewBarLayoutIconAllFriendsProps {
    layout?: BoxLayout;
    onIconAllFriends?: () => void;
}

export const NewBarLayoutIconAllFriends = ({ layout, onIconAllFriends }: NewBarLayoutIconAllFriendsProps) => {
    return (
        <Region
            name="icon_all_friends"
            tooltip="${friend.bar.friends.title)"
            params={1}
            dynamicStyle="lifted_hover"
            onPointerTap={onIconAllFriends}
            cursor="pointer"
            layout={{ position: 'absolute', left: 18, width: 45, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('friend_bar_all_friends.png')}
                layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 33 }}
            />
        </Region>
    );
};

/** Named region `icon_find_friends` of NewBarLayout - configured through the parent's `iconFindFriends` prop. */
export interface NewBarLayoutIconFindFriendsProps {
    layout?: BoxLayout;
    onIconFindFriends?: () => void;
}

export const NewBarLayoutIconFindFriends = ({ layout, onIconFindFriends }: NewBarLayoutIconFindFriendsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="icon_find_friends"
            tooltip={t('friend.bar.search.title')}
            params={1}
            dynamicStyle="lifted_hover"
            onPointerTap={onIconFindFriends}
            cursor="pointer"
            layout={{ position: 'absolute', left: 64, width: 45, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('friend_bar_search_habbos.png')}
                layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 33 }}
            />
        </Region>
    );
};

/** Named region `icon_messenger` of NewBarLayout - configured through the parent's `iconMessenger` prop. */
export interface NewBarLayoutIconMessengerProps {
    layout?: BoxLayout;
    onIconMessenger?: () => void;
    srcIcon?: string;
    srcIcon1?: string;
    srcIcon2?: string;
}

export const NewBarLayoutIconMessenger = ({ layout, onIconMessenger, srcIcon, srcIcon1, srcIcon2 }: NewBarLayoutIconMessengerProps) => {
    return (
        <Region
            name="icon_messenger"
            params={1}
            dynamicStyle="lifted_hover"
            onPointerTap={onIconMessenger}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 31, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                name="icon"
                tags={[ '#icon' ]}
                params={16}
                src={srcIcon ?? layoutImage('friend_bar_friendlist_messenger.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 32 }}
            />
            <ThemeImage
                name="icon_1"
                params={16}
                src={srcIcon1 ?? layoutImage('friend_bar_friendlist_messenger_notify_0.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 32 }}
            />
            <ThemeImage
                name="icon_2"
                params={16}
                src={srcIcon2 ?? layoutImage('friend_bar_friendlist_messenger_notify_1.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 32 }}
            />
        </Region>
    );
};

/** Named region `friendtools` of NewBarLayout - configured through the parent's `friendtools` prop. */
export interface NewBarLayoutFriendtoolsProps {
    collapseLeft?: NewBarLayoutCollapseLeftProps;
    iconAllFriends?: NewBarLayoutIconAllFriendsProps;
    iconFindFriends?: NewBarLayoutIconFindFriendsProps;
    iconMessenger?: NewBarLayoutIconMessengerProps;
    layout?: BoxLayout;
    srcLine?: string;
}

export const NewBarLayoutFriendtools = ({ collapseLeft, iconAllFriends, iconFindFriends, iconMessenger, layout, srcLine }: NewBarLayoutFriendtoolsProps) => {
    return (
        <Region
            name="friendtools"
            params={16}
            layout={{ position: 'absolute', left: 1, width: 150, top: 2, height: 46, ...layout }}
        >
            <ThemeImage
                name="line"
                params={16}
                src={srcLine ?? layoutImage('bottom_bar_divider_1px.png')}
                layout={{ position: 'absolute', left: 15, width: 1, top: 3, height: 40 }}
            />
            <NewBarLayoutCollapseLeft {...collapseLeft} />
            <NewBarLayoutIconAllFriends {...iconAllFriends} />
            <NewBarLayoutIconFindFriends {...iconFindFriends} />
            <NewBarLayoutIconMessenger {...iconMessenger} />
        </Region>
    );
};

/** Named region `button_left_page` of NewBarLayout - configured through the parent's `buttonLeftPage` prop. */
export interface NewBarLayoutButtonLeftPageProps {
    layout?: BoxLayout;
    onButtonLeftPage?: () => void;
}

export const NewBarLayoutButtonLeftPage = ({ layout, onButtonLeftPage }: NewBarLayoutButtonLeftPageProps) => {
    return (
        <Region
            name="button_left_page"
            tags={[ 'arrow', 'left' ]}
            params={1}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLeftPage}
            cursor="pointer"
            layout={{ position: 'absolute', left: 145, width: 28, top: 4, height: 40, ...layout }}
        >
            <ThemeImage
                tags={[ '#bg' ]}
                params={16}
                src={layoutImage('friend_bar_friends_browse_bg.png')}
                tint="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 31 }}
            />
            <Icon
                variant="4"
                tags={[ '#icon' ]}
                params={16}
                tintColor="#9c9791"
                layout={{ position: 'absolute', left: 12, width: 10, top: 15, height: 10 }}
            />
        </Region>
    );
};

/** Named region `list` of NewBarLayout - configured through the parent's `list` prop. */
export interface NewBarLayoutListProps {
    layout?: BoxLayout;
}

export const NewBarLayoutList = ({ layout }: NewBarLayoutListProps) => {
    return (
        <Region
            name="list"
            params={147472}
            layout={{ position: 'absolute', left: 173, top: 6, flexDirection: 'row', gap: 3, ...layout }}
        />
    );
};

/** Named region `button_right_page` of NewBarLayout - configured through the parent's `buttonRightPage` prop. */
export interface NewBarLayoutButtonRightPageProps {
    layout?: BoxLayout;
    onButtonRightPage?: () => void;
}

export const NewBarLayoutButtonRightPage = ({ layout, onButtonRightPage }: NewBarLayoutButtonRightPageProps) => {
    return (
        <Region
            name="button_right_page"
            tags={[ 'arrow', 'right' ]}
            params={1}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonRightPage}
            cursor="pointer"
            layout={{ position: 'absolute', left: 248, width: 29, top: 4, height: 40, ...layout }}
        >
            <ThemeImage
                tags={[ '#bg' ]}
                params={16}
                src={layoutImage('friend_bar_friends_browse_bg.png')}
                tint="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 29, top: 5, height: 31 }}
            />
            <Icon
                variant="5"
                tags={[ '#icon' ]}
                params={16}
                tintColor="#9c9791"
                layout={{ position: 'absolute', left: 11, width: 10, top: 15, height: 10 }}
            />
        </Region>
    );
};

/** Named region `collapse_right` of NewBarLayout - configured through the parent's `collapseRight` prop. */
export interface NewBarLayoutCollapseRightProps {
    layout?: BoxLayout;
    onCollapseRight?: () => void;
    srcIconsToolbarCollapseRight?: string;
}

export const NewBarLayoutCollapseRight = ({ layout, onCollapseRight, srcIconsToolbarCollapseRight }: NewBarLayoutCollapseRightProps) => {
    return (
        <Region
            name="collapse_right"
            params={17}
            onPointerTap={onCollapseRight}
            cursor="pointer"
            layout={{ position: 'absolute', left: 282, width: 15, top: 2, height: 46, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
            />
            <ThemeImage
                name="icons_toolbar_collapse_right"
                tags={[ 'ICON_BMP', '#icon' ]}
                params={208}
                src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `border` of NewBarLayout - configured through the parent's `border` prop. */
export interface NewBarLayoutBorderProps {
    buttonLeftPage?: NewBarLayoutButtonLeftPageProps;
    buttonRightPage?: NewBarLayoutButtonRightPageProps;
    collapseRight?: NewBarLayoutCollapseRightProps;
    friendtools?: NewBarLayoutFriendtoolsProps;
    layout?: BoxLayout;
    list?: NewBarLayoutListProps;
    onBorder?: () => void;
}

export const NewBarLayoutBorder = ({ buttonLeftPage, buttonRightPage, collapseRight, friendtools, layout, list, onBorder }: NewBarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            params={1}
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 48, ...layout }}
        >
            <NewBarLayoutFriendtools {...friendtools} />
            <NewBarLayoutButtonLeftPage {...buttonLeftPage} />
            <NewBarLayoutList {...list} />
            <NewBarLayoutButtonRightPage {...buttonRightPage} />
            <NewBarLayoutCollapseRight {...collapseRight} />
        </Region>
    );
};
