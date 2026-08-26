import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1674_club_buy_hc_item_xml` (layout "club_buy_info_item", 151x67) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyHcItemLayoutProps {
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const ClubBuyHcItemLayout = ({ layout, onItemBuy }: ClubBuyHcItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 151, height: 67, ...layout }}>
            <Border
                variant="2"
                params={16}
                tintColor="#9b9448"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 67 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#ebeada"
                    layout={{ position: 'absolute', left: 1, width: 149, top: 1, height: 65 }}
                />
                <Border
                    variant="2"
                    params={16}
                    tintColor="#9b9448"
                    layout={{ position: 'absolute', left: 5, width: 141, top: 5, height: 25 }}
                >
                    <Icon
                        variant="11"
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                    />
                    <Region
                        name="item_header"
                        params={16}
                        layout={{ position: 'absolute', left: -4, width: 141, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="catalog.club.item.header"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="item_price"
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 101, top: 44, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="catalog.club.price" />
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
