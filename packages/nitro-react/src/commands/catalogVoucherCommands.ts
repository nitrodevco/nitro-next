/**
 * `HabboCatalog.redeemVoucher`: send a voucher code. The answer is an alert
 * (`registerCatalogVoucherHandlers`).
 */
import { RedeemVoucherComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';

export const redeemVoucher = (send: WebSocketConnection['send'], voucher: string) => send(new RedeemVoucherComposer({ code: voucher }));
