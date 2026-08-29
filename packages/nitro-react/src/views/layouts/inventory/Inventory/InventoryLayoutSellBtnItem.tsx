import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `sell_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutSellBtnItemProps {
    layout?: BoxLayout;
    onSellBtn?: () => void;
}

export const InventoryLayoutSellBtnItem = ({ layout, onSellBtn }: InventoryLayoutSellBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="sell_btn"
            onPointerTap={onSellBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 167, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.marketplace.sell')}
        </Button>
    );
};
