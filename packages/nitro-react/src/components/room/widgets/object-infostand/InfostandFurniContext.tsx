import type { FurniturePickupMode, IRoomFurnitureData } from "@nitrodevco/nitro-api";
import { createContext } from "react";

export type InfostandFurniContextValue = {
    furniData: IRoomFurnitureData;
    canMove: boolean;
    canRotate: boolean;
    canUse: boolean;
    pickupMode: FurniturePickupMode;
    hasButtons: boolean;
    canSeeFurniId: boolean;
    godMode: boolean;
    processAction: (action: string) => void;
    onClose: () => void;
}

export const InfostandFurniContext = createContext<InfostandFurniContextValue | undefined>(undefined);
