/**
 * The VIP offers, the `vipBuyWidget` of `layout_vip_buy.xml` - Flash's `VipBuyCatalogWidget`,
 * which attaches no view: it works on the layout's own children. `vipGiftWidget` is the same class
 * with `isGift` (`CatalogVipGiftWidgetView`); no shipped layout has that container.
 *
 * `init` asks for the offers with source 1 (2 for the gift widget). `initClubType`: a VIP member
 * buying for themselves gets `catalog.vip.extend.title` / `.info` in `vip_title` / `vip_info`,
 * whose `days` is the purse's periods times 31 plus its days; `fixFormatting` then centres both
 * (the info with 3px leading). `showOffer` lists the VIP offers with months (only the promoted
 * ones while `catalog.vip.<buy|gift>.promo` names any) in `item_list_vip` as `VipBuyItem`s.
 *
 * `initLinks`: `hccenter_link` is `catalog.vip.buy.hccenter` with its links underlined
 * (`setLinkStyle`), and a click on a link sends its `event:` link to the client's link bus
 * (`openClientLink`). The class also wires a `vip_link` to the benefits window, which this layout
 * does not have.
 *
 * `ctlg_teaserimg_1` is the page's first image, which `LocalizationCatalogWidget` sets.
 */
import { useEffect } from 'react';

import { buyVipOffer, giftVipOffer, openClientLink, requestClubOffers } from '#base/commands';
import { CLUB_OFFERS_SOURCE_VIP_BUY, CLUB_OFFERS_SOURCE_VIP_GIFT, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation } from '#base/context/system';
import { getPurseClubType, useOwnClubSubscription } from '#base/context/user';
import { useTemplateLibrary } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { vipBuyItem } from '../../club/vipBuyItem';
import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CATALOG_LIBRARY } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `setLinkStyle`: a style sheet underlining `a:link` - every link's text, and nothing else. */
const underlineLinks = (html: string): string => html.replace(/(<a\b[^>]*>)([\s\S]*?)(<\/a>)/gi, '$1<u>$2</u>$3');

/** The first `<a href>` of a text, as `TextEvent.text` gives it (an `event:` link without the prefix). */
const firstLink = (html: string): string | undefined => {
    const href = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(html);
    const link = href ? (href[1] ?? href[2]) : undefined;

    return link?.startsWith('event:') ? link.substring(6) : link;
};

interface VipBuyProps extends CatalogWidgetProps {
    isGift: boolean;
}

const useVipBuy = ({ page, isGift }: VipBuyProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useOwnClubSubscription();
    const config = useConfigData();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);

    useEffect(() => {
        requestClubOffers(send, store, isGift ? CLUB_OFFERS_SOURCE_VIP_GIFT : CLUB_OFFERS_SOURCE_VIP_BUY);
    }, [ send, store, isGift ]);

    const extend = !!offers && (getPurseClubType(subscription) === 2) && !isGift;
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, isGift).filter(offer => offer.vip) : [];
    const hccenterLink = offers ? underlineLinks(t('catalog.vip.buy.hccenter', 'catalog.vip.buy.hccenter')) : undefined;
    const link = hccenterLink && firstLink(hccenterLink);

    useCatalogWidgetView(templates && {
        bindings: {
            vip_title: extend ? { caption: '${catalog.vip.extend.title}' } : {},
            vip_info: extend ? { caption: t('catalog.vip.extend.info', '', { days }) } : {},
            item_list_vip: { items: shown.map(offer => vipBuyItem(offer, page, { templates, config, t, onBuy: () => buyVipOffer(store, offer, page), onGift: () => giftVipOffer(store, offer, page) })) },
            hccenter_link: (hccenterLink !== undefined)
                ? { caption: hccenterLink, onPointerTap: link ? () => openClientLink(send, link) : undefined }
                : {},
        },
    });
};

export const CatalogVipBuyWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    useVipBuy({ page, tags, isGift: false });

    return null;
};

export const CatalogVipGiftWidgetView = ({ page, tags }: CatalogWidgetProps) => {
    useVipBuy({ page, tags, isGift: true });

    return null;
};
