/**
 * Selling on the marketplace from the inventory - Flash's `inventory/marketplace/MarketplaceModel`
 * and the dialog state of its `MarketplaceView`:
 *
 * - the configuration `MarketplaceConfigurationEvent` brings (`isEnabled` ... `halfTaxLimit`)
 *   and whether it has arrived (`HabboInventory.setInventoryCategoryInit('marketplace')`);
 * - the offer being made: the group it is made from (`_offerGroup`, by the group's id), the items
 *   locked for it once the server allows the offer (`_offerItems`), whether a token purchase is
 *   pending (`§_-S1R§`), and which furni the stats were asked for (`§_-F2C§` / `§_-G11§`);
 * - the view on show: `make_marketplace_offer` (with how many of the item may go in one offer)
 *   or `buy_marketplace_tokens` (with the batch's price and size), and the stats that arrived for
 *   the offer's furni (`updateItemStats`).
 */
import { StateCreator } from 'zustand';

import { MarketplaceItemStats } from '#base/utils';

import { InventoryFurniItem } from './InventoryFurniGroup';

/** `MarketplaceConfigurationEvent`, as `IncomingMessages.onMarketplaceConfiguration` writes it onto the model. */
export interface InventoryMarketplaceConfiguration {
    isEnabled: boolean;
    commission: number;
    tokenBatchPrice: number;
    tokenBatchSize: number;
    offerMinPrice: number;
    offerMaxPrice: number;
    expirationHours: number;
    averagePricePeriod: number;
    sellingFeePercentage: number;
    revenueLimit: number;
    halfTaxLimit: number;
}

/** What `MarketplaceView` shows: the offer dialog for an item, or the token offer. */
export type InventoryMarketplaceView
    = | { kind: 'make_offer'; item: InventoryFurniItem; maxAmount: number }
        | { kind: 'buy_tokens'; price: number; count: number };

type State = {
    marketplaceConfiguration: InventoryMarketplaceConfiguration;
    marketplaceCategoryInitialized: boolean;
    marketplaceOfferGroupId: number;
    marketplaceOfferItems: readonly InventoryFurniItem[] | undefined;
    marketplaceBuyingTokens: boolean;
    marketplaceStatsCategory: number;
    marketplaceStatsFurniTypeId: number;
    marketplaceView: InventoryMarketplaceView | undefined;
    marketplaceViewStats: MarketplaceItemStats | undefined;
};

type Actions = {
    setMarketplaceConfiguration: (configuration: InventoryMarketplaceConfiguration) => void;
    setMarketplaceOfferGroupId: (groupId: number) => void;
    setMarketplaceOfferItems: (items: readonly InventoryFurniItem[] | undefined) => void;
    setMarketplaceBuyingTokens: (buyingTokens: boolean) => void;
    setMarketplaceStatsRequest: (category: number, furniTypeId: number) => void;
    setMarketplaceView: (view: InventoryMarketplaceView | undefined) => void;
    setMarketplaceViewStats: (stats: MarketplaceItemStats | undefined) => void;
};

export const InventoryMarketplaceSliceInitialState: State = {
    marketplaceConfiguration: {
        isEnabled: false, commission: 0, tokenBatchPrice: 0, tokenBatchSize: 0, offerMinPrice: 0, offerMaxPrice: 0, expirationHours: 0,
        averagePricePeriod: 0, sellingFeePercentage: 0, revenueLimit: 0, halfTaxLimit: 0,
    },
    marketplaceCategoryInitialized: false,
    marketplaceOfferGroupId: -1,
    marketplaceOfferItems: undefined,
    marketplaceBuyingTokens: false,
    marketplaceStatsCategory: 0,
    marketplaceStatsFurniTypeId: 0,
    marketplaceView: undefined,
    marketplaceViewStats: undefined,
};

export type InventoryMarketplaceSlice = State & Actions;

export const createInventoryMarketplaceSlice: StateCreator<InventoryMarketplaceSlice, [], [], InventoryMarketplaceSlice> = set => ({
    ...InventoryMarketplaceSliceInitialState,
    setMarketplaceConfiguration: marketplaceConfiguration => set({ marketplaceConfiguration, marketplaceCategoryInitialized: true }),
    setMarketplaceOfferGroupId: marketplaceOfferGroupId => set({ marketplaceOfferGroupId }),
    setMarketplaceOfferItems: marketplaceOfferItems => set({ marketplaceOfferItems }),
    setMarketplaceBuyingTokens: marketplaceBuyingTokens => set({ marketplaceBuyingTokens }),
    setMarketplaceStatsRequest: (marketplaceStatsCategory, marketplaceStatsFurniTypeId) => set({ marketplaceStatsCategory, marketplaceStatsFurniTypeId }),
    setMarketplaceView: marketplaceView => set({ marketplaceView, marketplaceViewStats: undefined }),
    setMarketplaceViewStats: marketplaceViewStats => set({ marketplaceViewStats }),
});
