import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { GuildBadgeViewWidget, GuildBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/GuildBadgeViewWidget';
import { GuildSelectorWidget, GuildSelectorWidgetProps } from '#base/views/layouts/catalog/widgets/GuildSelectorWidget';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';

/** Named region `ctlg_default_3x3` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    captionCtlgSelectproduct?: string;
    guildBadgeViewWidget?: GuildBadgeViewWidgetProps;
    guildSelectorWidget?: GuildSelectorWidgetProps;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
}

export const LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3 = ({ activityPointDisplayWidget, captionCtlgSelectproduct, guildBadgeViewWidget, guildSelectorWidget, itemGridWidget, layout, productViewWidget, purchaseWidget, specialInfoWidget }: LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <ItemGridWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 185 }}
                {...itemGridWidget}
            />
            <ProductViewWidget
                layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 275 }}
                {...productViewWidget}
            />
            <GuildSelectorWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 340, height: 85 }}
                {...guildSelectorWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 194, width: 142, top: 118, height: 73 }}
                {...specialInfoWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 199, width: 156, top: 120, height: 28 }}
                {...activityPointDisplayWidget}
            />
            <GuildBadgeViewWidget
                layout={{ position: 'absolute', left: 202, width: 40, top: 378, height: 40 }}
                {...guildBadgeViewWidget}
            />
        </Region>
    );
};
