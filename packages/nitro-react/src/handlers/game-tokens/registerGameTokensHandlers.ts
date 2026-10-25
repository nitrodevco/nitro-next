/**
 * `HabboCatalog`'s `SnowWarGameTokensMessageEvent` (`onSnowWarGameTokenOffer`): the game token
 * offers the games UI asked for with `GetSnowWarGameTokensOfferComposer`, kept in
 * `gameTokensStore` for `buySnowWarTokensOffer`.
 */
import { SnowWarGameTokensMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { gameTokensStore } from '#base/context/game-tokens';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerGameTokensHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setGameTokensOffers } = gameTokensStore.getState();

    return subscribeAll(subscribe, [
        on(SnowWarGameTokensMessage, data => setGameTokensOffers(data.offers)),
    ]);
};
