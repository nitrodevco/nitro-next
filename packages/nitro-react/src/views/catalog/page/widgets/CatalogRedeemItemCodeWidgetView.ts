import { useState } from 'react';

import { redeemVoucher } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';

import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The voucher box of the front page - the `redeemItemCodeWidget` container of
 * `layout_frontpage_featured` (and of `layout_frontpage4`, the same children), Flash's
 * `RedeemItemCodeCatalogWidget`. It attaches no view of its own (the `redeemItemCodeWidget` asset
 * is never built) and binds the layout's `voucher_code` input and `redeem` button.
 *
 * The button (`WME_CLICK`), or Enter in the input (`WKE_KEY_DOWN` with char code 13), redeems: a
 * code is sent (`HabboCatalog.redeemVoucher`) and the input emptied; an empty one gets the
 * `catalog.voucher.empty` alert instead. The server's answer is an alert
 * (`registerCatalogVoucherHandlers`).
 */
export const CatalogRedeemItemCodeWidgetView = () => {
    const [ voucherCode, setVoucherCode ] = useState('');
    const { send } = useWebSocketContext();
    const { showAlert } = useWindowActions();
    const t = useTranslation();

    const redeem = () => {
        if (voucherCode.length > 0) {
            redeemVoucher(send, voucherCode);
            setVoucherCode('');
        } else {
            showAlert(t('catalog.voucher.empty.title'), t('catalog.voucher.empty.desc'));
        }
    };

    useCatalogWidgetView({
        bindings: {
            voucher_code: {
                caption: voucherCode,
                onChange: setVoucherCode,
                onKeyDown: (key) => {
                    if (key === 'Enter') redeem();
                },
            },
            redeem: { onPointerTap: redeem },
        },
    });

    return null;
};
