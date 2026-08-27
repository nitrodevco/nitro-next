import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1658_vip_buy_item_xml` (layout "vip_buy_item", 320x75) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipBuyItemLayoutProps {
    captionItemHeader?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
    onItemGift?: () => void;
    srcVipIcon?: string;
}

export const VipBuyItemLayout = ({ captionItemHeader, layout, onItemBuy, onItemGift, srcVipIcon }: VipBuyItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 320, height: 75, ...layout }}>
            <Border
                variant="2"
                params={16}
                tintColor="#969696"
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 75, minWidth: 320, maxWidth: 320, minHeight: 75 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#dfdfdf"
                    layout={{ position: 'absolute', left: 1, width: 320, top: 1, height: 73, minWidth: 320, maxWidth: 320 }}
                />
                <Border
                    variant="2"
                    params={16}
                    tintColor="#969696"
                    layout={{ position: 'absolute', left: 5, width: 310, top: 5, height: 25, minWidth: 310, maxWidth: 310 }}
                >
                    <Region
                        name="item_header"
                        params={16}
                        layout={{ position: 'absolute', left: 60, width: 187, top: 2, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemHeader ?? 'catalog.club.item.header'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="vip_icon"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcVipIcon ?? layoutImage('vip_icon_medium.gif')}
                        layout={{ position: 'absolute', left: 6, width: 33, top: 4, height: 17 }}
                    />
                </Border>
                <Region
                    name="item_price"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 112, top: 41, height: 26 }}
                />
                <ButtonThick
                    variant="5"
                    name="item_buy"
                    params={393233}
                    tintColor="#00aa00"
                    onPointerTap={onItemBuy}
                    layout={{ position: 'absolute', right: 5, width: 90, top: 37, height: 30, minWidth: 90, maxWidth: 90, minHeight: 30, maxHeight: 30 }}
                >
                    {t('catalog.club.button.buy')}
                </ButtonThick>
                <ButtonThick
                    variant="5"
                    name="item_gift"
                    params={393233}
                    tintColor="#00aa00"
                    onPointerTap={onItemGift}
                    layout={{ position: 'absolute', right: 100, width: 90, top: 37, height: 30, minWidth: 90, maxWidth: 90, minHeight: 30, maxHeight: 30 }}
                >
                    {t('catalog.purchase_confirmation.gift')}
                </ButtonThick>
            </Border>
        </Region>
    );
};
