import { BoxLayout, Icon } from '#base/theme';

/** Row template `currency_indicator_bitmap_right` of MintGridItemLayout - pass real rows through its `items…` slot. */
export interface MintGridItemLayoutCurrencyIndicatorBitmapRightItemProps {
    layout?: BoxLayout;
}

export const MintGridItemLayoutCurrencyIndicatorBitmapRightItem = ({ layout }: MintGridItemLayoutCurrencyIndicatorBitmapRightItemProps) => {
    return (
        <Icon
            variant="35"
            name="currency_indicator_bitmap_right"
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
