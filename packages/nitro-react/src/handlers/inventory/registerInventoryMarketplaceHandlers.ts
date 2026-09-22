/**
 * The marketplace packets the inventory's `IncomingMessages` hands to its `MarketplaceModel`:
 *
 * - `MarketplaceConfigurationMessage`: the configuration onto the model, and the marketplace
 *   category counts as initialised (`onMarketplaceConfiguration`).
 * - `MarketplaceCanMakeOfferResultMessage`: `proceedOfferMaking` - the offer dialog, an alert or
 *   the token offer.
 * - `MarketplaceMakeOfferResultMessage`: `endOfferMaking` - the result alert.
 * - `MarketplaceItemStatsMessage`: `setItemStats`, for the offer dialog's price lines.
 * - `NotEnoughBalanceMessage`: `onNotEnoughCredits` - a token purchase that failed gives up.
 * - `UserRightsMessage`: with the configuration already held, it is asked for again
 *   (`onUserRights` -> `requestInitialization`), as rights change what the marketplace allows.
 *
 * The catalogue answers `MarketplaceConfigurationMessage`, `MarketplaceMakeOfferResultMessage`
 * and `MarketplaceItemStatsMessage` too, for its own side (`registerCatalogMarketplaceHandlers`).
 */
import { MarketplaceCanMakeOfferResultMessage, MarketplaceConfigurationMessage, MarketplaceItemStatsMessage, MarketplaceMakeOfferResultMessage, NotEnoughBalanceMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';

import { endMarketplaceOfferMaking, onMarketplaceNotEnoughCredits, proceedMarketplaceOfferMaking, requestMarketplaceConfiguration, setMarketplaceOfferItemStats } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';
import { createMarketplaceItemStats } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerInventoryMarketplaceHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setMarketplaceConfiguration } = inventoryStore.getState();

    return subscribeAll(subscribe, [
        on(MarketplaceConfigurationMessage, data => setMarketplaceConfiguration({
            isEnabled: data.isEnabled,
            commission: data.commission,
            tokenBatchPrice: data.tokenBatchPrice,
            tokenBatchSize: data.tokenBatchSize,
            offerMinPrice: data.offerMinPrice,
            offerMaxPrice: data.offerMaxPrice,
            expirationHours: data.expirationHours,
            averagePricePeriod: data.averagePricePeriod,
            sellingFeePercentage: data.sellingFeePercentage,
            revenueLimit: data.revenueLimit,
            halfTaxLimit: data.halfTaxLimit,
        })),

        on(MarketplaceCanMakeOfferResultMessage, data => proceedMarketplaceOfferMaking(send, data.resultCode)),

        on(MarketplaceMakeOfferResultMessage, data => endMarketplaceOfferMaking(data.result)),

        on(MarketplaceItemStatsMessage, data => setMarketplaceOfferItemStats(createMarketplaceItemStats(data))),

        on(NotEnoughBalanceMessage, () => onMarketplaceNotEnoughCredits()),

        on(UserRightsMessage, () => {
            if (inventoryStore.getState().marketplaceCategoryInitialized) requestMarketplaceConfiguration(send);
        }),
    ]);
};
