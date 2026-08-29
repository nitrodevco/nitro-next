import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetCurrencyIndicatorBitmapLeftItem = ({ layout }: TotalPriceWidgetCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
