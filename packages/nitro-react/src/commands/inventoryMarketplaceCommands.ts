/**
 * Selling from the inventory - the methods of Flash's `inventory/marketplace/MarketplaceModel`
 * (with `FurniModel.requestSelectedFurniSelling`, `lockAllSellable` and `removeLocksFor`) and the
 * parts of its `MarketplaceView` that open a dialog or an alert. They write the inventory store's
 * `InventoryMarketplaceSlice`; the dialogs are `views/inventory/marketplace`.
 *
 * The flow: `sell` asks the server whether the user may sell (`GetMarketplaceCanMakeOffer`); the
 * answer (`proceedOfferMaking`) locks every sellable item of the group and opens the offer dialog,
 * or says why not, or offers tokens. Posting sends the price, the type and up to the chosen number
 * of the locked items (`MakeOffer`); the result is an alert. Every way out releases the locks.
 */
import { BuyMarketplaceTokensComposer, GetMarketplaceCanMakeOfferComposer, GetMarketplaceConfigurationComposer, GetMarketplaceItemStatsComposer, MakeOfferComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { INVENTORY_FURNI_CATEGORY_POSTER, InventoryFurniGroup, InventoryFurniItem, inventoryStore } from '#base/context/inventory';
import { systemStore } from '#base/context/system';
import { MARKETPLACE_FURNI_TYPE_FLOOR, MARKETPLACE_FURNI_TYPE_WALL, MARKETPLACE_STATS_CATEGORY_FLOOR, MARKETPLACE_STATS_CATEGORY_UNIQUE, MARKETPLACE_STATS_CATEGORY_WALL, MarketplaceItemStats } from '#base/utils';

type Send = WebSocketConnection['send'];

/** `MarketplaceModel.DEFAULT_BULK_OFFER_LIMIT`. */
const DEFAULT_BULK_OFFER_LIMIT = 500;

/** `MarketplaceCanMakeOfferResult`'s codes, as `proceedOfferMaking` switches on them. */
const CAN_MAKE_OFFER_OK = 1;
const CAN_MAKE_OFFER_NO_TRADING_PRIVILEGE = 2;
const CAN_MAKE_OFFER_NO_TRADING_PASS = 3;
const CAN_MAKE_OFFER_NO_TOKENS = 4;
const CAN_MAKE_OFFER_CANCELLED = 5;
const CAN_MAKE_OFFER_TRADING_LOCK = 6;

/** `MarketplaceMakeOfferResult`'s success. */
const MAKE_OFFER_RESULT_OK = 1;

/** `bulkOfferLimit`: `marketplace.bulkOfferLimit`, 500 when unset. */
const getBulkOfferLimit = () => {
    const limit = Number(systemStore.getState().config['marketplace.bulkOfferLimit']) || 0;

    return (limit > 0) ? limit : DEFAULT_BULK_OFFER_LIMIT;
};

const getGroup = (groupId: number): InventoryFurniGroup | undefined => inventoryStore.getState().furniGroups.find(group => group.id === groupId);

/** `GroupItem.getOneForSelling`: the first unlocked sellable item. */
export const getInventoryFurniOneForSelling = (group: InventoryFurniGroup): InventoryFurniItem | undefined => group.items.find(item => !item.locked && item.sellable);

/** `releaseItems`: the offer's items are unlocked and the offer forgotten. */
export const releaseMarketplaceOfferItems = () => {
    const { marketplaceOfferItems, marketplaceOfferGroupId, setFurniItemLocks, setMarketplaceOfferItems, setMarketplaceOfferGroupId } = inventoryStore.getState();

    if (marketplaceOfferItems && (marketplaceOfferGroupId !== -1)) setFurniItemLocks(marketplaceOfferItems.map(item => item.id), false);

    setMarketplaceOfferItems(undefined);
    setMarketplaceOfferGroupId(-1);
};

/** `MarketplaceView.showAlert`: the locks are released as the alert closes (`closeAlert`). */
const showMarketplaceAlert = (title: string, message: string) => {
    const { getLocalizationValue, showAlert } = systemStore.getState();

    showAlert(getLocalizationValue(title), getLocalizationValue(message), { onClose: releaseMarketplaceOfferItems });
};

/** `requestInitialization`: the configuration. */
export const requestMarketplaceConfiguration = (send: Send) => send(new GetMarketplaceConfigurationComposer({}));

/** `HabboInventory.checkCategoryInitilization('marketplace')` - `FurniModel.getWindowContainer` asks for the configuration until it has come. */
export const checkMarketplaceInitialization = (send: Send) => {
    if (inventoryStore.getState().marketplaceCategoryInitialized) return;

    requestMarketplaceConfiguration(send);
};

/** `startOfferMaking`: one offer at a time; the server is asked whether the user may sell. */
const startOfferMaking = (send: Send, group: InventoryFurniGroup) => {
    if (inventoryStore.getState().marketplaceOfferGroupId !== -1) return;

    inventoryStore.getState().setMarketplaceOfferGroupId(group.id);

    send(new GetMarketplaceCanMakeOfferComposer({}));
};

/** `FurniModel.requestSelectedFurniSelling` - the furni page's `sell` button. */
export const requestSelectedFurniSelling = (send: Send) => {
    const { furniGroups, furniSelectedGroupId } = inventoryStore.getState();
    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);

    if (!group || !getInventoryFurniOneForSelling(group)) return;

    startOfferMaking(send, group);
};

