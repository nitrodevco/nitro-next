/**
 * What the inventory's bots page does - the public methods of Flash `inventory/bots/BotsModel`
 * that talk to the server or the room engine: `requestInventory` (through
 * `HabboInventory.checkCategoryInitilization`) and `placeItemToRoom`.
 *
 * `placeItemToRoom` gates on `RoomSession.areBotsAllowed` and then on `isRoomOwner`, and in this
 * revision both getters return the same field: a bot can only be placed by the room's owner, and
 * only by dragging it in through the object mover. The `PlaceBotComposer` branch behind them
 * cannot be reached, so the port keeps the one gate and the packet is composed but never sent
 * from here.
 */
import { RoomObjectCategoryEnum, RoomObjectPlacementSource, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { GetBotInventoryComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';
import { roomStore } from '#base/context/room';

import { initializeRoomObjectInsert } from './catalogPlacementCommands';
import { hideInventoryForPlacement } from './inventoryCommands';

type Send = WebSocketConnection['send'];

/** `BotsModel.requestInventory`. */
export const requestBotInventory = (send: Send) => send(new GetBotInventoryComposer({}));

/** `HabboInventory.checkCategoryInitilization('bots')`: asks for the list unless one has arrived. */
export const checkBotInventoryInitialization = (send: Send) => {
    if (inventoryStore.getState().botListInitialized) return;

    requestBotInventory(send);
};

/**
 * `BotsModel.placeItemToRoom`: the room's owner drags the bot in through the object mover, which
 * hides the inventory until it is dropped. Returns whether the drag started.
 */
export const placeInventoryBotToRoom = (botId: number): boolean => {
    const { bots } = inventoryStore.getState();
    const bot = bots.find(held => held.id === botId);

    if (!bot) return false;

    if (!roomStore.getState().isRoomOwner) return false;

    // The mover's object id is the bot's own, negated, so it can never be a real room object, and
    // the insert's type is the room object's user type.
    if (!initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, -bot.id, RoomObjectCategoryEnum.Unit, RoomObjectUserType.RentableBot, bot.figure)) return false;

    hideInventoryForPlacement();

    return true;
};
