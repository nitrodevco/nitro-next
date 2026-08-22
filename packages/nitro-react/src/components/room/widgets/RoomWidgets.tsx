import { createPortal } from "react-dom"

import { RoomDoorbellWidget } from "./doorbell";
import { RoomObjectInfostandWidget } from '#base/components';
import { RoomObjectMenuWidget } from "./object-menu";


export const RoomWidgets = () => {
    return (createPortal(<>
        <RoomObjectMenuWidget />
        <RoomDoorbellWidget />
        <div className="absolute right-1 bottom-[calc(var(--spacing-toolbar-h)+4px)] z-30">
            <RoomObjectInfostandWidget />
        </div>
    </>, document.getElementById('ui-container') as Element)
    );
}
