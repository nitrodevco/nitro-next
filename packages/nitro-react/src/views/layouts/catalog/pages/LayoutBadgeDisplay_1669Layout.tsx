import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { LimitedItemWidget, LimitedItemWidgetProps } from '#base/views/layouts/catalog/widgets/LimitedItemWidget';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';
import { UserBadgeSelectorWidget2, UserBadgeSelectorWidget2Props } from '#base/views/layouts/catalog/widgets/UserBadgeSelectorWidget2';

/** Generated from `1669_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1669LayoutProps {
    ctlgBadgedisplay?: LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669Layout = ({ ctlgBadgedisplay, layout }: LayoutBadgeDisplay_1669LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay {...ctlgBadgedisplay} />
        </Region>
    );
};

/** Named region `ctlg_badgedisplay` of LayoutBadgeDisplay_1669Layout - configured through the parent's `ctlgBadgedisplay` prop. */
export interface LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LimitedItemWidgetProps;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    tags?: string[];
    userBadgeSelectorWidget?: UserBadgeSelectorWidget2Props;
}

export const LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, specialInfoWidget, tags, userBadgeSelectorWidget }: LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_badgedisplay"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                visible={false}
                layout={{ position: 'absolute', left: 5, width: 107, bottom: 40, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ProductViewWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                {...productViewWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 99, width: 142, top: 13, height: 73 }}
                {...specialInfoWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
            <ItemGridWidget
                layout={{ position: 'absolute', left: 0, width: 95, top: 245, bottom: 40 }}
                {...itemGridWidget}
            />
            <LimitedItemWidget
                layout={{ position: 'absolute', left: 180, width: 170, top: 20, height: 30 }}
                {...limitedItemWidget}
            />
            <Region
                name="ctlg_selectbadge"
                visible={false}
                layout={{ position: 'absolute', left: 190, width: 100, bottom: 44, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <UserBadgeSelectorWidget2
                layout={{ position: 'absolute', left: 105, width: 255, top: 245, bottom: 40 }}
                {...userBadgeSelectorWidget}
            />
        </Region>
    );
};
