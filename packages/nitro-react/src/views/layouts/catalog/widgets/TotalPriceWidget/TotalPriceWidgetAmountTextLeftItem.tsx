import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetAmountTextLeftItemProps {
    captionAmountTextLeft?: string;
    layout?: BoxLayout;
}

export const TotalPriceWidgetAmountTextLeftItem = ({ captionAmountTextLeft, layout }: TotalPriceWidgetAmountTextLeftItemProps) => {
    return (
        <Region
            name="amount_text_left"
            layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextLeft ?? '0'}
        </Region>
    );
};
