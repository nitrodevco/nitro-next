import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { GuildBadgeViewWidget, GuildBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/GuildBadgeViewWidget';
import { GuildSelectorWidget, GuildSelectorWidgetProps } from '#base/views/layouts/catalog/widgets/GuildSelectorWidget';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Named region `ctlg_default_3x3` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    captionCtlgSelectproduct?: string;
    guildBadgeViewWidget?: GuildBadgeViewWidgetProps;
    guildSelectorWidget?: GuildSelectorWidgetProps;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    visibleCtlgSelectproduct?: boolean;
}

export const LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3 = ({ activityPointDisplayWidget, captionCtlgSelectproduct, guildBadgeViewWidget, guildSelectorWidget, itemGridWidget, layout, productViewWidget, purchaseWidget, specialInfoWidget, visibleCtlgSelectproduct }: LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {(visibleCtlgSelectproduct ?? false) && (
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                    name="ctlg_selectproduct"
                    layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15 }}
                />
            )}
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 245, bottom: 90 }}
                {...itemGridWidget}
            />
            <ProductViewWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <GuildSelectorWidget
                layout={{ position: 'absolute', left: 90, width: 180, bottom: 0, height: 85 }}
                {...guildSelectorWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 94, width: 142, top: 18, height: 73 }}
                {...specialInfoWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 199, width: 156, top: 190, height: 28 }}
                {...activityPointDisplayWidget}
            />
            <GuildBadgeViewWidget
                layout={{ position: 'absolute', left: 307, width: 40, top: 138, height: 40 }}
                {...guildBadgeViewWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};