/** `getOfferItem`: the first locked item, or before the locks the group's first sellable one. */
const getOfferItem = (): InventoryFurniItem | undefined => {
    const { marketplaceOfferItems, marketplaceOfferGroupId } = inventoryStore.getState();

    if (marketplaceOfferItems && marketplaceOfferItems.length) return marketplaceOfferItems[0];

    const group = getGroup(marketplaceOfferGroupId);

    return group ? getInventoryFurniOneForSelling(group) : undefined;
};

/** `resolveStatsRequestCategory`. */
const resolveStatsCategory = (item: InventoryFurniItem) => {
    if (item.stuffData.uniqueNumber > 0) return MARKETPLACE_STATS_CATEGORY_UNIQUE;

    return item.isWallItem ? MARKETPLACE_STATS_CATEGORY_WALL : MARKETPLACE_STATS_CATEGORY_FLOOR;
};

/** `getItemStats`: the stats of the offer's furni; a poster sends its poster id. */
const requestOfferItemStats = (send: Send) => {
    const item = getOfferItem();

    if (!item) return;

    const category = resolveStatsCategory(item);
    let extraData: string | undefined;

    if (item.category === INVENTORY_FURNI_CATEGORY_POSTER) extraData = item.stuffData ? item.stuffData.getLegacyString() : String(Math.trunc(item.extra));

    inventoryStore.getState().setMarketplaceStatsRequest(category, item.typeId);

    send(new GetMarketplaceItemStatsComposer({ category, furniTypeId: item.typeId, extraData }));
};

/**
 * `proceedOfferMaking` (`MarketplaceCanMakeOfferResult`): 1 locks every sellable item of the group
 * and opens the offer dialog for up to the bulk limit of them, 2 / 3 / 6 say why the user may not
 * sell, 4 offers tokens, 5 gives up.
 */
