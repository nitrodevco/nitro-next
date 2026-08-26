import { useRef, useState } from 'react';

import { AvatarImage } from '#base/components/AvatarImage';
import { useOwnUserFigure, useOwnUserGender, useSystemActions } from '#base/context';
import { cn, NitroIcon } from '#base/theme';

import { ToolbarMeMenu } from './ToolbarMeMenu';
import { ToolbarProgressionMenu } from './ToolbarProgressionMenu';

export const ToolbarView = () => {
    const [isMeExpanded, setMeExpanded] = useState(false);
    const [isProgressionExpanded, setProgressionExpanded] = useState(false);
    const [leftSideCollapsed, setLeftSideCollapsed] = useState(false);
    const [rightSideCollapsed, setRightSideCollapsed] = useState(false);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const meElementRef = useRef<HTMLDivElement>(null);
    const progressionElementRef = useRef<HTMLDivElement>(null);
    const { toggleWindow } = useSystemActions();

    const toggleMenu = (menu: string) => {
        setMeExpanded(menu == 'me' && !isMeExpanded);
        setProgressionExpanded(menu == 'progression' && !isProgressionExpanded);
    };

    return (
        <>
            {isMeExpanded && <ToolbarMeMenu ref={meElementRef} onClicked={ () => setMeExpanded(false) } />}
            {isProgressionExpanded && <ToolbarProgressionMenu ref={progressionElementRef} onClicked={ () => setProgressionExpanded(false) } />}
            <div className="nitro-toolbar">
                <div className={cn('toolbar-left', leftSideCollapsed && 'collapsed')}>
                    <div className={cn('toolbar-collapse', leftSideCollapsed && 'active')} onClick={_ => setLeftSideCollapsed(prev => !prev)} />
                    <NitroIcon icon="icon-habbo" />
                    <NitroIcon icon="icon-rooms" onClick={() => toggleWindow('navigator')} />
                    <NitroIcon icon="icon-progression" onClick={_ => toggleMenu('progression')} />
                    <NitroIcon icon="icon-catalog" onClick={() => toggleWindow('catalog')} />
                    <NitroIcon icon="icon-builders-club" />
                    <NitroIcon icon="icon-inventory" onClick={() => toggleWindow('inventory')} />
                    <div className="nitro-icon icon-me-circle avatar-image" onClick={_ => toggleMenu('me')} >
                        <AvatarImage figure={ownFigure} gender={ownGender} direction={3} />
                    </div>
                    <NitroIcon icon="icon-wired" />
                    <NitroIcon icon="icon-camera" />
                </div>
                <div className="toolbar-right">
                    <NitroIcon icon="icon-friendall" onClick={() => toggleWindow('friendlist')} />
                    <NitroIcon icon="icon-friendsearch" onClick={() => toggleWindow('friendlist', { tab: 'search' })} />
                    <div className={cn('toolbar-collapse', rightSideCollapsed && 'active')} onClick={_ => setRightSideCollapsed(!rightSideCollapsed)} />
                </div>
            </div>
        </>
    );
};
