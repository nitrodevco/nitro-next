import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { BundlePurchaseExtraInfoWidget, BundlePurchaseExtraInfoWidgetProps } from '#base/views/layouts/catalog/widgets/BundlePurchaseExtraInfoWidget';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { LimitedItemWidget2, LimitedItemWidget2Props } from '#base/views/layouts/catalog/widgets/LimitedItemWidget2';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SoldLtdItemsWidget, SoldLtdItemsWidgetProps } from '#base/views/layouts/catalog/widgets/SoldLtdItemsWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';
import { SpinnerWidget2, SpinnerWidget2Props } from '#base/views/layouts/catalog/widgets/SpinnerWidget2';
import { TotalPriceWidget, TotalPriceWidgetProps } from '#base/views/layouts/catalog/widgets/TotalPriceWidget';

/** Generated from `1725_layout_default_xml` (layout "ctlg_default_3x3", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1725LayoutProps {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    bundlePurchaseExtraInfoWidget?: BundlePurchaseExtraInfoWidgetProps;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LimitedItemWidget2Props;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    soldLtdItemsWidget?: SoldLtdItemsWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    spinnerWidget?: SpinnerWidget2Props;
    totalPriceWidget?: TotalPriceWidgetProps;
}

export const LayoutDefault_1725Layout = ({ activityPointDisplayWidget, bundlePurchaseExtraInfoWidget, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, soldLtdItemsWidget, specialInfoWidget, spinnerWidget, totalPriceWidget }: LayoutDefault_1725LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}>
                <ProductViewWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 180 }}
                    {...productViewWidget}
                />
                <ItemGridWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 305, height: 120 }}
                    {...itemGridWidget}
                />
                <PurchaseWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                    {...purchaseWidget}
                />
                <ActivityPointDisplayWidget
                    layout={{ position: 'absolute', left: 183, width: 175, top: 123, height: 25 }}
                    {...activityPointDisplayWidget}
                />
                <SpecialInfoWidget
                    layout={{ position: 'absolute', left: 114, width: 142, top: 118, height: 73 }}
                    {...specialInfoWidget}
                />
                <BundlePurchaseExtraInfoWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 155 }}
                    {...bundlePurchaseExtraInfoWidget}
                />
                <SpinnerWidget2
                    layout={{ position: 'absolute', left: 0, width: 180, top: 275, height: 25 }}
                    {...spinnerWidget}
                />
                <TotalPriceWidget
                    layout={{ position: 'absolute', left: 180, width: 180, top: 275, height: 25 }}
                    {...totalPriceWidget}
                />
                <LimitedItemWidget2
                    layout={{ position: 'absolute', left: 187, width: 174, top: 122, height: 40 }}
                    {...limitedItemWidget}
                />
                <SoldLtdItemsWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 425, height: 30 }}
                    {...soldLtdItemsWidget}
                />
            </Region>
        </Region>
    );
};
