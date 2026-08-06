import { useContext } from "react";

import { InventoryContext } from "./InventoryContext";

export const useInventoryContext = () => {
    const ctx = useContext(InventoryContext);

    if (!ctx) throw new Error("useInventoryContext must be used within InventoryComponent");

    return ctx;
}
