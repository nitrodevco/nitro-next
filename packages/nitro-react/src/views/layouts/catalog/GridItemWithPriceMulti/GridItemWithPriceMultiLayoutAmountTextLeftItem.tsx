import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_left` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: GridItemWithPriceMultiLayoutAmountTextLeftItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextLeft ?? '00'}
            name="amount_text_left"
            layout={{ width: 17, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
