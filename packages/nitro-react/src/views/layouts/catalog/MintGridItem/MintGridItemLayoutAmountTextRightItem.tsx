import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text_right` of MintGridItemLayout - pass real rows through its `items…` slot. */
export interface MintGridItemLayoutAmountTextRightItemProps {
    captionAmountTextRight?: string;
    layout?: BoxLayout;
}

export const MintGridItemLayoutAmountTextRightItem = ({ captionAmountTextRight, layout }: MintGridItemLayoutAmountTextRightItemProps) => {
    return (
        <ThemeText
            text={captionAmountTextRight ?? '00000'}
            name="amount_text_right"
            layout={{ width: 17, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
