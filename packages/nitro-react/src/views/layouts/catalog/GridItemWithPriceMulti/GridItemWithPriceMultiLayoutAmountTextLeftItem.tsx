import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_left` of GridItemWithPriceMultiLayout - pass real rows through its `items…` slot. */
export interface GridItemWithPriceMultiLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const GridItemWithPriceMultiLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: GridItemWithPriceMultiLayoutAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextLeft ?? '00'}
        </Region>
    );
};
