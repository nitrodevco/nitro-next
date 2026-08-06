import type { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { createContext } from "react";

export type RoomObjectMenuContextValue = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const RoomObjectMenuContext = createContext<RoomObjectMenuContextValue | undefined>(undefined);
