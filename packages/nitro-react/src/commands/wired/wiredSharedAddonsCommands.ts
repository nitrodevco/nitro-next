/**
 * The variable share add-on's "Synchronize" button - `VariableAddonShareAddon.synchronize`: the
 * server is asked to pass the add-ons the box shares on to the rooms importing them, for the box
 * being edited (`getCurrentWiredId`).
 */
import { SynchronizeSharedAddonsComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { wiredStore } from '#base/context/wired';

export const synchronizeSharedAddons = (send: Send) => {
    const { setup } = wiredStore.getState();

    if (!setup) return;

    send(new SynchronizeSharedAddonsComposer({ wiredId: setup.triggerable.id }));
};
