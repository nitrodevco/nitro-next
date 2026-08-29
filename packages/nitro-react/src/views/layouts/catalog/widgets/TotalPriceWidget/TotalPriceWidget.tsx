import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

import { TotalPriceWidgetTotalpriceContainer, TotalPriceWidgetTotalpriceContainerProps } from './TotalPriceWidgetTotalpriceContainer';

/**
 * Catalog widget `totalPriceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `totalPriceWidget` of TotalPriceWidget - configured through the parent's `totalPriceWidget` prop. */
export interface TotalPriceWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    totalpriceContainer?: TotalPriceWidgetTotalpriceContainerProps;
}

export const TotalPriceWidget = ({ layout, totalpriceContainer }: TotalPriceWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="totalPriceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 20, width: 158, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('catalog.bundlewidget.price')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <TotalPriceWidgetTotalpriceContainer {...totalpriceContainer} />
        </Region>
    );
};
