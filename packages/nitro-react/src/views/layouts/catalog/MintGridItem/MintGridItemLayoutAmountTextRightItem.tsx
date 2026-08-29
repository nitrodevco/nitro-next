import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text_right` of MintGridItemLayout - pass real rows through its `items…` slot. */
export interface MintGridItemLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const MintGridItemLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: MintGridItemLayoutAmountTextRightItemProps) => {
    return (
        <Region
            name="amount_text_right"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountTextRight ?? '00000'}
        </Region>
    );
};
