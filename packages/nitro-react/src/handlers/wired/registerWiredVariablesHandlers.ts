/**
 * The two answers of the wired variables synchronization - `WiredVariablesSynchronizer`'s
 * listeners. The state machine they drive is in `commands/wiredSynchronizerCommands.ts`; both
 * packets are ignored unless they answer a request that is still waiting.
 */
import { WiredAllVariablesDiffsMessage, WiredAllVariablesHashMessage } from '@nitrodevco/nitro-packets';

import { onWiredAllVariablesDiffs, onWiredAllVariablesHash } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredVariablesHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(WiredAllVariablesHashMessage, data => onWiredAllVariablesHash(send, data.allVariablesHash)),

    on(WiredAllVariablesDiffsMessage, data => onWiredAllVariablesDiffs(data)),
]);
