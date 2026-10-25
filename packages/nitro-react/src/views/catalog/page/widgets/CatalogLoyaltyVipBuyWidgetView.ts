/**
 * The VIP offers for loyalty points, the embedded `loyaltyVipBuyWidget` of
 * `layout_loyalty_vip_buy.xml` - Flash's `LoyaltyVipBuyCatalogWidget`, which attaches no view: it
 * works on the layout's own children.
 *
 * `init` asks for the offers with source 6. `initClubType`: a VIP member gets
 * `catalog.vip.extend.title` / `.info` in `vip_title` / `vip_info` (`days` = the purse's periods
 * times 31 plus its days); `fixFormatting` then centres both (the info with 3px leading).
 * `showOffer` lists the VIP offers with months (only those `catalog.vip.buy.promo` promotes, when
 * it names any) in `item_list_vip` as `VipBuyItem`s - buy and gift as on the VIP page. `initLinks`:
 * `vip_link` opens the benefits (`HabboCatalogUtils.showVipBenefits`).
 *
 * `ctlg_teaserimg_1` is the page's first image, which `LocalizationCatalogWidget` sets.
 */
import { useEffect } from 'react';

import { buyVipOffer, giftVipOffer, requestClubOffers, showVipBenefits } from '#base/commands';
import { CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation } from '#base/context/system';
import { getPurseClubType, useOwnClubSubscription } from '#base/context/user';
import { useTemplateLibrary } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { vipBuyItem } from '../../club/vipBuyItem';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

export const CatalogLoyaltyVipBuyWidgetView = ({ page }: CatalogWidgetProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useOwnClubSubscription();
    const config = useConfigData();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    useEffect(() => {
        requestClubOffers(send, store, CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY);
    }, [ send, store ]);

    const extend = !!offers && (getPurseClubType(subscription) === 2);
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, false).filter(offer => offer.vip) : [];

    useCatalogWidgetView(templates && {
        bindings: {
            vip_title: extend ? { caption: '${catalog.vip.extend.title}' } : {},
            vip_info: extend ? { caption: t('catalog.vip.extend.info', '', { days }) } : {},
            item_list_vip: { items: shown.map(offer => vipBuyItem(offer, page, { templates, config, t, onBuy: () => buyVipOffer(store, offer, page), onGift: () => giftVipOffer(store, offer, page) })) },
            // `initLinks` runs with `initClubType`, once the offers have come.
            vip_link: offers ? { onPointerTap: () => showVipBenefits(store) } : {},
        },
    });

    return null;
};
