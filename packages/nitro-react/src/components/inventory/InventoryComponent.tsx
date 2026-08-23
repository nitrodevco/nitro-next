import { useIsWindowVisible } from '#base/context/system';
import { InventoryViewPixi } from '#base/views-pixi/inventory/InventoryViewPixi';

export const InventoryComponent = () => {
    const isVisible = useIsWindowVisible('inventory');

    if (!isVisible) return null;

    return <InventoryViewPixi />;
};
