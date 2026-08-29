import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `plain_text` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutPlainTextItem2Props {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutPlainTextItem2 = ({ captionPlainText, layout }: InventoryTradingWiredLayoutPlainTextItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            layout={{ width: 90, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlainText ?? t('inventory.wired_trading.receiving')}
        </Region>
    );
};
