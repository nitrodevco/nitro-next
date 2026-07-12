import { useRoomObjectRollOut, useRoomObjectRollOver } from "#base/hooks";

import { RoomObjectInfostandWrapper } from "./RoomObjectInfostandWrapper";

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
                <RoomObjectInfostandWrapper />
            </div>
        </>
    );
}