export const proceedMarketplaceOfferMaking = (send: Send, resultCode: number) => {
    const { marketplaceOfferGroupId, marketplaceConfiguration, setMarketplaceBuyingTokens, setFurniItemLocks, setMarketplaceOfferItems, setMarketplaceView } = inventoryStore.getState();

    setMarketplaceBuyingTokens(false);

    switch (resultCode) {
        case CAN_MAKE_OFFER_OK: {
            const group = getGroup(marketplaceOfferGroupId);

            if (!group) {
                releaseMarketplaceOfferItems();

                return;
            }

            // `FurniModel.lockAllSellable` -> `GroupItem.lockAllSellable`.
            const items = group.items.filter(item => item.sellable && !item.locked);

            setFurniItemLocks(items.map(item => item.id), true);
            setMarketplaceOfferItems(items);

            if (!items.length) {
                releaseMarketplaceOfferItems();

                return;
            }

            setMarketplaceView({ kind: 'make_offer', item: items[0], maxAmount: Math.max(1, Math.min(items.length, getBulkOfferLimit())) });
            requestOfferItemStats(send);

            return;
        }
        case CAN_MAKE_OFFER_NO_TRADING_PRIVILEGE:
            showMarketplaceAlert('inventory.marketplace.no_trading_privilege.title', 'inventory.marketplace.no_trading_privilege.info');

            return;
        case CAN_MAKE_OFFER_NO_TRADING_PASS:
            showMarketplaceAlert('inventory.marketplace.no_trading_pass.title', 'inventory.marketplace.no_trading_pass.info');

            return;
        case CAN_MAKE_OFFER_NO_TOKENS:
            setMarketplaceView({ kind: 'buy_tokens', price: marketplaceConfiguration.tokenBatchPrice, count: marketplaceConfiguration.tokenBatchSize });

            return;
        case CAN_MAKE_OFFER_CANCELLED:
            releaseMarketplaceOfferItems();

            return;
        case CAN_MAKE_OFFER_TRADING_LOCK:
            showMarketplaceAlert('inventory.marketplace.trading_lock.title', 'inventory.marketplace.trading_lock.info');

            return;
    }
};

/** `buyMarketplaceTokens`: a not-enough-credits answer to this purchase gives up the offer (`onNotEnoughCredits`). */
export const buyMarketplaceTokens = (send: Send) => {
    send(new BuyMarketplaceTokensComposer({}));

    inventoryStore.getState().setMarketplaceBuyingTokens(true);
};

/** `makeOffer`: the price, the furni type and up to `amount` of the locked items' room item ids; the locks go. */
export const makeMarketplaceOffer = (send: Send, price: number, amount: number) => {
    const items = inventoryStore.getState().marketplaceOfferItems;

    if (!items || !items.length) return;

    const count = Math.max(1, Math.min(amount, items.length));
    const itemRefs = items.slice(0, count).map(item => item.ref);

    send(new MakeOfferComposer({ price, furniType: items[0].isWallItem ? MARKETPLACE_FURNI_TYPE_WALL : MARKETPLACE_FURNI_TYPE_FLOOR, itemRefs }));

    releaseMarketplaceOfferItems();
};

/** `endOfferMaking` -> `MarketplaceView.showResult`: `result.title.success` or `.failure`, and `inventory.marketplace.result.<n>`. */
export const endMarketplaceOfferMaking = (result: number) => showMarketplaceAlert((result === MAKE_OFFER_RESULT_OK) ? 'inventory.marketplace.result.title.success' : 'inventory.marketplace.result.title.failure', `inventory.marketplace.result.${result}`);

/** `setItemStats`: only the stats of the furni the dialog asked about reach it. */
export const setMarketplaceOfferItemStats = (stats: MarketplaceItemStats) => {
    const { marketplaceStatsCategory, marketplaceStatsFurniTypeId, marketplaceView, setMarketplaceViewStats } = inventoryStore.getState();

    if ((stats.furniCategoryId !== marketplaceStatsCategory) || (stats.furniTypeId !== marketplaceStatsFurniTypeId)) return;

    if (!marketplaceView) return;

    setMarketplaceViewStats(stats);
};

/** `onNotEnoughCredits`: a token purchase that could not be paid gives up the offer. */
export const onMarketplaceNotEnoughCredits = () => {
    if (!inventoryStore.getState().marketplaceBuyingTokens) return;

    inventoryStore.getState().setMarketplaceBuyingTokens(false);
    releaseMarketplaceOfferItems();
};
