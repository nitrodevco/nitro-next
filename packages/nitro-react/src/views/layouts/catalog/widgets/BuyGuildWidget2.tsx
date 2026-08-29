import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `buyGuildWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildFrontpage_1668Layout); each passes its own placement through `layout`.
 */
/** Named region `buyGuildWidget` of BuyGuildWidget2 - configured through the parent's `buyGuildWidget` prop. */
export interface BuyGuildWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
    onStartGuildPurchase?: () => void;
}

export const BuyGuildWidget2 = ({ layout, onStartGuildPurchase }: BuyGuildWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="buyGuildWidget"
            layout={{ position: 'absolute', justifyContent: 'center', ...layout }}
        >
            <Button
                variant="3"
                name="start_guild_purchase"
                onPointerTap={onStartGuildPurchase}
                layout={{ position: 'absolute', marginLeft: -8, marginRight: 8, width: 213, top: 2, height: 28, minWidth: 190, minHeight: 28, maxHeight: 50 }}
            >
                {t('catalog.start.guild.purchase.button')}
            </Button>
        </Region>
    );
};
