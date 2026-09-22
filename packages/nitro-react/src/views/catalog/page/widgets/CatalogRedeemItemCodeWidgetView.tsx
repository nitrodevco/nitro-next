import { useState } from 'react';

import { redeemVoucher } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation, useWindowActions } from '#base/context/system';
import { Border, Button, TextInput } from '#base/theme';

/**
 * The voucher box of the front page - the `redeemItemCodeWidget` container of
 * `layout_frontpage_featured.xml` (and of `layout_frontpage4.xml`, the same children), Flash's
 * `RedeemItemCodeCatalogWidget`. It attaches no view of its own (the `redeemItemCodeWidget` asset
 * is never built), so these are the layout's children: the `voucher_code` input in a style 0
 * border and the `redeem` button.
 *
 * The button, or Enter in the input (`WKE_KEY_DOWN` with char code 13), redeems: a code is sent
 * (`HabboCatalog.redeemVoucher`) and the input emptied; an empty one gets the
 * `catalog.voucher.empty` alert instead. The server's answer is an alert
 * (`registerCatalogVoucherHandlers`). Enter does not also break the line the multiline input would
 * otherwise start - Flash empties the field before the key reaches it, which leaves a lone line
 * break behind; the port leaves the field empty.
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

    return (
        <>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 10, width: 216, top: 5, height: 25 }}
            >
                <TextInput
                    value={voucherCode}
                    onChange={setVoucherCode}
                    onKeyDown={(event) => {
                        if (event.key !== 'Enter') return false;

                        redeem();

                        return true;
                    }}
                    multiline
                    textStyle="u_regular"
                    flashPlacement
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 4, width: 206, top: 4, height: 15 }}
                />
            </Border>
            <Button
                variant="3"
                name="redeem"
                onPointerTap={redeem}
                layout={{ position: 'absolute', left: 274, right: 9, top: 5, height: 22, maxWidth: 100 }}
            >
                {t('redeem')}
            </Button>
        </>
    );
};
