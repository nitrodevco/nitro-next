/**
 * `VariablesWebApiAddon.onWiredApiKeyResultEvent` - a web api key the server generated. Flash's
 * element listens for it itself and takes it only when it is for the box being edited
 * (`getCurrentWiredId`); here the key goes into that box's form, the read or the write key.
 */
import { WiredWebApiKeyResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { wiredStore } from '#base/context/wired';
import { AddonCodes, applyWiredWebApiKey, VariablesWebApiAddonForm } from '#base/wired';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredWebApiKeyHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setSetupForm } = wiredStore.getState();

    return subscribeAll(subscribe, [
        on(WiredWebApiKeyResultMessage, (data) => {
            const { setup } = wiredStore.getState();

            if (!setup || (setup.triggerable.id !== data.wiredId)) return;

            const { definition } = setup.entry;

            if ((definition.holder !== 'addon') || (definition.code !== AddonCodes.VARIABLES_WEB_API)) return;

            setSetupForm(form => applyWiredWebApiKey(form as VariablesWebApiAddonForm, data.isReadKey, data.key));
        }),
    ]);
};
