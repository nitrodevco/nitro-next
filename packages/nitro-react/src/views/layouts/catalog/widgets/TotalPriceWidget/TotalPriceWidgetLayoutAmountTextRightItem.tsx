import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_right` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: TotalPriceWidgetLayoutAmountTextRightItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextRight ?? '00000'}
            name="amount_text_right"
            layout={{ width: 38, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
