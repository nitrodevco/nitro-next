import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            layout={{ width: 95, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlainText ?? t('inventory.wired_trading.offering')}
        </Region>
    );
};
