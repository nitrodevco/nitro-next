import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_left` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: TotalPriceWidgetLayoutAmountTextLeftItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextLeft ?? '00000'}
            name="amount_text_left"
            layout={{ width: 38, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
