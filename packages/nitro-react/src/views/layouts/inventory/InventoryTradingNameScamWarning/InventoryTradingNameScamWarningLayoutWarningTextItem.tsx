import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `warning_text` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutWarningTextItemProps {
    captionWarningText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingNameScamWarningLayoutWarningTextItem = ({ captionWarningText, layout }: InventoryTradingNameScamWarningLayoutWarningTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionWarningText ?? t('inventory.trading.namescam.warning')}
            textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
            name="warning_text"
            verticalAlign="top"
            layout={{ width: 330, height: 44, flexShrink: 0, ...layout }}
        />
    );
};
