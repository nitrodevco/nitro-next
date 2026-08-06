import type { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { createContext } from "react";

export type ObjectInfostandContextValue = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

export const ObjectInfostandContext = createContext<ObjectInfostandContextValue | undefined>(undefined);
