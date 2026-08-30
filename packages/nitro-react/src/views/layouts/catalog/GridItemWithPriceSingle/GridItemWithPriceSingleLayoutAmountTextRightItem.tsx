import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_right` of GridItemWithPriceSingleLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceSingleLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceSingleLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: GridItemWithPriceSingleLayoutAmountTextRightItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextRight ?? '00000'}
            name="amount_text_right"
            layout={{ width: 38, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
