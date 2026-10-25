/**
 * The answers to a voucher code - `HabboCatalog.onVoucherRedeemOk` and `onVoucherRedeemError`,
 * the other half of `redeemVoucher` (sent by the front page's `RedeemItemCodeCatalogWidget`).
 * Each is an alert: a code that gave a furni names it
 * (`catalog.alert.voucherredeem.ok.description.furni` with `%productName%` and
 * `%productDescription%`), any other the plain description; an error gets the description of its
 * code (`catalog.alert.voucherredeem.error.description.<code>`). Closing either clears a dropped
 * offer (`alertDialogEventProcessor` -> `resetPlacedOfferData`).
 *
 * `HabboCatalog` is one for both catalogue windows, and neither answer writes a catalogue store,
 * so these live as long as the connection rather than with a window.
 */
import { VoucherRedeemErrorMessage, VoucherRedeemOkMessage } from '@nitrodevco/nitro-packets';

import { resetPlacedOfferData } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogVoucherHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(VoucherRedeemOkMessage, (data) => {
        const { showAlert, getLocalizationValue } = systemStore.getState();
        const description = (data.productName !== '')
            ? getLocalizationValue('catalog.alert.voucherredeem.ok.description.furni', 'catalog.alert.voucherredeem.ok.description.furni', { productName: data.productName, productDescription: data.productDescription })
            : getLocalizationValue('catalog.alert.voucherredeem.ok.description');

        showAlert(getLocalizationValue('catalog.alert.voucherredeem.ok.title'), description, { onClose: () => resetPlacedOfferData() });
    }),

    on(VoucherRedeemErrorMessage, (data) => {
        const { showAlert, getLocalizationValue } = systemStore.getState();

        showAlert(getLocalizationValue('catalog.alert.voucherredeem.error.title'), getLocalizationValue(`catalog.alert.voucherredeem.error.description.${data.errorCode}`), { onClose: () => resetPlacedOfferData() });
    }),
]);
