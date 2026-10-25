import { FigureSetIdsEventMessage } from '@nitrodevco/nitro-packets';

import { onPurchasableClothingFigureSetIds } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `FurnitureContextMenuWidgetHandler.onFigureSetIds`: the server's answer to binding clothing furni
 * is the owned sets and bound furni again, and the figure the dialog showed goes on when it lists
 * the furni.
 */
export const registerRoomPurchasableClothingHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(FigureSetIdsEventMessage, data => onPurchasableClothingFigureSetIds(send, data.boundFurnitureNames)),
]);
