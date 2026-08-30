import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_right` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: GridItemWithPriceMultiLayoutAmountTextRightItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextRight ?? '00'}
            name="amount_text_right"
            layout={{ width: 17, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
