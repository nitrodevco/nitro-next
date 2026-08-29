import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `redeemItemCodeWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 3 pages
 * (LayoutFrontpageFeaturedLayout, LayoutFrontpage_1554Layout, LayoutFrontpage_1597Layout); each passes its own placement through `layout`.
 */
/** Named region `redeemItemCodeWidget` of RedeemItemCodeWidget - configured through the parent's `redeemItemCodeWidget` prop. */
export interface RedeemItemCodeWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    onRedeem?: () => void;
}

export const RedeemItemCodeWidget = ({ layout, onRedeem }: RedeemItemCodeWidgetProps) => {
    const t = useTranslation();
    const [ voucherCodeValue, setVoucherCodeValue ] = useState('');

    return (
        <Region
            name="redeemItemCodeWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 10, width: 216, top: 5, height: 25 }}
            >
                <TextInput
                    value={voucherCodeValue}
                    onChange={setVoucherCodeValue}
                    multiline
                    layout={{ position: 'absolute', left: 4, width: 206, top: 4, height: 15 }}
                />
            </Border>
            <Button
                variant="3"
                name="redeem"
                onPointerTap={onRedeem}
                layout={{ position: 'absolute', left: 274, right: 9, top: 5, height: 22, maxWidth: 100 }}
            >
                {t('redeem')}
            </Button>
        </Region>
    );
};
