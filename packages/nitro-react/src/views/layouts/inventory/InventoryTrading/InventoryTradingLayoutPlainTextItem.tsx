import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plain_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlainText ?? t('inventory.trading.areoffering')}
            name="plain_text"
            layout={{ width: 167, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
