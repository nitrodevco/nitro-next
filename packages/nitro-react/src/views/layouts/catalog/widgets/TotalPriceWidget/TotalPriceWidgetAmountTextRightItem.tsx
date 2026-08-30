import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetAmountTextRightItem = ({ captionAmountTextRight, layout }: TotalPriceWidgetAmountTextRightItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextRight ?? '0'}
            name="amount_text_right"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
