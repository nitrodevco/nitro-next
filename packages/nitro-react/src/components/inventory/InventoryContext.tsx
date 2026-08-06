import { createContext } from "react";

export type InventoryContextValue = {
    close: () => void;
}

export const InventoryContext = createContext<InventoryContextValue | undefined>(undefined);
