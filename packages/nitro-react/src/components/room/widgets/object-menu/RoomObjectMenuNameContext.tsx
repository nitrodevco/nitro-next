import type { IRoomObjectNameData } from "@nitrodevco/nitro-api";
import { createContext } from "react";

export type RoomObjectMenuNameContextValue = {
    nameData: IRoomObjectNameData;
}

export const RoomObjectMenuNameContext = createContext<RoomObjectMenuNameContextValue | undefined>(undefined);
