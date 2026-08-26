import { forwardRef } from 'react';

import { useSystemActions, useTranslation } from '#base/context';
import { NitroIcon } from '#base/theme';

type ToolbarMeMenuProps = {
    onClicked: () => void;
}

export const ToolbarMeMenu = forwardRef<HTMLDivElement, ToolbarMeMenuProps>(({ onClicked }, ref) => {
    const t = useTranslation();
    const { toggleWindow } = useSystemActions();

    const openWindow = (windowName: string) => {
        toggleWindow(windowName);
        onClicked();
    }

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-profile" />
                <span>{t('widget.memenu.profile')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-rooms" />
                <span>{t('widget.memenu.myrooms')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-clothing" />
                <span>{t('widget.memenu.myclothes')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-forums" />
                <span>{t('widget.memenu.forums')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-collectibles" />
                <span>{t('memenu.collectibles')}</span>
            </div>
        </div>
    );
});
