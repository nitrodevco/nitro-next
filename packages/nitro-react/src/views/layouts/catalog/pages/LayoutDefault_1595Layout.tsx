import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
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
import { TotalPriceWidget2, TotalPriceWidget2Props } from '#base/views/layouts/catalog/widgets/TotalPriceWidget2';

/** Generated from `1595_layout_default_xml` (layout "layout_default_ubuntu", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1595LayoutProps {
    container?: LayoutDefault_1595LayoutContainerProps;
    layout?: BoxLayout;
}

export const LayoutDefault_1595Layout = ({ container, layout }: LayoutDefault_1595LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutDefault_1595LayoutContainer {...container} />
        </Region>
    );
};

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
    tags?: string[];
    totalPriceWidget?: TotalPriceWidget2Props;
}

export const LayoutDefault_1595LayoutContainer = ({ activityPointDisplayWidget, builderWidget, colourGridWidget, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, soldLtdItemsWidget, specialInfoWidget, spinnerWidget, tags, totalPriceWidget }: LayoutDefault_1595LayoutContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 122, top: 243, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog_selectproduct')}
                    textStyle="text-style-u-italic"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <ProductViewWidget
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <ItemGridWidget
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 60 }}
                {...itemGridWidget}
            />
            <ColourGridWidget
                tags={[ 'E' ]}
                layout={{ position: 'absolute', left: 182, width: 176, bottom: 60, height: 155 }}
                {...colourGridWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
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
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 5, height: 30 }}
                {...soldLtdItemsWidget}
            />
            <SpinnerWidget
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 200, bottom: 30, height: 25 }}
                {...spinnerWidget}
            />
            <TotalPriceWidget2
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 180, width: 180, bottom: 30, height: 25 }}
                {...totalPriceWidget}
            />
            <BuilderWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 60 }}
                {...builderWidget}
            />
        </Region>
    );
};
