/**
 * The VIP offers for loyalty points, the embedded `loyaltyVipBuyWidget` of
 * `layout_loyalty_vip_buy.xml` - Flash's `LoyaltyVipBuyCatalogWidget`: the title and info
 * (`fixFormatting`: centred, the info with 3px leading) in their list at 161,3, the page's teaser
 * image, the `vip_buy_item` list (spacing 4) and the benefits link.
 *
 * `init` asks for the offers with source 6. `initClubType`: a VIP member gets
 * `catalog.vip.extend.title` / `.info` (`days` = the purse's periods times 31 plus its days).
 * `showOffer` lists the VIP offers with months (only those `catalog.vip.buy.promo` promotes, when
 * it names any) as `VipBuyItem`s - buy and gift as on the VIP page. `vip_link` opens the benefits
 * (`HabboCatalogUtils.showVipBenefits`).
 *
 * `ctlg_teaserimg_1` is the page's first image (`image.library.catalogue.url` + name + `.gif`),
 * the layout's `catalogue/hc_catalog_teaser.gif` until the page names one.
 */
import { useEffect } from 'react';

import { buyVipOffer, giftVipOffer, requestClubOffers, showVipBenefits } from '#base/commands';
import { CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY, getCatalogPageImage, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { getPurseClubType, useUserStore } from '#base/context/user';
import { Region, ThemeImage, ThemeText } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { CatalogVipBuyItemView } from '../../club/CatalogVipBuyItemView';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

export const CatalogLoyaltyVipBuyWidgetView = ({ page }: CatalogWidgetProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useUserStore(x => x.clubSubscription);
    const config = useConfigData();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const catalogueUrl = useConfigValue<string>('image.library.catalogue.url') ?? '';
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useEffect(() => {
        requestClubOffers(send, store, CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY);
    }, [ send, store ]);

    const extend = !!offers && (getPurseClubType(subscription) === 2);
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, false).filter(offer => offer.vip) : [];
    const teaserImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');

    return (
        <>
            <Region layout={{ position: 'absolute', left: 161, width: 188, top: 3, height: 165, flexDirection: 'column', gap: 4 }}>
                <ThemeText
                    name="vip_title"
                    text={extend ? t('catalog.vip.extend.title') : t('catalog.vip.buy.title')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 154, align: 'center' }}
                    flashFormat={{ bold: true }}
                    markup
                    verticalAlign="top"
                    layout={{ width: 158, flexShrink: 0 }}
                />
                <ThemeText
                    name="vip_info"
                    text={extend ? t('catalog.vip.extend.info', '', { days }) : t('catalog.vip.buy.info')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 154, align: 'center' }}
                    flashFormat={{ leading: 3 }}
                    markup
                    verticalAlign="top"
                    layout={{ width: 158, flexShrink: 0 }}
                />
            </Region>
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={teaserImage ? `${catalogueUrl}${teaserImage}.gif` : `${imageLibraryUrl}catalogue/hc_catalog_teaser.gif`}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 3, width: 152, top: 3, height: 161 }}
            />
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 19, width: 316, top: 170, bottom: 33, flexDirection: 'column', gap: 4, overflow: 'hidden' }}
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
                name="vip_link"
                cursor="pointer"
                onPointerTap={() => showVipBenefits(store)}
                layout={{ position: 'absolute', left: 39, width: 286, bottom: 10 }}
            >
                <ThemeText
                    text={t('catalog.vip.buy.link')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#038ef4', align: 'center' }}
                    flashFormat={{ underline: true }}
                    verticalAlign="top"
                    layout={{ width: 286 }}
                />
            </Region>
        </>
    );
};
