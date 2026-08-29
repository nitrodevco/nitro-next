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

/** Named region `friendtools` of NewBarLayout - configured through the parent's `friendtools` prop. */
export interface NewBarLayoutFriendtoolsProps {
    layout?: BoxLayout;
    onCollapseLeft?: () => void;
    onIconAllFriends?: () => void;
    onIconFindFriends?: () => void;
    onIconMessenger?: () => void;
    srcIcon?: string;
    srcIcon1?: string;
    srcIcon2?: string;
    srcIconsToolbarCollapseLeft?: string;
    srcLine?: string;
}

export const NewBarLayoutFriendtools = ({ layout, onCollapseLeft, onIconAllFriends, onIconFindFriends, onIconMessenger, srcIcon, srcIcon1, srcIcon2, srcIconsToolbarCollapseLeft, srcLine }: NewBarLayoutFriendtoolsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friendtools"
            layout={{ position: 'absolute', left: 1, width: 150, top: 2, height: 46, ...layout }}
        >
            <ThemeImage
                name="line"
                src={srcLine ?? layoutImage('bottom_bar_divider_1px.png')}
                layout={{ position: 'absolute', left: 15, width: 1, top: 3, height: 40 }}
            />
            <Region
                name="collapse_left"
                onPointerTap={onCollapseLeft}
                cursor="pointer"
                layout={{ position: 'absolute', left: 135, width: 15, top: 0, height: 46, justifyContent: 'center' }}
            >
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
                />
                <ThemeImage
                    name="icons_toolbar_collapse_left"
                    src={srcIconsToolbarCollapseLeft ?? layoutImage('roomtools_minimizebutton.png')}
                    layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
                />
            </Region>
            <Region
                name="icon_all_friends"
                tooltip="${friend.bar.friends.title)"
                dynamicStyle="lifted_hover"
                onPointerTap={onIconAllFriends}
                cursor="pointer"
                layout={{ position: 'absolute', left: 18, width: 45, top: 5, height: 41 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_all_friends.png')}
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 33 }}
                />
            </Region>
            <Region
                name="icon_find_friends"
                tooltip={t('friend.bar.search.title')}
                dynamicStyle="lifted_hover"
                onPointerTap={onIconFindFriends}
                cursor="pointer"
                layout={{ position: 'absolute', left: 64, width: 45, top: 5, height: 41 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_search_habbos.png')}
                    layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 33 }}
                />
            </Region>
            <Region
                name="icon_messenger"
                dynamicStyle="lifted_hover"
                onPointerTap={onIconMessenger}
                cursor="pointer"
                layout={{ position: 'absolute', left: 103, width: 31, top: 5, height: 41 }}
            >
                <ThemeImage
                    name="icon"
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
        </Region>
    );
};

/** Named region `border` of NewBarLayout - configured through the parent's `border` prop. */
export interface NewBarLayoutBorderProps {
    friendtools?: NewBarLayoutFriendtoolsProps;
    layout?: BoxLayout;
    onBorder?: () => void;
    onButtonLeftPage?: () => void;
    onButtonRightPage?: () => void;
    onCollapseRight?: () => void;
    srcIconsToolbarCollapseRight?: string;
}

export const NewBarLayoutBorder = ({ friendtools, layout, onBorder, onButtonLeftPage, onButtonRightPage, onCollapseRight, srcIconsToolbarCollapseRight }: NewBarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 48, ...layout }}
        >
            <NewBarLayoutFriendtools {...friendtools} />
            <Region
                name="button_left_page"
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonLeftPage}
                cursor="pointer"
                layout={{ position: 'absolute', left: 145, width: 28, top: 4, height: 40 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_friends_browse_bg.png')}
                    tint="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 4, height: 31 }}
                />
                <Icon
                    variant="4"
                    tintColor="#9c9791"
                    layout={{ position: 'absolute', left: 12, width: 10, top: 15, height: 10 }}
                />
            </Region>
            <Region
                name="list"
                layout={{ position: 'absolute', left: 173, top: 6, flexDirection: 'row', gap: 3 }}
            />
            <Region
                name="button_right_page"
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonRightPage}
                cursor="pointer"
                layout={{ position: 'absolute', left: 248, width: 29, top: 4, height: 40 }}
            >
                <ThemeImage
                    src={layoutImage('friend_bar_friends_browse_bg.png')}
                    tint="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 29, top: 5, height: 31 }}
                />
                <Icon
                    variant="5"
                    tintColor="#9c9791"
                    layout={{ position: 'absolute', left: 11, width: 10, top: 15, height: 10 }}
                />
            </Region>
            <Region
                name="collapse_right"
                onPointerTap={onCollapseRight}
                cursor="pointer"
                layout={{ position: 'absolute', left: 282, width: 15, top: 2, height: 46, justifyContent: 'center' }}
            >
                <Border
                    variant="2"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 43 }}
                />
                <ThemeImage
                    name="icons_toolbar_collapse_right"
                    src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                    layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
                />
            </Region>
        </Region>
    );
};
