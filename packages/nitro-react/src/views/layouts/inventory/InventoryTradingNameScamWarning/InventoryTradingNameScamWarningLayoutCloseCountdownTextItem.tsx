import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `close_countdown_text` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutCloseCountdownTextItemProps {
    captionCloseCountdownText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingNameScamWarningLayoutCloseCountdownTextItem = ({ captionCloseCountdownText, layout }: InventoryTradingNameScamWarningLayoutCloseCountdownTextItemProps) => {
    return (
        <ThemeText
            text={captionCloseCountdownText ?? '3s'}
            textOptions={{ fill: '#555555' }}
            name="close_countdown_text"
            layout={{ width: 16, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
