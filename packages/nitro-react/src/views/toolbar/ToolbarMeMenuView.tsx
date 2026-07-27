import { forwardRef } from 'react';

import { NitroIcon } from '#base/components';
import { useLocalizationStore } from '#base/stores';

export const ToolbarMeMenuView = forwardRef<HTMLDivElement>((props, ref) => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-profile" />
                <span>{ getLocalizationValue('widget.memenu.profile') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-rooms" />
                <span>{ getLocalizationValue('widget.memenu.myrooms') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-clothing" />
                <span>{ getLocalizationValue('widget.memenu.myclothes') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-forums" />
                <span>{ getLocalizationValue('widget.memenu.forums') }</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-me-collectibles" />
                <span>{ getLocalizationValue('memenu.collectibles') }</span>
            </div>
        </div>
    );
});
