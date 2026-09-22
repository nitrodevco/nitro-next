/**
 * The VIP offers, the `vipBuyWidget` of `layout_vip_buy.xml` - Flash's `VipBuyCatalogWidget`,
 * whose view is the layout's own children: the title and info (`fixFormatting`: centred, the info
 * with 3px leading) in their list at 161,3, the page's teaser image, the `vip_buy_item` list
 * (spacing 4) and the HC centre link along the bottom. `vipGiftWidget` is the same class with
 * `isGift` (`CatalogVipGiftWidgetView`); no shipped layout has that container.
 *
 * `init` asks for the offers with source 1 (2 for the gift widget). `initClubType`: a VIP member
 * buying for themselves gets `catalog.vip.extend.title` / `.info`, whose `days` is the purse's
 * periods times 31 plus its days. `showOffer` lists the VIP offers with months (only the promoted
 * ones while `catalog.vip.<buy|gift>.promo` names any) as `VipBuyItem`s: buy is
 * `purchaseWillBeGift(false)` and the club purchase confirmation, gift `purchaseWillBeGift(true)`,
 * which opens the purchase confirmation turned into gifting (`showPurchaseConfirmation`).
 *
 * `hccenter_link` is `catalog.vip.buy.hccenter` with its links underlined (`setLinkStyle`); a click
 * on a link's glyphs sends its `event:` link to the client's link bus (`openClientLink`). The
 * class also wires a `vip_link` to the benefits window, which this layout does not have.
 *
 * `ctlg_teaserimg_1` is the page's first image (`LocalizationCatalogWidget.setElementImage` on a
 * static bitmap: `image.library.catalogue.url` + name + `.gif`), the layout's
 * `catalogue/hc_catalog_teaser.gif` until the page names one.
 */
import { useEffect } from 'react';

import { buyVipOffer, giftVipOffer, openClientLink, requestClubOffers } from '#base/commands';
import { CLUB_OFFERS_SOURCE_VIP_BUY, CLUB_OFFERS_SOURCE_VIP_GIFT, getCatalogPageImage, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { getPurseClubType, useUserStore } from '#base/context/user';
import { Region, ThemeImage, ThemeText } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { CatalogVipBuyItemView } from '../../club/CatalogVipBuyItemView';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `setLinkStyle`: a style sheet underlining `a:link` - every link's text, and nothing else. */
const underlineLinks = (html: string): string => html.replace(/(<a\b[^>]*>)([\s\S]*?)(<\/a>)/gi, '$1<u>$2</u>$3');

interface VipBuyProps extends CatalogWidgetProps {
    isGift: boolean;
}

const VipBuy = ({ page, isGift }: VipBuyProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useUserStore(x => x.clubSubscription);
    const config = useConfigData();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const catalogueUrl = useConfigValue<string>('image.library.catalogue.url') ?? '';
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useEffect(() => {
        requestClubOffers(send, store, isGift ? CLUB_OFFERS_SOURCE_VIP_GIFT : CLUB_OFFERS_SOURCE_VIP_BUY);
    }, [ send, store, isGift ]);

    const extend = !!offers && (getPurseClubType(subscription) === 2) && !isGift;
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, isGift).filter(offer => offer.vip) : [];
    const hccenterLink = offers ? t('catalog.vip.buy.hccenter', 'catalog.vip.buy.hccenter') : '';
    const teaserImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');

    return (
        <>
            <Region layout={{ position: 'absolute', left: 161, width: 198, top: 3, height: 165, flexDirection: 'column', gap: 4 }}>
                <ThemeText
                    name="vip_title"
                    text={extend ? t('catalog.vip.extend.title') : t('catalog.vip.buy.title')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ width: 178, flexShrink: 0 }}
                />
                <ThemeText
                    name="vip_info"
                    text={extend ? t('catalog.vip.extend.info', '', { days }) : t('catalog.vip.buy.info')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                    flashFormat={{ leading: 3 }}
                    markup
                    verticalAlign="top"
                    layout={{ width: 178, flexShrink: 0 }}
                />
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={teaserImage ? `${catalogueUrl}${teaserImage}.gif` : `${imageLibraryUrl}catalogue/hc_catalog_teaser.gif`}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'top center' }}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 291 }}
            />
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 19, width: 336, top: 170, bottom: 33, flexDirection: 'column', gap: 4, overflow: 'hidden' }}
            >
                {shown.map(offer => (
                    <CatalogVipBuyItemView
                        key={offer.offerId}
                        offer={offer}
                        onBuy={() => buyVipOffer(store, offer, page)}
                        onGift={() => giftVipOffer(store, offer, page)}
                    />
                ))}
            </Region>
            <Region
                name="hccenter_link_container"
                layout={{ position: 'absolute', left: 19, width: 316, top: 434, height: 17 }}
            >
                <Region
                    name="hccenter_link"
                    layout={{ position: 'absolute', left: 40, width: 236, bottom: 0 }}
                >
                    <ThemeText
                        text={underlineLinks(hccenterLink)}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 232, align: 'center' }}
                        markup
                        onLink={link => openClientLink(send, link)}
                        verticalAlign="top"
                        layout={{ width: 236 }}
                    />
                </Region>
            </Region>
        </>
    );
};

export const CatalogVipBuyWidgetView = ({ page, tags }: CatalogWidgetProps) => (
    <VipBuy
        page={page}
        tags={tags}
        isGift={false}
    />
);

export const CatalogVipGiftWidgetView = ({ page, tags }: CatalogWidgetProps) => (
    <VipBuy
        page={page}
        tags={tags}
        isGift
    />
);
