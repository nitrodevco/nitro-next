import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `bubble_title` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutBubbleTitleItemProps {
    captionBubbleTitle?: string;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutBubbleTitleItem = ({ captionBubbleTitle, layout }: InventoryTradingWiredLayoutBubbleTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bubble_title"
            layout={{ width: 390, height: 17, flexShrink: 0, minWidth: 220, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionBubbleTitle ?? t('inventory.wired_trading.requirements.trade')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
