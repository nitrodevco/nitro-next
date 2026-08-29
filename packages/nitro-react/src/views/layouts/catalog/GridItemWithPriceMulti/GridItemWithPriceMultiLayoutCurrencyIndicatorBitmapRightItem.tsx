import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_right` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItem = ({ layout }: GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_right"
            layout={{ width: 14, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
