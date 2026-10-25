/**
 * The club offers, the `clubBuyWidget` of `layout_club_buy.xml` - Flash's `ClubBuyCatalogWidget`
 * as the `ClubBuyController`'s visualisation. `init` attaches `clubBuyWidget` (the layout's
 * container is tagged `EMBEDDED`, so its own children stay), registers with the controller and asks
 * for the offers with source 0.
 *
 * Until they come the layout's captions stand; then `initClubType` (the purse's `getClubType`)
 * picks the texts: no club - `header.none` / `info.none`, and `club_remaining` with its
 * `club_remaining_bg` hidden; HC - `header.hc`, `info.hc`, `remaining.hc`; VIP - `header.vip`,
 * `info.vip`, `remaining.vip`, and `showClubInfo` adds `club_buy_info_item` at the top of
 * `item_list_hc`. The remaining texts get `days` = the purse's periods times 31 plus its days.
 * `showOffer` puts every offer with months (only the promoted months while `catalog.vip.buy.promo`
 * names any) into `item_list_vip` or `item_list_hc` as a `ClubBuyItem`.
 *
 * `club_link` opens `link.format.club` behind the "leaving the hotel" alert. Flash registers two
 * listeners on it - this widget's `initLinks` and the page's `LocalizationCatalogWidget.initLinks`
 * (`LAYOUT_LINKS.club_buy`) - which both open the same link, so one click shows the alert twice;
 * the port leaves it to the page's, which opens it once.
 */
import { Template, TemplateBindings, TemplateItem } from '@nitrodevco/nitro-theme';
import { useEffect } from 'react';

import { requestClubOffers, showClubPurchaseConfirmation } from '#base/commands';
import { CLUB_OFFERS_SOURCE_CLUB_BUY, ClubBuyOfferData, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation } from '#base/context/system';
import { getPurseClubType, useOwnClubSubscription } from '#base/context/user';
import { useTemplateLibrary } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

type Translate = ReturnType<typeof useTranslation>;

/**
 * Flash's `ClubBuyItem`: `club_buy_vip_item` for a VIP offer, `club_buy_hc_item` otherwise, its
 * `item_header` the `catalog.club.item.header` with `months`, its `item_price` the
 * `catalog.club.price` with `price` (the credits), and `item_buy` opening the purchase
 * confirmation for the offer on the page (`showPurchaseConfirmation(offer, pageId)`).
 */
const clubBuyItem = (templates: Record<string, Template>, offer: ClubBuyOfferData, t: Translate, onBuy: () => void): TemplateItem => ({
    key: String(offer.offerId),
    from: templates[catalogTemplateId(offer.vip ? 'club_buy_vip_item' : 'club_buy_hc_item')],
    bindings: {
        item_header: { caption: t('catalog.club.item.header', '', { months: String(offer.months) }) },
        item_price: { caption: t('catalog.club.price', '', { price: String(offer.priceCredits) }) },
        item_buy: { onPointerTap: onBuy },
    },
});

export const CatalogClubBuyWidgetView = ({ page }: CatalogWidgetProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useOwnClubSubscription();
    const config = useConfigData();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    useEffect(() => {
        requestClubOffers(send, store, CLUB_OFFERS_SOURCE_CLUB_BUY);
    }, [ send, store ]);

    const clubType = offers ? getPurseClubType(subscription) : -1;
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, false) : [];

    /** `initClubType`'s captions; before the offers, the layout's. */
    const captions = ((): TemplateBindings => {
        switch (clubType) {
            case 0: return {
                club_header: { caption: '${catalog.club.buy.header.none}' },
                club_info: { caption: '${catalog.club.buy.info.none}' },
                club_remaining: { visible: false },
                club_remaining_bg: { visible: false },
            };
            case 1: return {
                club_header: { caption: '${catalog.club.buy.header.hc}' },
                club_info: { caption: '${catalog.club.buy.info.hc}' },
                club_remaining: { caption: t('catalog.club.buy.remaining.hc', '', { days }) },
            };
            case 2: return {
                club_header: { caption: '${catalog.club.buy.header.vip}' },
                club_info: { caption: '${catalog.club.buy.info.vip}' },
                club_remaining: { caption: t('catalog.club.buy.remaining.vip', '', { days }) },
            };
            default: return {};
        }
    })();

    const items = (vip: boolean) => (templates ? shown.filter(offer => (offer.vip === vip)).map(offer => clubBuyItem(templates, offer, t, () => showClubPurchaseConfirmation(store, offer, page.pageId))) : []);

    useCatalogWidgetView(templates && {
        template: 'clubBuyWidget',
        bindings: {
            ...captions,
            item_list_hc: {
                items: [
                    // `showClubInfo`.
                    ...((clubType === 2) ? [ { key: 'club_buy_info_item', from: templates[catalogTemplateId('club_buy_info_item')] } ] : []),
                    ...items(false),
                ],
            },
            item_list_vip: { items: items(true) },
        },
    });

    return null;
};
