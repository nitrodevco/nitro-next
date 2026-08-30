import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlainText ?? t('inventory.wired_trading.offering')}
            name="plain_text"
            layout={{ width: 95, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
