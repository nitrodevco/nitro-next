import { useState } from 'react';

import { AvatarImage } from '#base/components';
import { useOwnUserFigure, useOwnUserGender, useSystemActions } from '#base/context';
import { Box, ColorLayer, ThemeImage, NitroIcon } from '#base/theme';

import { ToolbarMeMenuPixi } from './ToolbarMeMenuPixi';
import { ToolbarProgressionMenuPixi } from './ToolbarProgressionMenuPixi';

const ICON_SPACING = 15;

/**
 * Pixi port of theme/ToolbarView.tsx + ToolbarView.css. Deliberately skipped (no Pixi
 * equivalent without new filter/tween infrastructure this package doesn't otherwise use,
 * documented rather than silently dropped): the per-icon hover drop-shadow+translate
 * micro-interaction, the collapse's opacity/margin CSS transition (done here as an instant
 * toggle - simply not rendering the three affected icons when collapsed - matching the
 * established Accordion "no animation" precedent), and the outer bar's inset box-shadow
 * highlight/shade lines. `rightSideCollapsed` toggles only the collapse button's own art in
 * DOM too - `.toolbar-right` has no `.collapsed` CSS rule hiding any icons, unlike
 * `.toolbar-left` - preserved here as the same apparent no-op rather than "fixed" to mirror
 * the left side.
 *
 * The circular toolbar avatar diverges from DOM's mechanism, not just its result: DOM renders
 * the full-body `AvatarImage` and crops/zooms to the head via CSS negative margins + a
 * `clip-path: circle(...)` tuned to that render's exact pixel proportions. Reproducing that
 * math exactly isn't practical without reverse-engineering the renderer's internal crop
 * geometry, so this instead asks `useAvatarImageTexture` for a `headOnly` crop directly and
 * masks it to a circle with the same own-child mask technique ScrollViewport.tsx established -
 * same visual intent (a round headshot icon), simpler path to it.
 */
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
            {isMeExpanded && <ToolbarMeMenuPixi />}
            {isProgressionExpanded && <ToolbarProgressionMenuPixi />}
            <Box layout={{
                position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 54,
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8,
            }}
            >
                <ColorLayer color="rgba(46, 45, 44, 0.76)" />
                <ColorLayer
                    color="rgba(0, 0, 0, 0.3)"
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 1 }}
                />
                <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: ICON_SPACING, height: '100%', paddingRight: ICON_SPACING }}>
                    <ColorLayer
                        color="#525252"
                        layout={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, height: '100%' }}
                    />
                    <ThemeImage
                        src={leftSideCollapsed ? '/assets/flash/toolbar/collapse_left_active.png' : '/assets/flash/toolbar/collapse_left.png'}
                        width={14}
                        height={43}
                        cursor="pointer"
                        onPointerTap={() => setLeftSideCollapsed(prev => !prev)}
                    />
                    {!leftSideCollapsed && (
                        <NitroIcon
                            icon="icon-habbo"
                            layout={{}}
                        />
                    )}
                    {!leftSideCollapsed && (
                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleWindow('navigator')}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-rooms"
                                layout={{}}
                            />
                        </Box>
                    )}
                    {!leftSideCollapsed && (
                        <Box
                            cursor="pointer"
                            onPointerTap={() => toggleMenu('progression')}
                            layout={{}}
                        >
                            <NitroIcon
                                icon="icon-progression"
                                layout={{}}
                            />
                        </Box>
                    )}
                    <Box
                        cursor="pointer"
                        onPointerTap={() => toggleWindow('catalog')}
                        layout={{}}
                    >
                        <NitroIcon
                            icon="icon-catalog"
                            layout={{}}
                        />
                    </Box>
                    <NitroIcon
                        icon="icon-builders-club"
                        layout={{}}
                    />
                    <Box
                        cursor="pointer"
                        onPointerTap={() => toggleWindow('inventory')}
                        layout={{}}
                    >
                        <NitroIcon
                            icon="icon-inventory"
                            layout={{}}
                        />
                    </Box>
                    <Box
                        cursor="pointer"
                        onPointerTap={() => toggleMenu('me')}
                        layout={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ColorLayer color="#262016" />
                        <AvatarImage
                            figure={ownFigure}
                            gender={ownGender}
                            direction={3}
                            headOnly
                        />
                        <NitroIcon
                            icon="icon-me-circle"
                            layout={{ position: 'absolute', top: 0, left: 0 }}
                        />
                    </Box>
                    <NitroIcon
                        icon="icon-wired"
                        layout={{}}
                    />
                    <NitroIcon
                        icon="icon-camera"
                        layout={{}}
                    />
                </Box>
                <Box layout={{ position: 'relative', flexDirection: 'row', alignItems: 'center', gap: ICON_SPACING, height: '100%', paddingLeft: ICON_SPACING }}>
                    <ColorLayer
                        color="#525252"
                        layout={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, height: '100%' }}
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
            </Box>
        </>
    );
};
