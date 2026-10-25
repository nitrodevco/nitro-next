/**
 * The inventory's bot list - the bots half of Flash `inventory/IncomingMessages`
 * (`onBotInventory`, `onBotAdded`, `onBotRemoved`) and what `BotsModel` does with each. The list is
 * one packet, not fragments.
 */
import { BotAddedToInventoryEventMessage, BotInventoryEventMessage, BotRemovedFromInventoryEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerInventoryBotsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateBots, addBot, removeBot } = inventoryStore.getState();

    return subscribeAll(subscribe, [
        on(BotInventoryEventMessage, data => updateBots(data.items)),

        on(BotAddedToInventoryEventMessage, data => addBot(data.item)),

        on(BotRemovedFromInventoryEventMessage, data => removeBot(data.itemId)),
    ]);
};
