/**
 * The inventory in the preview host's design window, drawn by the game's own `InventoryView` with sample
 * badges and furni (`fillSampleInventory`) on the state's tab, so its grid items are drawn inside it and a
 * press names them (`DesignPreviewView`). Not a Flash feature.
 */
import { useEffect } from 'react';

import { useWindowActions } from '#base/context/system';
import { fillSampleInventory } from '#base/preview/designSamples';
import { designState, INVENTORY_WINDOW } from '#base/preview/designStates';
import { usePreviewSample } from '#base/preview/usePreviewSample';
import { InventoryView } from '#base/views/inventory/InventoryView';

export const DesignInventoryView = ({ state }: { state: string }) => {
    const { showWindow } = useWindowActions();

    usePreviewSample(fillSampleInventory);

    useEffect(() => {
        const tab = designState(INVENTORY_WINDOW, state)?.tab ?? 'furni';

        showWindow('inventory', { tab: tab as 'furni' });
    }, [ state ]);

    return <InventoryView />;
};
