import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `amount_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAmountTextItemProps {
    captionAmountText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAmountTextItem = ({ captionAmountText, layout }: InventoryTradingWiredLayoutAmountTextItemProps) => {
    return (
        <ThemeText
            text={captionAmountText ?? '2x'}
            name="amount_text"
            layout={{ width: 17, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
