import { BoxLayout, Region } from '#base/theme';
import { ActivityPointDisplayWidget, ActivityPointDisplayWidgetProps } from '#base/views/layouts/catalog/widgets/ActivityPointDisplayWidget';
import { BuilderWidget, BuilderWidgetProps } from '#base/views/layouts/catalog/widgets/BuilderWidget';
import { ColourGridWidget, ColourGridWidgetProps } from '#base/views/layouts/catalog/widgets/ColourGridWidget';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { LimitedItemWidget, LimitedItemWidgetProps } from '#base/views/layouts/catalog/widgets/LimitedItemWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SoldLtdItemsWidget, SoldLtdItemsWidgetProps } from '#base/views/layouts/catalog/widgets/SoldLtdItemsWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';
import { SpinnerWidget, SpinnerWidgetProps } from '#base/views/layouts/catalog/widgets/SpinnerWidget';
import { TotalPriceWidget, TotalPriceWidgetProps } from '#base/views/layouts/catalog/widgets/TotalPriceWidget/TotalPriceWidget';

/** Named region `container` of LayoutDefault_1595Layout - configured through the parent's `container` prop. */
export interface LayoutDefault_1595LayoutContainerProps {
    activityPointDisplayWidget?: ActivityPointDisplayWidgetProps;
    builderWidget?: BuilderWidgetProps;
    colourGridWidget?: ColourGridWidgetProps;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LimitedItemWidgetProps;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    soldLtdItemsWidget?: SoldLtdItemsWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    spinnerWidget?: SpinnerWidgetProps;
    totalPriceWidget?: TotalPriceWidgetProps;
    visibleColourGridWidget?: boolean;
}

export const LayoutDefault_1595LayoutContainer = ({ activityPointDisplayWidget, builderWidget, colourGridWidget, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, soldLtdItemsWidget, specialInfoWidget, spinnerWidget, totalPriceWidget, visibleColourGridWidget }: LayoutDefault_1595LayoutContainerProps) => {
    return (
        <Region
            name="container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {/* `label` is hidden and has no name to show it by */}
            <ProductViewWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 245, bottom: 60 }}
                {...itemGridWidget}
            />
            {(visibleColourGridWidget ?? false) && (
                <ColourGridWidget
                    layout={{ position: 'absolute', left: 182, width: 176, bottom: 60, height: 155 }}
                    {...colourGridWidget}
                />
            )}
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
            <ActivityPointDisplayWidget
                layout={{ position: 'absolute', left: 182, width: 175, top: 2, height: 25 }}
                {...activityPointDisplayWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 109, width: 142, top: 20, height: 73 }}
                {...specialInfoWidget}
            />
            <LimitedItemWidget
                layout={{ position: 'absolute', left: 186, width: 174, top: 5, height: 35 }}
                {...limitedItemWidget}
            />
            <SoldLtdItemsWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 5, height: 30 }}
                {...soldLtdItemsWidget}
            />
            <SpinnerWidget
                layout={{ position: 'absolute', left: 0, width: 200, bottom: 30, height: 25 }}
                {...spinnerWidget}
            />
            <TotalPriceWidget
                layout={{ position: 'absolute', left: 180, width: 180, bottom: 30, height: 25 }}
                {...totalPriceWidget}
            />
            <BuilderWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 60 }}
                {...builderWidget}
            />
        </Region>
    );
};
