/**
 * The variables web api addon's key requests - `VariablesWebApiAddon.onClickGeneratedReadKey` /
 * `onClickGeneratedWriteKey`: the server generates the key for the box being edited
 * (`getCurrentWiredId`) and answers with `WiredWebApiKeyResultMessage`, which
 * `registerWiredWebApiKeyHandlers` writes into the box's form.
 */
import { WiredGenerateWebApiKeyComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { wiredStore } from '#base/context/wired';

export const generateWiredWebApiKey = (send: WebSocketConnection['send'], isReadKey: boolean) => {
    const { setup } = wiredStore.getState();

    if (!setup) return;

    send(new WiredGenerateWebApiKeyComposer({ wiredId: setup.triggerable.id, isReadKey }));
};
