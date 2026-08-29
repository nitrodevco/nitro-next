import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `redeemItemCodeWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (RedeemItemCodeWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `redeemItemCodeWidget` of RedeemItemCodeWidget2 - configured through the parent's `redeemItemCodeWidget` prop. */
export interface RedeemItemCodeWidget2Props {
    captionVoucherCode?: string;
    layout?: BoxLayout;
    onRedeem?: () => void;
    tags?: string[];
}

export const RedeemItemCodeWidget2 = ({ captionVoucherCode, layout, onRedeem, tags }: RedeemItemCodeWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="redeemItemCodeWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 200, top: 25, height: 20 }}
            />
            <Button
                variant="3"
                name="redeem"
                onPointerTap={onRedeem}
                layout={{ position: 'absolute', left: 213, right: 7, top: 25, height: 22, maxWidth: 100 }}
            >
                {t('redeem')}
            </Button>
            <Region
                name="voucher_code"
                layout={{ position: 'absolute', left: 0, width: 72, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionVoucherCode ?? 'lorem ipsum'} />
            </Region>
        </Region>
    );
};
