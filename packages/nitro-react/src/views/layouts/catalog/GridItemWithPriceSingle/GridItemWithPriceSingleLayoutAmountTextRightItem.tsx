import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_right` of GridItemWithPriceSingleLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceSingleLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceSingleLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: GridItemWithPriceSingleLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextRight ?? '00000'}
        </Region>
    );
};
