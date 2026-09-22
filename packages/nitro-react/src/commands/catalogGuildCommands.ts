/**
 * The catalogue's group calls - Flash's `GuildMembershipsController.registerGuildSelectorWidget`
 * (the guild selector widgets register when their page is up, and that asks for the user's groups)
 * and `BuyGuildWidget`'s buy button (`GetGuildCreationInfoComposer`, then the catalogue closes).
 */
import { GetGuildCreationInfoComposer, GetGuildMembershipsComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogGuildSelector, CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

type Send = WebSocketConnection['send'];

/** `registerGuildSelectorWidget`: the widget the memberships go to, and the request for them. */
export const registerGuildSelectorWidget = (send: Send, store: StoreApi<CatalogStore>, widget: CatalogGuildSelector) => {
    store.getState().setGuildSelectorWidget(widget);

    send(new GetGuildMembershipsComposer({}));
};

/**
 * `BuyGuildWidget.onButtonClicked`: ask for what the group creator needs
 * (`GuildCreationInfoMessage`, which `HabboGroupsManager` answers by opening its creator) and
 * close the catalogue (`toggleCatalog("NORMAL")`, the catalogue being open). The Google tracking
 * call before it has no counterpart here.
 */
export const startGuildPurchase = (send: Send) => {
    send(new GetGuildCreationInfoComposer({}));

    systemStore.getState().hideWindow('catalog');
};
