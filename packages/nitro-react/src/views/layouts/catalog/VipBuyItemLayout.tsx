import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1658_vip_buy_item_xml` (layout "vip_buy_item", 320x75) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipBuyItemLayoutProps {
    captionItemHeader?: string;
    itemPrice?: ReactNode;
    layout?: BoxLayout;
    onItemBuy?: () => void;
    onItemGift?: () => void;
    srcVipIcon?: string;
    tintVipIcon?: string;
}

export const VipBuyItemLayout = ({ captionItemHeader, itemPrice, layout, onItemBuy, onItemGift, srcVipIcon, tintVipIcon }: VipBuyItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 320, height: 75, ...layout }}>
            <Border
                variant="2"
                tintColor="#969696"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 320, maxWidth: 320, minHeight: 75 }}
            >
                <Border
                    variant="2"
                    tintColor="#dfdfdf"
                    layout={{ position: 'absolute', left: 1, right: -1, top: 1, bottom: 1, minWidth: 320, maxWidth: 320 }}
                />
                <Border
                    variant="2"
                    tintColor="#969696"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 25, minWidth: 310, maxWidth: 310, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionItemHeader ?? 'catalog.club.item.header'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                        name="item_header"
                        layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 187, top: 2, bottom: 4 }}
                    />
                    <ThemeImage
                        name="vip_icon"
                        src={srcVipIcon ?? layoutImage('vip_icon_medium.gif')}
                        tint={tintVipIcon}
                        layout={{ position: 'absolute', left: 6, width: 33, top: 4, height: 17 }}
                    />
                </Border>
                <Region
                    name="item_price"
                    layout={{ position: 'absolute', left: 5, width: 112, bottom: 8, height: 26 }}
                >
                    {itemPrice}
                </Region>
                <ButtonThick
                    variant="5"
                    name="item_buy"
                    tintColor="#00aa00"
                    onPointerTap={onItemBuy}
                    layout={{ position: 'absolute', right: 5, width: 90, bottom: 8, height: 30, minWidth: 90, maxWidth: 90, minHeight: 30, maxHeight: 30 }}
                >
                    {t('catalog.club.button.buy')}
                </ButtonThick>
                <ButtonThick
                    variant="5"
                    name="item_gift"
                    tintColor="#00aa00"
                    onPointerTap={onItemGift}
                    layout={{ position: 'absolute', right: 100, width: 90, bottom: 8, height: 30, minWidth: 90, maxWidth: 90, minHeight: 30, maxHeight: 30 }}
                >
                    {t('catalog.purchase_confirmation.gift')}
                </ButtonThick>
            </Border>
        </Region>
    );
};
