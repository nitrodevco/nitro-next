import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `bold_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutBoldTextItemProps {
    captionBoldText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutBoldTextItem = ({ captionBoldText, layout }: InventoryTradingLayoutBoldTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionBoldText ?? t('inventory.trading.you')}
            name="bold_text"
            layout={{ width: 127, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
