import { useSystemContext } from "#base/context"
import { InventoryView } from "#base/views/inventory/InventoryView"

import { InventoryContext } from "./InventoryContext";

export const InventoryComponent = () => {
    const { isWindowVisible, toggleWindow } = useSystemContext();

    if (!isWindowVisible('inventory')) return null;

    return (
        <InventoryContext value={{ close: () => toggleWindow('inventory') }}>
            <InventoryView />
        </InventoryContext>
    );
}
