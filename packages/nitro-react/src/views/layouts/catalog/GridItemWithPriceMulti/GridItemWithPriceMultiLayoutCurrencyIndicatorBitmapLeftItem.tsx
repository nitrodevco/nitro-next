import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_left` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItemProps {
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItem = ({ layout }: GridItemWithPriceMultiLayoutCurrencyIndicatorBitmapLeftItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_left"
            layout={{ width: 14, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
