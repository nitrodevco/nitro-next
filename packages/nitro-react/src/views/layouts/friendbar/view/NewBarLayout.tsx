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
    tags?: string[];
}

export const NewBarLayoutCollapseLeft = ({ layout, onCollapseLeft, srcIconsToolbarCollapseLeft, tags }: NewBarLayoutCollapseLeftProps) => {
    return (
        <Region
            name="collapse_left"
            tags={tags}
            onPointerTap={onCollapseLeft}
            cursor="pointer"
            layout={{ position: 'absolute', left: 135, width: 15, top: 0, height: 46, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
            />
            <ThemeImage
                name="icons_toolbar_collapse_left"
                tags={[ 'ICON_BMP', '#icon' ]}
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
    tags?: string[];
}

export const NewBarLayoutIconAllFriends = ({ layout, onIconAllFriends, tags }: NewBarLayoutIconAllFriendsProps) => {
    return (
        <Region
            name="icon_all_friends"
            tags={tags}
            tooltip="${friend.bar.friends.title)"
            dynamicStyle="lifted_hover"
            onPointerTap={onIconAllFriends}
            cursor="pointer"
            layout={{ position: 'absolute', left: 18, width: 45, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
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
    tags?: string[];
}

export const NewBarLayoutIconFindFriends = ({ layout, onIconFindFriends, tags }: NewBarLayoutIconFindFriendsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="icon_find_friends"
            tags={tags}
            tooltip={t('friend.bar.search.title')}
            dynamicStyle="lifted_hover"
            onPointerTap={onIconFindFriends}
            cursor="pointer"
            layout={{ position: 'absolute', left: 64, width: 45, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
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
    tags?: string[];
}

export const NewBarLayoutIconMessenger = ({ layout, onIconMessenger, srcIcon, srcIcon1, srcIcon2, tags }: NewBarLayoutIconMessengerProps) => {
    return (
        <Region
            name="icon_messenger"
            tags={tags}
            dynamicStyle="lifted_hover"
            onPointerTap={onIconMessenger}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 31, top: 5, height: 41, ...layout }}
        >
            <ThemeImage
                name="icon"
                tags={[ '#icon' ]}
                src={srcIcon ?? layoutImage('friend_bar_friendlist_messenger.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 32 }}
            />
            <ThemeImage
                name="icon_1"
                src={srcIcon1 ?? layoutImage('friend_bar_friendlist_messenger_notify_0.png')}
                layout={{ position: 'absolute', left: 0, width: 26, top: 0, height: 32 }}
            />
            <ThemeImage
                name="icon_2"
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
    tags?: string[];
}

export const NewBarLayoutFriendtools = ({ collapseLeft, iconAllFriends, iconFindFriends, iconMessenger, layout, srcLine, tags }: NewBarLayoutFriendtoolsProps) => {
    return (
        <Region
            name="friendtools"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 150, top: 2, height: 46, ...layout }}
        >
            <ThemeImage
                name="line"
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
    tags?: string[];
}

export const NewBarLayoutButtonLeftPage = ({ layout, onButtonLeftPage, tags }: NewBarLayoutButtonLeftPageProps) => {
    return (
        <Region
            name="button_left_page"
            tags={tags}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLeftPage}
            cursor="pointer"
            layout={{ position: 'absolute', left: 145, width: 28, top: 4, height: 40, ...layout }}
        >
            <ThemeImage
                tags={[ '#bg' ]}
                src={layoutImage('friend_bar_friends_browse_bg.png')}
                tint="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 31 }}
            />
            <Icon
                variant="4"
                tags={[ '#icon' ]}
                tintColor="#9c9791"
                layout={{ position: 'absolute', left: 12, width: 10, top: 15, height: 10 }}
            />
        </Region>
    );
};

/** Named region `list` of NewBarLayout - configured through the parent's `list` prop. */
export interface NewBarLayoutListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NewBarLayoutList = ({ layout, tags }: NewBarLayoutListProps) => {
    return (
        <Region
            name="list"
            tags={tags}
            layout={{ position: 'absolute', left: 173, top: 6, flexDirection: 'row', gap: 3, ...layout }}
        />
    );
};

/** Named region `button_right_page` of NewBarLayout - configured through the parent's `buttonRightPage` prop. */
export interface NewBarLayoutButtonRightPageProps {
    layout?: BoxLayout;
    onButtonRightPage?: () => void;
    tags?: string[];
}

export const NewBarLayoutButtonRightPage = ({ layout, onButtonRightPage, tags }: NewBarLayoutButtonRightPageProps) => {
    return (
        <Region
            name="button_right_page"
            tags={tags}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonRightPage}
            cursor="pointer"
            layout={{ position: 'absolute', left: 248, width: 29, top: 4, height: 40, ...layout }}
        >
            <ThemeImage
                tags={[ '#bg' ]}
                src={layoutImage('friend_bar_friends_browse_bg.png')}
                tint="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 29, top: 5, height: 31 }}
            />
            <Icon
                variant="5"
                tags={[ '#icon' ]}
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
    tags?: string[];
}

export const NewBarLayoutCollapseRight = ({ layout, onCollapseRight, srcIconsToolbarCollapseRight, tags }: NewBarLayoutCollapseRightProps) => {
    return (
        <Region
            name="collapse_right"
            tags={tags}
            onPointerTap={onCollapseRight}
            cursor="pointer"
            layout={{ position: 'absolute', left: 282, width: 15, top: 2, height: 46, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
            />
            <ThemeImage
                name="icons_toolbar_collapse_right"
                tags={[ 'ICON_BMP', '#icon' ]}
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
    tags?: string[];
}

export const NewBarLayoutBorder = ({ buttonLeftPage, buttonRightPage, collapseRight, friendtools, layout, list, onBorder, tags }: NewBarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 48, ...layout }}
        >
            <NewBarLayoutFriendtools {...friendtools} />
            <NewBarLayoutButtonLeftPage
                tags={[ 'arrow', 'left' ]}
                {...buttonLeftPage}
            />
            <NewBarLayoutList {...list} />
            <NewBarLayoutButtonRightPage
                tags={[ 'arrow', 'right' ]}
                {...buttonRightPage}
            />
            <NewBarLayoutCollapseRight {...collapseRight} />
        </Region>
    );
};
