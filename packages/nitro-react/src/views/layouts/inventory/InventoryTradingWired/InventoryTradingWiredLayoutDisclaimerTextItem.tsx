import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `disclaimer_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutDisclaimerTextItemProps {
    captionDisclaimerText?: string;
    layout?: BoxLayout;
    visibleDisclaimerText?: boolean;
}

export const InventoryTradingWiredLayoutDisclaimerTextItem = ({ captionDisclaimerText, layout, visibleDisclaimerText }: InventoryTradingWiredLayoutDisclaimerTextItemProps) => {
    const t = useTranslation();

    return (
        (visibleDisclaimerText ?? false) && (
            <ThemeText
                text={captionDisclaimerText ?? t('inventory.wired_trading.requirements.receive_text_disclaimer')}
                textOptions={{ fill: '#bf272a', wordWrap: true, wordWrapWidth: 390 }}
                name="disclaimer_text"
                verticalAlign="top"
                layout={{ width: 390, height: 32, flexShrink: 0, minWidth: 220, ...layout }}
            />
        )
    );
};
