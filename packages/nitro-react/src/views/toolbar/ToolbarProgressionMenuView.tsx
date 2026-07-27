import { forwardRef } from 'react';

import { NitroIcon } from '#base/components';
import { useLocalizationStore } from '#base/stores';

export const ToolbarProgressionMenuView = forwardRef<HTMLDivElement>((props, ref) => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-daily-tasks" />
                <span>{ getLocalizationValue('widget.progmenu.dailytasks') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-tasks" />
                <span>{ getLocalizationValue('widget.progmenu.quests') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-achievements" />
                <span>{ getLocalizationValue('widget.progmenu.achievements') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-leaderboard" />
                <span>{ getLocalizationValue('widget.progmenu.leaderboards') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-introduction" />
                <span>{ getLocalizationValue('widget.progmenu.introduction') }</span>
            </div>
        </div>
    );
});
