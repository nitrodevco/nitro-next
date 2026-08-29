import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_right` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: TotalPriceWidgetLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextRight ?? '00000'}
        </Region>
    );
};
