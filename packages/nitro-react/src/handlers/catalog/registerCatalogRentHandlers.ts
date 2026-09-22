/**
 * `RentConfirmationWindow`'s own listener: `FurniRentOrBuyoutOfferMessageEvent`, which it adds to
 * the connection when `HabboCatalog.openRentConfirmationWindow` first creates it and keeps for
 * the session. Registered once with the connection (`registerHandlers`): the infostand and the
 * inventory open the window, outside the catalogue.
 */
import { FurniRentOrBuyoutOfferMessage } from '@nitrodevco/nitro-packets';

import { onFurniRentOrBuyoutOffer } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogRentHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(FurniRentOrBuyoutOfferMessage, data => onFurniRentOrBuyoutOffer(data)),
]);
