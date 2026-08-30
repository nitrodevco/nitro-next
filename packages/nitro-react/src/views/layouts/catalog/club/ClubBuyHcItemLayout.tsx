import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1674_club_buy_hc_item_xml` (layout "club_buy_info_item", 151x67) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyHcItemLayoutProps {
    captionItemHeader?: string;
    captionItemPrice?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
}

export const ClubBuyHcItemLayout = ({ captionItemHeader, captionItemPrice, layout, onItemBuy }: ClubBuyHcItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 151, height: 67, ...layout }}>
            <Border
                variant="2"
                tintColor="#9b9448"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    tintColor="#ebeada"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                />
                <Border
                    variant="2"
                    tintColor="#9b9448"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 25 }}
                >
                    <Icon
                        variant="11"
                        layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                    />
                    <ThemeText
                        text={captionItemHeader ?? 'catalog.club.item.header'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="item_header"
                        layout={{ position: 'absolute', left: -4, right: 4, top: 5, bottom: 3 }}
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
