import { createPortal } from 'react-dom';

import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';

export const RoomWidgets = () => {
    return (
        createPortal(
            <>
                <RoomObjectMenuWidget />
                <div className="absolute right-1 bottom-[calc(var(--spacing-toolbar-h)+4px)] z-30">
                    <RoomObjectInfostandWidget />
                </div>
            </>,
            document.getElementById('ui-container') as Element,
        )
    );
};
