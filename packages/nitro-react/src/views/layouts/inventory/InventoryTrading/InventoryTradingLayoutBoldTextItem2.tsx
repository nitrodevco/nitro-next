import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `bold_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutBoldTextItem2Props {
    captionBoldText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutBoldTextItem2 = ({ captionBoldText, layout }: InventoryTradingLayoutBoldTextItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionBoldText ?? t('inventory.trading.other')}
            name="bold_text"
            layout={{ width: 138, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
