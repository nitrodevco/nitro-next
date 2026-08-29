import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `plain_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutPlainTextItemProps {
    captionPlainText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutPlainTextItem = ({ captionPlainText, layout }: InventoryTradingLayoutPlainTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plain_text"
            layout={{ width: 167, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPlainText ?? t('inventory.trading.areoffering')}
        </Region>
    );
};
