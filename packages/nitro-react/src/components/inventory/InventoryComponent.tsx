import { useIsWindowVisible } from '#base/context/system';
import { InventoryView } from '#base/views-pixi/inventory/InventoryView';

export const InventoryComponent = () => {
    const isVisible = useIsWindowVisible('inventory');

    if (!isVisible) return null;

    return <InventoryView />;
};
