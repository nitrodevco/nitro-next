/**
 * The club offers, the embedded `clubBuyWidget` of `layout_club_buy.xml` - Flash's
 * `ClubBuyCatalogWidget` as the `ClubBuyController`'s visualisation: the `u_headline_small` header
 * in its `0xdfdfdf` bar, the wrapped info, the style 18 club icon, the HC and VIP item lists
 * (spacing 4), the remaining-days bar and the underlined link.
 *
 * `init` registers with the controller and asks for the offers with source 0. Until they come the
 * layout's captions stand; then `initClubType` (the purse's `getClubType`) picks the texts: no
 * club - `header.none` / `info.none` and no remaining bar; HC - `header.hc`, `info.hc`,
 * `remaining.hc`; VIP - `header.vip`, `info.vip`, `remaining.vip`, and the `club_buy_info_item` at
 * the top of the HC list (`showClubInfo`). The remaining texts get `days` = the purse's periods
 * times 31 plus its days. `showOffer` puts every offer with months (only the promoted months while
 * `catalog.vip.buy.promo` names any) into the VIP or the HC list as a `ClubBuyItem`.
 *
 * `club_link` opens `link.format.club` behind the "leaving the hotel" alert. Flash registers two
 * listeners on it - this widget's `initLinks` and the page's `LocalizationCatalogWidget.initLinks`
 * (`LAYOUT_LINKS.club_buy`) - which both open the same link, so one click shows the alert twice;
 * the port opens it once.
 */
import { useEffect } from 'react';

import { onCatalogPageLink, requestClubOffers, showClubPurchaseConfirmation } from '#base/commands';
import { CLUB_OFFERS_SOURCE_CLUB_BUY, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useTranslation } from '#base/context/system';
import { getPurseClubType, useUserStore } from '#base/context/user';
import { Border, Icon, Region, ThemeText } from '#base/theme';
import { getClubOffersToShow } from '#base/utils';

import { CatalogClubBuyInfoItemView, CatalogClubBuyItemView } from '../../club/CatalogClubBuyItemView';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** The item lists' width. */
const LIST_WIDTH = 171;

export const CatalogClubBuyWidgetView = ({ page }: CatalogWidgetProps) => {
    const offers = useCatalogStore(x => x.clubOffers);
    const subscription = useUserStore(x => x.clubSubscription);
    const config = useConfigData();
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useEffect(() => {
        requestClubOffers(send, store, CLUB_OFFERS_SOURCE_CLUB_BUY);
    }, [ send, store ]);

    const clubType = offers ? getPurseClubType(subscription) : -1;
    const days = String((subscription.clubPeriods * 31) + subscription.clubDays);
    const shown = offers ? getClubOffersToShow(offers, config, false) : [];

    let header = t('catalog.club.buy.header');
    let info = t('catalog.club.buy.info');
    let remaining: string | undefined = t('catalog.club.buy.remaining');

    switch (clubType) {
        case 0:
            header = t('catalog.club.buy.header.none');
            info = t('catalog.club.buy.info.none');
            remaining = undefined;
            break;
        case 1:
            header = t('catalog.club.buy.header.hc');
            info = t('catalog.club.buy.info.hc');
            remaining = t('catalog.club.buy.remaining.hc', '', { days });
            break;
        case 2:
            header = t('catalog.club.buy.header.vip');
            info = t('catalog.club.buy.info.vip');
            remaining = t('catalog.club.buy.remaining.vip', '', { days });
            break;
    }

    const items = (vip: boolean) => shown.filter(offer => (offer.vip === vip)).map(offer => (
        <CatalogClubBuyItemView
            key={offer.offerId}
            vip={offer.vip}
            months={offer.months}
            priceCredits={offer.priceCredits}
            onBuy={() => showClubPurchaseConfirmation(store, offer, page.pageId)}
        />
    ));

    return (
        <>
            <Border
                variant="2"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 22 }}
            >
                <ThemeText
                    name="club_header"
                    text={header}
                    textStyle="u_headline_small"
                    textOptions={{ align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 307, top: 2 }}
                />
            </Border>
            {(remaining !== undefined) && (
                <Border
                    variant="2"
                    name="club_remaining_bg"
                    tintColor="#dfdfdf"
                    layout={{ position: 'absolute', left: 10, width: 340, bottom: 25, height: 25 }}
                >
                    <ThemeText
                        name="club_remaining"
                        text={remaining}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 6, top: 5 }}
                    />
                </Border>
            )}
            <ThemeText
                name="club_info"
                text={info}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 303 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, width: 307, top: 30 }}
            />
            <Icon
                variant="18"
                name="icon_vip"
                layout={{ position: 'absolute', left: 40, width: 85, top: 104, height: 40 }}
            />
            <Region
                name="item_list_hc"
                layout={{ position: 'absolute', left: 0, width: LIST_WIDTH, top: 155, bottom: 55, flexDirection: 'column', gap: 4, overflow: 'hidden' }}
            >
                {(clubType === 2) && <CatalogClubBuyInfoItemView />}
                {items(false)}
            </Region>
            <Region
                name="item_list_vip"
                layout={{ position: 'absolute', left: 180, width: LIST_WIDTH, top: 155, bottom: 55, flexDirection: 'column', gap: 4, overflow: 'hidden' }}
            >
                {items(true)}
            </Region>
            <Region
                name="club_link"
                cursor="pointer"
                onPointerTap={() => onCatalogPageLink(page, 'club_link')}
                layout={{ position: 'absolute', left: 10, width: 340, bottom: 3 }}
            >
                <ThemeText
                    text={t('catalog.club.buy.link')}
                    textStyle="u_regular"
                    textOptions={{ align: 'center' }}
                    flashFormat={{ underline: true }}
                    verticalAlign="top"
                    layout={{ width: 340 }}
                />
            </Region>
        </>
    );
};
