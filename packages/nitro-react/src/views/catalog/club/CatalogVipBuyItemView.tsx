/**
 * One offer of the VIP buy pages - Flash's `VipBuyItem`, drawn from `vip_buy_item.xml` (320x75,
 * `0x969696` borders on `0xdfdfdf`): the header bar with `vip_icon_medium` and the header in bold
 * white 14, the price in `item_price` (`showPriceInContainer`), and the green buy and gift buttons.
 *
 * The header is `catalog.vip.item.header.months` (`num_months`) for an offer of months,
 * `catalog.vip.item.header.days` (`num_days`, the extra days) otherwise - both plural forms
 * (`%{NUM_MONTHS|...}`). The gift button shows only for a giftable offer.
 *
 * `vip_icon_medium` is a GIF, which the bundle builder (PNG only) cannot pack, so
 * it ships converted as `catalog/vip_icon_medium.png`, pixel for pixel.
 */
import { ClubBuyOfferData } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { Border, ButtonThick, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogClubPriceView } from './CatalogClubPriceView';

export interface CatalogVipBuyItemViewProps {
    offer: ClubBuyOfferData;
    onBuy: () => void;
    onGift: () => void;
}

export const CatalogVipBuyItemView = ({ offer, onBuy, onGift }: CatalogVipBuyItemViewProps) => {
    const t = useTranslation();
    const header = (offer.months > 0)
        ? t('catalog.vip.item.header.months', '', { num_months: String(offer.months) })
        : t('catalog.vip.item.header.days', '', { num_days: String(offer.extraDays) });

    return (
        <Border
            variant="2"
            tintColor="#969696"
            layout={{ width: 320, height: 75, flexShrink: 0, overflow: 'hidden' }}
        >
            <Border
                variant="2"
                tintColor="#dfdfdf"
                layout={{ position: 'absolute', left: 1, width: 320, top: 1, height: 73 }}
            />
            <Border
                variant="2"
                tintColor="#969696"
                layout={{ position: 'absolute', left: 5, width: 310, top: 5, height: 25 }}
            >
                <ThemeText
                    name="item_header"
                    text={header}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff', fontSize: 14 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 60, top: 2 }}
                />
                <ThemeImage
                    name="vip_icon"
                    src={LayoutImage('catalog/vip_icon_medium.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 6, width: 33, top: 4, height: 17 }}
                />
            </Border>
            <Region
                name="item_price"
                layout={{ position: 'absolute', left: 5, width: 112, top: 41, height: 26 }}
            >
                <CatalogClubPriceView
                    priceCredits={offer.priceCredits}
                    priceActivityPoints={offer.priceActivityPoints}
                    activityPointType={offer.priceActivityPointType}
                />
            </Region>
            <ButtonThick
                variant="5"
                name="item_buy"
                tintColor="#00aa00"
                onPointerTap={onBuy}
                layout={{ position: 'absolute', left: 225, width: 90, top: 37, height: 30 }}
            >
                {t('catalog.club.button.buy')}
            </ButtonThick>
            {offer.isGiftable && (
                <ButtonThick
                    variant="5"
                    name="item_gift"
                    tintColor="#00aa00"
                    onPointerTap={onGift}
                    layout={{ position: 'absolute', left: 130, width: 90, top: 37, height: 30 }}
                >
                    {t('catalog.purchase_confirmation.gift')}
                </ButtonThick>
            )}
        </Border>
    );
};
