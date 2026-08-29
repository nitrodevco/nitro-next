import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetCurrencyIndicatorBitmapRightItem = ({ layout }: TotalPriceWidgetCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_right"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
