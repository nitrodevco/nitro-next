import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem2 = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlainText ?? t('inventory.wired_trading.receiving')}
            name="plain_text"
            layout={{ width: 90, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
