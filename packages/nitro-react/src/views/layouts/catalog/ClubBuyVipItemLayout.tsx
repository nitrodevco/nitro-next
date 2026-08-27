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
                params={16}
                tintColor="#969696"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 67 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#dfdfdf"
                    layout={{ position: 'absolute', left: 1, width: 149, top: 1, height: 65 }}
                />
                <Border
                    variant="2"
                    params={16}
                    tintColor="#969696"
                    layout={{ position: 'absolute', left: 5, width: 141, top: 5, height: 25 }}
                >
                    <Icon
                        variant="12"
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                    />
                    <Region
                        name="item_header"
                        params={16}
                        layout={{ position: 'absolute', left: 46, width: 90, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemHeader ?? 'catalog.club.item.header'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="item_price"
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 101, top: 44, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionItemPrice ?? 'catalog.club.price'} />
                </Region>
                <Button
                    variant="3"
                    name="item_buy"
                    params={393233}
                    onPointerTap={onItemBuy}
                    layout={{ position: 'absolute', left: -8, width: 151, top: 38, height: 22, minWidth: 40 }}
                >
                    {t('catalog.club.button.buy')}
                </Button>
            </Border>
        </Region>
    );
};
