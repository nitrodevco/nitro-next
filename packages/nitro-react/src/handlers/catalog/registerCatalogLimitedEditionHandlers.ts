/**
 * The limited edition packets `HabboCatalog` listens to - `onLimitedEditionSoldOut`,
 * `onLtdRaffleEntered` and `onLtdRaffleResult` - all three of which end at the open purchase
 * confirmation (`HabboCatalog._purchaseWindow`, here `CatalogPurchaseSlice.activePurchase`).
 *
 * - Sold out: the `catalog.alert.limited_edition_sold_out` alert, and the dialog is disposed.
 * - Raffle entered: the dialog's `ltdRaffleStarted` - `CatalogLimitedEditionSlice.ltdRaffleRunning`,
 *   which the dialog reads for its `raffle_container`.
 * - Raffle result: the dialog's `ltdRaffleEnded` and disposal, then the `notification.raffle.won`
 *   or `.lost` bubble in the `ltd` style (`hasWon` is result code 0).
 *
 * The remaining supply a sold-out offer shows on the page comes from the `ProductOfferMessage` the
 * limited item widget asks for, not from these.
 */
import { LimitedEditionSoldOutEventMessage, LtdRaffleEnteredMessage, LtdRaffleResultMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `LtdRaffleResultMessageEventParser.hasWon`: result code 0. */
const LTD_RAFFLE_RESULT_WON = 0;

export const registerCatalogLimitedEditionHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setActivePurchase, setLtdRaffleRunning } = store.getState();
    const t = (key: string, defaultValue?: string) => systemStore.getState().getLocalizationValue(key, defaultValue);

    return subscribeAll(subscribe, [
        on(LimitedEditionSoldOutEventMessage, () => {
            systemStore.getState().showAlert(t('catalog.alert.limited_edition_sold_out.title'), t('catalog.alert.limited_edition_sold_out.message'));

            if (!store.getState().activePurchase) return;

            setLtdRaffleRunning(false);
            setActivePurchase(undefined);
        }),

        on(LtdRaffleEnteredMessage, () => {
            if (store.getState().activePurchase) setLtdRaffleRunning(true);
        }),

        on(LtdRaffleResultMessage, (data) => {
            if (store.getState().activePurchase) {
                setLtdRaffleRunning(false);
                setActivePurchase(undefined);
            }

            const key = `notification.raffle.${(data.resultCode === LTD_RAFFLE_RESULT_WON) ? 'won' : 'lost'}`;

            notificationStore.getState().addNotification(t(key, key), 'ltd');
        }),
    ]);
};
