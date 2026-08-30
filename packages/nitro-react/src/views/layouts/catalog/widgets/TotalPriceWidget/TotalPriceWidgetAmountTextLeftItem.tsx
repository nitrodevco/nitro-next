import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetAmountTextLeftItem = ({ captionAmountTextLeft, layout }: TotalPriceWidgetAmountTextLeftItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextLeft ?? '0'}
            name="amount_text_left"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
