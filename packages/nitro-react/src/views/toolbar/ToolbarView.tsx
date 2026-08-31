import { useState } from 'react';

import { AvatarImage } from '#base/components';
import { useOwnUserFigure, useOwnUserGender, useSystemActions } from '#base/context';
import { Border, Box, Icon, NitroIcon, ThemeImage } from '#base/theme';

import { layoutImage } from '../layouts/layoutAssets';
import { ToolbarMeMenuPixi } from './ToolbarMeMenuPixi';
import { ToolbarProgressionMenuPixi } from './ToolbarProgressionMenuPixi';

export const ToolbarView = () => {
    const [ isMeExpanded, setMeExpanded ] = useState(false);
    const [ isProgressionExpanded, setProgressionExpanded ] = useState(false);
    const [ leftSideCollapsed, setLeftSideCollapsed ] = useState(false);
    const [ rightSideCollapsed, setRightSideCollapsed ] = useState(false);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const { toggleWindow } = useSystemActions();

    const toggleMenu = (menu: 'me' | 'progression') => {
        setMeExpanded(menu === 'me' && !isMeExpanded);
        setProgressionExpanded(menu === 'progression' && !isProgressionExpanded);
    };

    return (
        <>
            {isMeExpanded && <ToolbarMeMenuPixi onSelect={() => setMeExpanded(false)} />}
            {isProgressionExpanded && <ToolbarProgressionMenuPixi />}
            <Box layout={{
                position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 54,
            }}
            >
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: -10, right: -10, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}
                >
                    <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}>
                        <ThemeImage
                            src={leftSideCollapsed ? '/assets/flash/toolbar/collapse_left_active.png' : '/assets/flash/toolbar/collapse_left.png'}
                            width={14}
                            height={43}
                            cursor="pointer"
                            onPointerTap={() => setLeftSideCollapsed(prev => !prev)}
                        />
                        {!leftSideCollapsed && (
                            <ThemeImage src={layoutImage('bottom_bar_logo.png')} />
                        )}
                        {!leftSideCollapsed && (
                            <ThemeImage src={layoutImage('bottom_bar_home.png')} />
                        )}
                        {!leftSideCollapsed && (
                            <ThemeImage
                                onPointerTap={() => toggleWindow('navigator')}
                                src={layoutImage('bottom_bar_navigator.png')}
                            />
                        )}
                        {!leftSideCollapsed && (
                            <ThemeImage
                                onPointerTap={() => toggleMenu('progression')}
                                src={layoutImage('bottom_bar_progression.png')}
                            />
                        )}
                        <ThemeImage
                            onPointerTap={() => toggleWindow('catalog')}
                            src={layoutImage('bottom_bar_shop.png')}
                        />
                        <ThemeImage src={layoutImage('bottom_bar_buildersclub.png')} />
                        <ThemeImage
                            onPointerTap={() => toggleWindow('inventory')}
                            src={layoutImage('bottom_bar_inventory.png')}
                        />
                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleMenu('me')}
                            layout={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
                        >
                            <ThemeImage
                                src={layoutImage('bottom_bar_memenu_bg.png')}
                                layout={{ position: 'absolute', left: 0, width: 45, height: 45 }}
                            />
                            <AvatarImage
                                figure={ownFigure}
                                gender={ownGender}
                                direction={3}
                                headOnly
                                layout={{ marginTop: 20, marginLeft: -0.5 }}
                            />
                            {/* The head render keeps its own size; the 45x45 box centres it, shifts it up
                                (the Flash `center -8px` background position) and clips the rest. */}
                            <ThemeImage
                                src={layoutImage('bottom_bar_memenu_circle.png')}
                                layout={{ position: 'absolute', left: 0, width: 45, height: 45 }}
                            />
                        </Box>
                        <ThemeImage src={layoutImage('bottom_bar_wired_menu.png')} />
                        <ThemeImage src={layoutImage('bottom_bar_camera.png')} />
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
                    </Box>
                    <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: 15, height: '100%' }}>
                        <ThemeImage
                            name="line"
                            src={layoutImage('bottom_bar_divider_1px.png')}
                            layout={{ width: 1, height: 40 }}
                        />
                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleWindow('friendlist')}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-friendall"
                                layout={{}}
                            />
                        </Box>
                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleWindow('friendlist', { tab: 'search' })}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-friendsearch"
                                layout={{}}
                            />
                        </Box>
                        <ThemeImage
                            src={rightSideCollapsed ? '/assets/flash/toolbar/collapse_right_active.png' : '/assets/flash/toolbar/collapse_right.png'}
                            width={14}
                            height={43}
                            cursor="pointer"
                            onPointerTap={() => setRightSideCollapsed(prev => !prev)}
                        />
                    </Box>
                </Border>
            </Box>
        </>
    );
};
