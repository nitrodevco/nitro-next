import { BoxLayout, Region } from '#base/theme';

/** Row template `amount_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutAmountTextItemProps {
    captionAmountText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutAmountTextItem = ({ captionAmountText, layout }: InventoryTradingWiredLayoutAmountTextItemProps) => {
    return (
        <Region
            name="amount_text"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionAmountText ?? '2x'}
        </Region>
    );
};
