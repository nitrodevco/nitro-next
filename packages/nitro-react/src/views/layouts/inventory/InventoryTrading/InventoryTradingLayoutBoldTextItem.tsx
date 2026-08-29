import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `bold_text` of InventoryTradingLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingLayoutBoldTextItemProps {
    captionBoldText?: string;
    layout?: BoxLayout;
}

export const InventoryTradingLayoutBoldTextItem = ({ captionBoldText, layout }: InventoryTradingLayoutBoldTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bold_text"
            layout={{ width: 127, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionBoldText ?? t('inventory.trading.you')}
        </Region>
    );
};
