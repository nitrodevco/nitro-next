import { useState } from 'react';

import { AvatarImage } from '#base/components';
import { useIsLandingViewVisible, useOwnUserFigure, useOwnUserGender, useSystemActions, useTranslation } from '#base/context';
import { Border, Box, Icon, Region, ThemeImage } from '#base/theme';

import { layoutImage } from '../layouts/layoutAssets';
import { ToolbarExtendedMenu } from './ToolbarExtendedMenu';
import { ToolbarProgressionMenuPixi } from './ToolbarProgressionMenuPixi';

export const ToolbarView = () => {
    const [ isMeExpanded, setMeExpanded ] = useState(false);
    const [ isProgressionExpanded, setProgressionExpanded ] = useState(false);
    const [ leftSideCollapsed, setLeftSideCollapsed ] = useState(false);
    const [ rightSideCollapsed, setRightSideCollapsed ] = useState(false);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const { toggleWindow } = useSystemActions();
    const landingViewVisible = useIsLandingViewVisible();
    const t = useTranslation();

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
                    <Region layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}>
                        <ThemeImage
                            src={leftSideCollapsed ? '/assets/flash/toolbar/collapse_left_active.png' : '/assets/flash/toolbar/collapse_left.png'}
                            width={14}
                            height={43}
                            onPointerTap={() => setLeftSideCollapsed(prev => !prev)}
                        />
                        {!leftSideCollapsed && !landingViewVisible && (
                            <Region
                                dynamicStyle="lifted_hover"
                                tooltip={t('toolbar.icon.tooltip.exitroom.hotelview')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={layoutImage('bottom_bar_logo.png')}
                                />
                            </Region>
                        ) }
                        {!leftSideCollapsed && landingViewVisible && (
                            <Region
                                dynamicStyle="lifted_hover"
                                tooltip={t('toolbar.icon.tooltip.exitroom.home')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={layoutImage('bottom_bar_home.png')}
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
                                    src={layoutImage('bottom_bar_navigator.png')}
                                />
                            </Region>
                        )}
                        {!leftSideCollapsed && (
                            <Region
                                dynamicStyle="lifted_hover"
                                tooltip={t('toolbar.icon.label.progression')}
                            >
                                <ThemeImage
                                    dynamicRole="icon"
                                    src={layoutImage('bottom_bar_progression.png')}
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
                                src={layoutImage('bottom_bar_shop.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            tooltip={t('toolbar.icon.label.builder')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('bottom_bar_buildersclub.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('inventory')}
                            tooltip={t('toolbar.icon.label.inventory')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('bottom_bar_inventory.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleMenu('me')}
                            tooltip={t('toolbar.icon.label.memenu')}
                            layout={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ThemeImage
                                src={layoutImage('bottom_bar_memenu_bg.png')}
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
                                src={layoutImage('bottom_bar_memenu_circle.png')}
                                layout={{ position: 'absolute', left: 0, width: 45, height: 45 }}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            tooltip={t('toolbar.icon.label.wired_menu')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('bottom_bar_wired_menu.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            tooltip={t('camera.interface.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('bottom_bar_camera.png')}
                            />
                        </Region>

                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleWindow('layout_browser')}
                            layout={{}}
                        >
                            <Icon variant="30" />
                        </Box>
                        <ThemeImage
                            name="line"
                            src={layoutImage('bottom_bar_divider_1px.png')}
                            layout={{ width: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}>
                        <ThemeImage
                            name="line"
                            src={layoutImage('bottom_bar_divider_1px.png')}
                            layout={{ width: 1, height: 40 }}
                        />
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('friendlist')}
                            tooltip={t('friend.bar.friends.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('friend_bar_all_friends.png')}
                            />
                        </Region>
                        <Region
                            dynamicStyle="lifted_hover"
                            onPointerTap={() => toggleWindow('friendlist', { tab: 'search' })}
                            tooltip={t('friend.bar.search.title')}
                        >
                            <ThemeImage
                                dynamicRole="icon"
                                src={layoutImage('friend_bar_search_habbos.png')}
                            />
                        </Region>
                        <ThemeImage
                            src={rightSideCollapsed ? '/assets/flash/toolbar/collapse_right_active.png' : '/assets/flash/toolbar/collapse_right.png'}
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
            {isProgressionExpanded && <ToolbarProgressionMenuPixi />}
        </>
    );
};
