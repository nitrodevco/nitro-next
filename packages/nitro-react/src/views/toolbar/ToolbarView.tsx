import { useRef, useState } from 'react';

import { Base, NitroIcon } from '#base/components';
import { AvatarImage } from '#base/components/AvatarImage';
import { useOwnUserFigure, useOwnUserGender } from '#base/context';
import { useLocalizationStore } from '#base/stores';
import { cn } from '#base/utils';

import { ToolbarMeMenuView } from './ToolbarMeMenuView';
import { ToolbarProgressionMenuView } from './ToolbarProgressionMenuView';

export const ToolbarView = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const [isMeExpanded, setMeExpanded] = useState(false);
    const [isProgressionExpanded, setProgressionExpanded] = useState(false);
    const [leftSideCollapsed, setLeftSideCollapsed] = useState(false);
    const [rightSideCollapsed, setRightSideCollapsed] = useState(false);
    const ownFigure = useOwnUserFigure();
    const ownGender = useOwnUserGender();
    const meElementRef = useRef<HTMLDivElement>(null);
    const progressionElementRef = useRef<HTMLDivElement>(null);

    const toggleMenu = (menu: string) => {
        setMeExpanded(menu == 'me' && !isMeExpanded);
        setProgressionExpanded(menu == 'progression' && !isProgressionExpanded);
    };

    return (
        <>
            {isMeExpanded && <ToolbarMeMenuView ref={meElementRef} />}
            {isProgressionExpanded && <ToolbarProgressionMenuView ref={progressionElementRef} />}
            <div className="nitro-toolbar">
                <div className={cn('toolbar-left', leftSideCollapsed && 'collapsed')}>
                    <div className={cn('toolbar-collapse', leftSideCollapsed && 'active')} onClick={_ => setLeftSideCollapsed(prev => !prev)} />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.exitroom.hotelview') } icon="icon-habbo" />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.navigator') } icon="icon-rooms" />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.progression') } icon="icon-progression" onClick={_ => toggleMenu('progression')} />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.catalogue') } icon="icon-catalog" />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.builder') } icon="icon-builders-club" />
                    <NitroIcon tooltipContent={ getLocalizationValue('toolbar.icon.label.inventory') } icon="icon-inventory" />
                    <Base className="nitro-icon icon-me-circle avatar-image" tooltipContent={ getLocalizationValue('toolbar.icon.label.memenu') } onClick={_ => toggleMenu('me')} >
                        <AvatarImage figure={ownFigure} gender={ownGender} direction={3} />
                    </Base>
                    <NitroIcon tooltipContent={ getLocalizationValue('camera.interface.wiredmenu', 'Wired menu') } icon="icon-wired" />
                    <NitroIcon tooltipContent={ getLocalizationValue('camera.interface.title') } icon="icon-camera" />
                </div>
                <div className="toolbar-right">
                    <NitroIcon tooltipContent={ getLocalizationValue('friend.bar.friends.title') } icon="icon-friendall" />
                    <NitroIcon tooltipContent={ getLocalizationValue('friend.bar.search.title') } icon="icon-friendsearch" />
                    <div className={cn('toolbar-collapse', rightSideCollapsed && 'active')} onClick={_ => setRightSideCollapsed(!rightSideCollapsed)} />
                </div>
            </div>
        </>
    );
};
