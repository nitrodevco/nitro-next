import { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useRoomObjectDeselected, useRoomObjectSelected } from "#base/hooks";

import { RoomObjectInfostand } from "./RoomObjectInfostand";

export const RoomObjectInfostandWrapper = () => {
    const [selectedObjectId, setSelectedObjectId] = useState<number>(-1);
    const [selectedObjectCategory, setSelectedObjectCategory] = useState<RoomObjectCategoryEnum>(RoomObjectCategoryEnum.Minimum);

    const onClose = () => {
        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    }

    useRoomObjectDeselected(event => {
        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    })

    useRoomObjectSelected(event => {
        setSelectedObjectId(event.objectId);
        setSelectedObjectCategory(event.category);
    });

    if (selectedObjectId < 0) return null;

    return (
        <div className="relative flex flex-col min-w-[190px] min-h-[190px] max-w-[190px] max-h-[190px] size-full [border-image-source:var(--infostand-bg-image)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px] p-1 pointer-events-auto font-goldfish gap-1">
            <RoomObjectInfostand selectedObjectId={selectedObjectId} selectedObjectCategory={selectedObjectCategory} onClose={onClose} />
        </div>);
}