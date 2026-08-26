import { forwardRef } from 'react';

import { useSystemActions, useTranslation } from '#base/context';
import { NitroIcon } from '#base/theme';

type ToolbarProgressionMenuProps = {
    onClicked: () => void;
}

export const ToolbarProgressionMenu = forwardRef<HTMLDivElement, ToolbarProgressionMenuProps>(({ onClicked }, ref) => {
    const t = useTranslation();
    const { toggleWindow } = useSystemActions();

    const openWindow = (windowName: string) => {
        toggleWindow(windowName);
        onClicked();
    }

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-daily-tasks" />
                <span>{t('widget.progmenu.dailytasks')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-tasks" />
                <span>{t('widget.progmenu.quests')}</span>
            </div>
            <div className="toolbar-menu-button" onClick={ () => openWindow('achievements') }>
                <NitroIcon icon="icon-progression-achievements" />
                <span>{t('widget.progmenu.achievements')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-leaderboard" />
                <span>{t('widget.progmenu.leaderboards')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-introduction" />
                <span>{t('widget.progmenu.introduction')}</span>
            </div>
        </div>
    );
});
