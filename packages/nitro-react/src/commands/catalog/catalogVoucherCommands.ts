/**
 * `HabboCatalog.redeemVoucher`: send a voucher code. The answer is an alert
 * (`registerCatalogVoucherHandlers`).
 */
import { RedeemVoucherComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';

export const redeemVoucher = (send: Send, voucher: string) => send(new RedeemVoucherComposer({ code: voucher }));
