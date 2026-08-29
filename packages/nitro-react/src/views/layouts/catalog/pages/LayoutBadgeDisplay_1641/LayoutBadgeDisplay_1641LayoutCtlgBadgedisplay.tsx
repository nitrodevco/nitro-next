import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { ItemGridWidget, ItemGridWidgetProps } from '#base/views/layouts/catalog/widgets/ItemGridWidget';
import { LimitedItemWidget3, LimitedItemWidget3Props } from '#base/views/layouts/catalog/widgets/LimitedItemWidget3';
import { ProductViewWidget, ProductViewWidgetProps } from '#base/views/layouts/catalog/widgets/ProductViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SpecialInfoWidget, SpecialInfoWidgetProps } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget';
import { UserBadgeSelectorWidget2, UserBadgeSelectorWidget2Props } from '#base/views/layouts/catalog/widgets/UserBadgeSelectorWidget2';

/** Named region `ctlg_badgedisplay` of LayoutBadgeDisplay_1641Layout - configured through the parent's `ctlgBadgedisplay` prop. */
export interface LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    itemGridWidget?: ItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LimitedItemWidget3Props;
    productViewWidget?: ProductViewWidgetProps;
    purchaseWidget?: PurchaseWidgetProps;
    specialInfoWidget?: SpecialInfoWidgetProps;
    userBadgeSelectorWidget?: UserBadgeSelectorWidget2Props;
}

export const LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, specialInfoWidget, userBadgeSelectorWidget }: LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_badgedisplay"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                layout={{ position: 'absolute', left: 5, width: 107, top: 130, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <ProductViewWidget
                layout={{ position: 'absolute', right: 5, width: 175, top: 150, height: 248 }}
                {...productViewWidget}
            />
            <SpecialInfoWidget
                layout={{ position: 'absolute', left: 169, width: 142, top: 118, height: 73 }}
                {...specialInfoWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
            <ItemGridWidget
                layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 73 }}
                {...itemGridWidget}
            />
            <LimitedItemWidget3
                layout={{ position: 'absolute', right: 9, width: 170, top: 400, height: 30 }}
                {...limitedItemWidget}
            />
            <Region
                name="ctlg_selectbadge"
                layout={{ position: 'absolute', left: 5, width: 100, top: 227, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <UserBadgeSelectorWidget2
                layout={{ position: 'absolute', left: 4, width: 170, top: 242, height: 175 }}
                {...userBadgeSelectorWidget}
            />
        </Region>
    );
};
