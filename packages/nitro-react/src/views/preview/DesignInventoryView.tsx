/**
 * The inventory in the preview host's design window, drawn by the game's own `InventoryView` with sample
 * badges and furni (`useSampleInventory`) on the state's tab, so its grid items are drawn inside it and a
 * press names them (`DesignPreviewView`). Not a Flash feature.
 */
import { useEffect } from 'react';

import { systemStore } from '#base/context/system';
import { InventoryView } from '#base/views/inventory/InventoryView';

import { useSampleInventory } from './designSamples';
import { designState, INVENTORY_WINDOW } from './designStates';

export const DesignInventoryView = ({ state }: { state: string }) => {
    useSampleInventory();

    useEffect(() => {
        const tab = designState(INVENTORY_WINDOW, state)?.tab ?? 'furni';

        systemStore.getState().showWindow('inventory', { tab: tab as 'furni' });
    }, [ state ]);

    return <InventoryView />;
};
