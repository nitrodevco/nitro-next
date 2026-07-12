import { createPortal } from "react-dom"

import { RoomObjectInfoWidget } from "./object-info"

export const RoomWidgets = () => {
    return (createPortal(<>
        <RoomObjectInfoWidget />
    </>, document.getElementById('ui-container') as Element)
    );
}