import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `buyrenteditem_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBuyrenteditemBtnItemProps {
    layout?: BoxLayout;
    onBuyrenteditemBtn?: () => void;
}

export const InventoryLayoutBuyrenteditemBtnItem = ({ layout, onBuyrenteditemBtn }: InventoryLayoutBuyrenteditemBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="buyrenteditem_btn"
            onPointerTap={onBuyrenteditemBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 189, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.buyrenteditem')}
        </Button>
    );
};
