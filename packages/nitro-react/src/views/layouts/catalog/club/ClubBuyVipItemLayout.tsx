import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1721_club_buy_vip_item_xml` (layout "club_buy_info_item", 151x67) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyVipItemLayoutProps {
    captionItemHeader?: string;
    captionItemPrice?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const ClubBuyVipItemLayout = ({ captionItemHeader, captionItemPrice, layout, onItemBuy }: ClubBuyVipItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 151, height: 67, ...layout }}>
            <Border
                variant="2"
                tintColor="#969696"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    tintColor="#dfdfdf"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                />
                <Border
                    variant="2"
                    tintColor="#969696"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 25 }}
                >
                    <Icon
                        variant="12"
                        layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                    />
                    <ThemeText
                        text={captionItemHeader ?? 'catalog.club.item.header'}
                        textOptions={{ fill: '#ffffff' }}
                        name="item_header"
                        layout={{ position: 'absolute', right: 5, width: 90, top: 5, bottom: 5 }}
                    />
                </Border>
                <ThemeText
                    text={captionItemPrice ?? 'catalog.club.price'}
                    name="item_price"
                    layout={{ position: 'absolute', left: 9, width: 101, bottom: 6, height: 17 }}
                />
                <Button
                    variant="3"
                    name="item_buy"
                    onPointerTap={onItemBuy}
                    layout={{ position: 'absolute', right: 8, width: 151, bottom: 7, height: 22, minWidth: 40 }}
                >
                    {t('catalog.club.button.buy')}
                </Button>
            </Border>
        </Region>
    );
};
