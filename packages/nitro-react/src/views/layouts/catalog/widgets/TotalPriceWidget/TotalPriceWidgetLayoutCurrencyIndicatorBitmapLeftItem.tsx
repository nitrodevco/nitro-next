import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_left` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItem = ({ layout }: TotalPriceWidgetLayoutCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="34"
            name="currency_indicator_bitmap_left"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
