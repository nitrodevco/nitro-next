import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plain_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutPlainTextItem2 = ({ captionPlainText, layout }: InventoryTradingLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlainText ?? t('inventory.trading.isoffering')}
            name="plain_text"
            layout={{ width: 157, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
