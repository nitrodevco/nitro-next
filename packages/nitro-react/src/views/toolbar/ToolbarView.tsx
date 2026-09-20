import { QuitComposer } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { goToHomeRoom } from '#base/commands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { useIsLandingViewVisible, useSystemActions, useTranslation } from '#base/context/system';
import { useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { useWiredShowToolbarMenuButton } from '#base/context/wired';
import { Border, LayoutImage, Region, ThemeImage, useLayoutEvent } from '#base/theme';

import { ToolbarExtendedMenu } from './ToolbarExtendedMenu';

export const ToolbarView = () => {
    const [ isMeExpanded, setMeExpanded ] = useState(false);
    const [ isProgressionExpanded, setProgressionExpanded ] = useState(false);
    const [ leftSideCollapsed, setLeftSideCollapsed ] = useState(false);
    const [ rightSideCollapsed, setRightSideCollapsed ] = useState(false);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const { toggleWindow, endRoomSession, setToolbarWidths } = useSystemActions();
    // The two groups are measured for the chat bar, which fits itself between them - `toolBarAreaWidth` / `friendBarWidth`.
    const [ leftGroup, setLeftGroup ] = useState<PixiContainer | null>(null);
    const [ rightGroup, setRightGroup ] = useState<PixiContainer | null>(null);
    const reportWidths = () => setToolbarWidths(Math.ceil(leftGroup?.layout?.computedLayout.width ?? leftGroup?.width ?? 0), Math.ceil(rightGroup?.layout?.computedLayout.width ?? rightGroup?.width ?? 0));

    useLayoutEvent(leftGroup, reportWidths);
    useLayoutEvent(rightGroup, reportWidths);
    const landingViewVisible = useIsLandingViewVisible();
    // `BottomBarLeft`: the wired menu icon is a room icon, and only for someone `showToolbarMenuButton` lets see it.
    const showWiredMenuButton = useWiredShowToolbarMenuButton() && !landingViewVisible;
    const { send } = useWebSocketContext();
    const t = useTranslation();

    // HabboLandingView.onToolbarClick HTIE_ICON_RECEPTION: quit and dispose the room session right away (RSE_ENDED shows the hotel view)
    const goToHotelView = () => {
        send(new QuitComposer({}));
        endRoomSession();
    };

    const toggleMenu = (menu: 'me' | 'progression') => {
        setMeExpanded(menu === 'me' && !isMeExpanded);
        setProgressionExpanded(menu === 'progression' && !isProgressionExpanded);
    };

    return (
        <>
            <Region layout={{
                position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 54,
            }}
            >
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: -10, right: -10, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}
                >
                    <Region
                        ref={setLeftGroup}
                        layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}
                    >
                        <ThemeImage
                            src={LayoutImage(leftSideCollapsed ? 'toolbar/collapse_left_active.png' : 'toolbar/collapse_left.png')}
                            width={14}
                            height={43}
                            onPointerTap={() => setLeftSideCollapsed(prev => !prev)}
                        />
                        {!leftSideCollapsed && !landingViewVisible && (
                            <Region
                                dynamicStyle="lifted_hover"
                                onPointerTap={goToHotelView}
                                tooltip={t('toolbar.icon.tooltip.exitroom.hotelview')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={LayoutImage('toolbar/bottom_bar_logo.png')}
                                />
                            </Region>
                        ) }
                        {!leftSideCollapsed && landingViewVisible && (
                            <Region
                                dynamicStyle="lifted_hover"
                                // HTIE_ICON_HOME -> goToHomeRoom(): a room forward to the home room (its GetGuestRoomResult starts the session)
                                onPointerTap={() => goToHomeRoom(send)}
                                tooltip={t('toolbar.icon.tooltip.exitroom.home')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={LayoutImage('toolbar/bottom_bar_home.png')}
                                />
                            </Region>
                        ) }
                        {!leftSideCollapsed && (
                            <Region
                                dynamicStyle="lifted_hover"
                                onPointerTap={() => toggleWindow('navigator')}
                                tooltip={t('toolbar.icon.label.navigator')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={LayoutImage('toolbar/bottom_bar_navigator.png')}
                                />
                            </Region>
                        )}
                        {!leftSideCollapsed && (
                            <Region
                                dynamicStyle="lifted_hover"
                                onPointerTap={() => toggleMenu('progression')}
                                tooltip={t('toolbar.icon.label.progression')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={LayoutImage('toolbar/bottom_bar_progression.png')}
                                />
                            </Region>
                        )}
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('catalog')}
                            tooltip={t('toolbar.icon.label.catalogue')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('toolbar/bottom_bar_shop.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            tooltip={t('toolbar.icon.label.builder')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('toolbar/bottom_bar_buildersclub.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('inventory')}
                            tooltip={t('toolbar.icon.label.inventory')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('toolbar/bottom_bar_inventory.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleMenu('me')}
                            tooltip={t('toolbar.icon.label.memenu')}
                            layout={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ThemeImage
                                src={LayoutImage('toolbar/bottom_bar_memenu_bg.png')}
                                layout={{ position: 'absolute', left: 0, width: 45, height: 45 }}
                            />
                            <Region
                                dynamicRole="icon"
                                layout={{ position: 'absolute', width: 44, height: 41, justifyContent: 'center', overflow: 'hidden' }}
                            >
                                <AvatarImage
                                    figure={ownFigure}
                                    gender={ownGender}
                                    direction={3}
                                    headOnly
                                    layout={{ marginTop: -34, marginLeft: -1 }}
                                />
                            </Region>
                            <ThemeImage
                                src={LayoutImage('toolbar/bottom_bar_memenu_circle.png')}
                                layout={{ position: 'absolute', left: 0, width: 45, height: 45 }}
                            />
                        </Region>
                        {showWiredMenuButton && (
                            <Region
                                dynamicStyle="lifted_hover"
                                onPointerTap={() => toggleWindow('wired_menu')}
                                tooltip={t('toolbar.icon.label.wired_menu')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={LayoutImage('shared/bottom_bar_wired_menu.png')}
                                />
                            </Region>
                        )}
                        <Region
                            dynamicStyle="lifted_hover"
                            tooltip={t('camera.interface.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('toolbar/bottom_bar_camera.png')}
                            />
                        </Region>
                        <ThemeImage
                            name="line"
                            src={LayoutImage('shared/bottom_bar_divider_1px.png')}
                            layout={{ width: 1, height: 40 }}
                        />
                    </Region>
                    <Region
                        ref={setRightGroup}
                        layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}
                    >
                        <ThemeImage
                            name="line"
                            src={LayoutImage('shared/bottom_bar_divider_1px.png')}
                            layout={{ width: 1, height: 40 }}
                        />
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('friendlist')}
                            tooltip={t('friend.bar.friends.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('friend-bar/friend_bar_all_friends.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('friendlist', { tab: 'search' })}
                            tooltip={t('friend.bar.search.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={LayoutImage('friend-bar/friend_bar_search_habbos.png')}
                            />
                        </Region>
                        <ThemeImage
                            src={LayoutImage(rightSideCollapsed ? 'toolbar/collapse_right_active.png' : 'toolbar/collapse_right.png')}
                            width={14}
                            height={43}
                            cursor="pointer"
                            onPointerTap={() => setRightSideCollapsed(prev => !prev)}
                        />
                    </Region>
                </Border>
            </Region>
            {isMeExpanded && (
                <ToolbarExtendedMenu
                    buttons={[
                        { icon: 'me_menu_me_profile', caption: t('widget.memenu.profile') },
                        { icon: 'me_menu_me_rooms', caption: t('widget.memenu.myrooms') },
                        { icon: 'me_menu_me_clothing', caption: t('widget.memenu.editavatar'), action: () => toggleWindow('avatar_editor') },
                        { icon: 'me_menu_me_forums', caption: t('widget.memenu.forums') },
                        { icon: 'me_menu_me_cabinet', caption: t('memenu.collectibles') },
                    ]}
                    onSelect={() => setMeExpanded(false)}
                />
            )}
            {isProgressionExpanded && (
                <ToolbarExtendedMenu
                    buttons={[
                        { icon: 'prog_menu_daily_tasks', caption: t('widget.progmenu.dailytasks') },
                        { icon: 'prog_menu_quests', caption: t('widget.progmenu.quests') },
                        { icon: 'icons_toolbar_achievements_normal', caption: t('widget.progmenu.achievements') },
                        { icon: 'prog_menu_leaderboards', caption: t('widget.progmenu.leaderboards') },
                        { icon: 'prog_menu_introduction', caption: t('widget.progmenu.introduction') },
                    ]}
                    onSelect={() => setProgressionExpanded(false)}
                />
            )}
        </>
    );
};
