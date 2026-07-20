import { useRoomObjectRollOut, useRoomObjectRollOver } from "#base/hooks";

import { RoomObjectInfostand } from "./RoomObjectInfostand";

export const RoomObjectInfoWidget = () => {
    useRoomObjectRollOver(event => {
        // show hover name
    });

    useRoomObjectRollOut(event => {
        // clear hover name
    });

    return (
        <>
            <div className="absolute right-[4px] bottom-[calc(var(--spacing-toolbar-h)+7px)] z-30">
                <RoomObjectInfostand />
            </div>
        </>
    );
}