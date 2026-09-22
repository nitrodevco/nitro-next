/**
 * One offer of the `club_buy` page - Flash's `ClubBuyItem`, drawn from `club_buy_hc_item.xml`
 * (HC: `0x9b9448` borders on `0xebeada`, the style 11 icon, the header centred) or
 * `club_buy_vip_item.xml` (VIP: `0x969696` on `0xdfdfdf`, the style 12 icon, the header cut at
 * 90x15), 151x67. The header is `catalog.club.item.header` with `months`, the price
 * `catalog.club.price` with `price` (the credits), and the button opens the purchase confirmation
 * for the offer on the page (`showPurchaseConfirmation(offer, pageId)`).
 */
import { useTranslation } from '#base/context/system';
import { Border, Button, Icon, Region, ThemeText } from '#base/theme';

export interface CatalogClubBuyItemViewProps {
    vip: boolean;
    months: number;
    priceCredits: number;
    onBuy: () => void;
}

export const CatalogClubBuyItemView = ({ vip, months, priceCredits, onBuy }: CatalogClubBuyItemViewProps) => {
    const t = useTranslation();
    const dark = vip ? '#969696' : '#9b9448';

    return (
        <Border
            variant="2"
            tintColor={dark}
            layout={{ width: 151, height: 67, flexShrink: 0, overflow: 'hidden' }}
        >
            <Border
                variant="2"
                tintColor={vip ? '#dfdfdf' : '#ebeada'}
                layout={{ position: 'absolute', left: 1, width: 149, top: 1, height: 65 }}
            />
            <Border
                variant="2"
                tintColor={dark}
                layout={{ position: 'absolute', left: 5, width: 141, top: 5, height: 25, overflow: 'hidden' }}
            >
                <Icon
                    variant={vip ? 12 : 11}
                    layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                />
                {vip
                    ? (
                            <ThemeText
                                name="item_header"
                                text={t('catalog.club.item.header', '', { months: String(months) })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff' }}
                                clip
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 46, width: 90, top: 5, height: 15 }}
                            />
                        )
                    : (
                            <ThemeText
                                name="item_header"
                                text={t('catalog.club.item.header', '', { months: String(months) })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: -4, width: 141, top: 5 }}
                            />
                        )}
            </Border>
            <ThemeText
                name="item_price"
                text={t('catalog.club.price', '', { price: String(priceCredits) })}
                textStyle="u_regular"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 9, top: 44 }}
            />
            <Button
                variant="3"
                name="item_buy"
                onPointerTap={onBuy}
                layout={{ position: 'absolute', left: -8, width: 151, top: 38, height: 22, minWidth: 40 }}
            >
                {t('catalog.club.button.buy')}
            </Button>
        </Border>
    );
};

/**
 * `club_buy_info_item.xml` - the box `ClubBuyCatalogWidget.showClubInfo` puts at the top of the HC
 * list for a VIP member (151x139, `0x9b9448` on `0xebeada`): `catalog.club.info.header` centred in
 * its bar and `catalog.club.info.content` wrapped under it.
 */
export const CatalogClubBuyInfoItemView = () => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            tintColor="#9b9448"
            layout={{ width: 151, height: 139, flexShrink: 0 }}
        >
            <Border
                variant="2"
                tintColor="#ebeada"
                layout={{ position: 'absolute', left: 1, width: 149, top: 1, height: 137 }}
            />
            <Border
                variant="2"
                tintColor="#9b9448"
                layout={{ position: 'absolute', left: 5, width: 141, top: 5, height: 25 }}
            >
                <ThemeText
                    name="item_header"
                    text={t('catalog.club.info.header')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 141, top: 5 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 9, width: 134, top: 44 }}>
                <ThemeText
                    name="info_content"
                    text={t('catalog.club.info.content')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    verticalAlign="top"
                    layout={{ width: 134 }}
                />
            </Region>
        </Border>
    );
};
