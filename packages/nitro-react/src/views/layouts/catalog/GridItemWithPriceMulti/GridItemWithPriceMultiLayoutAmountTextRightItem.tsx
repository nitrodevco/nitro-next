import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_right` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: GridItemWithPriceMultiLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextRight ?? '00'}
        </Region>
    );
};
