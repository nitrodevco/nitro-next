/**
 * The WIRED Link window's packets - Flash `WiredLinkController.onOpen`, `onConfiguration`,
 * `onResult`, `onConnections` and `onInvalidated` - and its `REOE_REMOVED` / `REOE_UPDATED`
 * listeners, as the furni packets that cause them: the Link leaving the room, or changing hands,
 * closes the window. These run after the room's own furni handlers, so the model is current.
 */
import {
    ObjectRemoveMessage, ObjectRemoveMultipleMessage, ObjectUpdateMessage, WiredLinkConfigurationInvalidatedMessage, WiredLinkConfigurationMessage, WiredLinkConnectionsMessage, WiredLinkOpenMessage,
    WiredLinkOperationResultMessage,
} from '@nitrodevco/nitro-packets';

import { onWiredLinkConfiguration, onWiredLinkConnections, onWiredLinkInvalidated, onWiredLinkObjectChanged, onWiredLinkOpen, onWiredLinkOperationResult } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredLinkHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(WiredLinkOpenMessage, data => onWiredLinkOpen(send, data.furniId)),
    on(WiredLinkConfigurationMessage, data => onWiredLinkConfiguration(data)),
    on(WiredLinkOperationResultMessage, data => onWiredLinkOperationResult(data)),
    on(WiredLinkConnectionsMessage, data => onWiredLinkConnections(data)),
    on(WiredLinkConfigurationInvalidatedMessage, data => onWiredLinkInvalidated(data)),
    on(ObjectUpdateMessage, data => onWiredLinkObjectChanged(data.floorItem.objectId, false)),
    on(ObjectRemoveMessage, data => onWiredLinkObjectChanged(data.objectId, true)),
    on(ObjectRemoveMultipleMessage, (data) => {
        for (const objectId of data.objectIds) onWiredLinkObjectChanged(objectId, true);
    }),
]);
