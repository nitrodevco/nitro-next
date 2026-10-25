/**
 * `window/utils/ElementPointerHandler`: the server points the hint arrow at an element of the UI by
 * its key (`HabboWindowManagerComponent.showHint`), or takes it away with an empty key (`hideHint`).
 * A key no view has registered shows nothing.
 */
import { ElementPointerMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { hintStore } from '#base/context/hints';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerElementPointerHandlers = ({ subscribe }: WebSocketConnection) => {
    const { showHint, hideHint } = hintStore.getState();

    return subscribeAll(subscribe, [
        on(ElementPointerMessage, (data) => {
            if (!data.key) hideHint();
            else showHint(data.key);
        }),
    ]);
};
