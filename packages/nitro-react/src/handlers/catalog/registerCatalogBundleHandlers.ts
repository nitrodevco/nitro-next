/**
 * The bundle discount ruleset - `HabboCatalog.onBundleDiscountRulesetMessageEvent`, the answer to
 * the `GetBundleDiscountRulesetComposer` `init()` sends (`initBundleDiscounts`, sent here with the
 * rest of `init()`'s requests by `CatalogComponent`). The ruleset and its flat price steps go into
 * `CatalogBundleDiscountSlice`, where the product view and the spinner read them.
 */
import { BundleDiscountRulesetMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogBundleHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setBundleDiscountRuleset } = store.getState();

    return subscribeAll(subscribe, [
        on(BundleDiscountRulesetMessage, data => setBundleDiscountRuleset(data.bundleDiscountRuleset)),
    ]);
};
