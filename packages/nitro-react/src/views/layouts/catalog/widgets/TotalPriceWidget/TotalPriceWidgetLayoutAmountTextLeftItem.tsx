import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_left` of TotalPriceWidgetLayout - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetLayoutAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetLayoutAmountTextLeftItem = ({ captionAmountTextLeft, layout }: TotalPriceWidgetLayoutAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            layout={{ width: 38, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextLeft ?? '00000'}
        </Region>
    );
};
