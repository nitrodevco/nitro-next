import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1579_redeemItemCodeWidget_xml` (layout "redeemItemCodeWidget", 282x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RedeemItemCodeWidgetLayoutProps {
    captionVoucherCode?: string;
    layout?: BoxLayout;
    onRedeem?: () => void;
}

export const RedeemItemCodeWidgetLayout = ({ captionVoucherCode, layout, onRedeem }: RedeemItemCodeWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 282, height: 50, ...layout }}>
            <Region
                name="redeemItemCodeWidget"
                params={16}
                layout={{ position: 'absolute', left: 38, width: 282, top: 350, height: 50 }}
            >
                <Border
                    variant="0"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 200, top: 25, height: 20 }}
                />
                <Button
                    variant="3"
                    name="redeem"
                    params={393361}
                    onPointerTap={onRedeem}
                    layout={{ position: 'absolute', left: 213, right: 7, top: 25, height: 22, maxWidth: 100 }}
                >
                    {t('redeem')}
                </Button>
                <Region
                    name="voucher_code"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 72, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionVoucherCode ?? 'lorem ipsum'} />
                </Region>
            </Region>
        </Region>
    );
};
