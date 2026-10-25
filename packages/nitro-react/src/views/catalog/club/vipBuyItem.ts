import { Template, TemplateItem } from '@nitrodevco/nitro-theme';

import { CatalogPage, ClubBuyOfferData } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { clubBuyOfferAsPurchasableOffer } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';
import { priceDisplayItem } from '../page/widgets/catalogPrice';

/**
 * Flash's `VipBuyItem` - a `habbo-catalog-com/vip_buy_item`: `item_header` is
 * `catalog.vip.item.header.months` (`num_months`) for an offer of months,
 * `catalog.vip.item.header.days` (`num_days`, the extra days) otherwise; the price
 * `showPriceInContainer` puts into `item_price`; `item_buy` is `purchaseWillBeGift(false)` and the
 * purchase confirmation, `item_gift` (hidden for an offer that is not giftable)
 * `purchaseWillBeGift(true)` and the confirmation turned into gifting.
 */
export interface VipBuyItemOptions {
    templates: Record<string, Template>;
    config: Record<string, unknown>;
    t: ReturnType<typeof useTranslation>;
    onBuy: () => void;
    onGift: () => void;
}

export const vipBuyItem = (offer: ClubBuyOfferData, page: CatalogPage, options: VipBuyItemOptions): TemplateItem => {
    const { templates, config, t, onBuy, onGift } = options;

    return {
        key: String(offer.offerId),
        from: templates[catalogTemplateId('vip_buy_item')],
        bindings: {
            item_header: {
                caption: (offer.months > 0)
                    ? t('catalog.vip.item.header.months', '', { num_months: String(offer.months) })
                    : t('catalog.vip.item.header.days', '', { num_days: String(offer.extraDays) }),
            },
            item_price: { items: [ priceDisplayItem(templates, clubBuyOfferAsPurchasableOffer(offer, page), { config }) ] },
            item_buy: { onPointerTap: onBuy },
            item_gift: offer.isGiftable ? { onPointerTap: onGift } : { visible: false },
        },
    };
};
