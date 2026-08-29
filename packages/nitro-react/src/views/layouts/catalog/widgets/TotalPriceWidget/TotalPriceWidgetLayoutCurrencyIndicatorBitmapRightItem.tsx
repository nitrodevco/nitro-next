import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_right` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItem = ({ layout }: TotalPriceWidgetLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
