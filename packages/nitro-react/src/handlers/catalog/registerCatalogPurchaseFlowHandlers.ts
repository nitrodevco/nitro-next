/**
 * The purchase flow's packets on the catalogue window - the `HabboCatalog` listeners that feed the
 * gift dialog and the new additions mark:
 *
 * - `onGiftWrappingConfiguration`: the gift dialog's boxes, ribbons, colours and price
 *   (`GiftWrappingConfiguration`), asked for when the catalogue first opens.
 * - `onGiftReceiverNotFound` -> `PurchaseConfirmationDialog.receiverNotFound`: the give button
 *   works again, and the `catalog.gift_wrapping.receiver_not_found` alert says why (Flash enables
 *   the button once more when that alert closes; it is already enabled here).
 * - `onCatalogIndex`'s `§_-31q§ = newAdditionsAvailable`, which `toggleCatalog` clears with
 *   `MarkCatalogNewAdditionsPageOpened` the next time the window opens (`useCatalogPurchaseFlow`).
 *   The rest of `onCatalogIndex` is `registerCatalogHandlers`'.
 *
 * Window-scoped like the store it writes: `CatalogComponent` registers it with `useRegisterHandlers`.
 */
import { CatalogIndexMessage, GiftReceiverNotFoundEventMessage, GiftWrappingConfigurationEventMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogPurchaseFlowHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setGiftWrappingConfiguration, setGiveGiftEnabled, setNewAdditionsAvailable } = store.getState();

    return subscribeAll(subscribe, [
        on(GiftWrappingConfigurationEventMessage, data => setGiftWrappingConfiguration({
            isEnabled: data.isWrappingEnabled,
            price: data.wrappingPrice,
            stuffTypes: data.stuffTypes,
            boxTypes: data.boxTypes,
            ribbonTypes: data.ribbonTypes,
            defaultStuffTypes: data.defaultStuffTypes,
        })),

        on(GiftReceiverNotFoundEventMessage, () => {
            if (!store.getState().activePurchase) return;

            setGiveGiftEnabled(true);

            const { showAlert, getLocalizationValue } = systemStore.getState();

            showAlert(getLocalizationValue('catalog.gift_wrapping.receiver_not_found.title'), getLocalizationValue('catalog.gift_wrapping.receiver_not_found.info'));
        }),

        on(CatalogIndexMessage, (data) => {
            if (data.catalogType !== store.getState().catalogType) return;

            setNewAdditionsAvailable(data.newAdditionsAvailable);
        }),
    ]);
};
