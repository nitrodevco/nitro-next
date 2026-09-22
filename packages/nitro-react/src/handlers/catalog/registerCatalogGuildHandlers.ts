/**
 * `HabboCatalog.onGuildMemberships` -> `GuildMembershipsController.onGuildMembershipsMessageEvent`:
 * the user's groups go to the guild selector widget that registered for them (`CatalogGuildSlice`),
 * which fills its list, picks the favourite group and then the page's first offer. With no widget
 * registered the answer is not the catalogue's - the wired group elements ask for the same packet
 * (`handlers/wired/registerWiredSetupHandlers`).
 */
import { GuildMembershipsMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogGuildHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(GuildMembershipsMessage, (data) => {
        const widget = store.getState().guildSelectorWidget;

        if (!widget) return;

        widget.populateAndSelectFavorite(data.guilds.slice());
        widget.selectFirstOffer();
    }),
]);
