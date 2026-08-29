import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `use_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutUseBtnItemProps {
    layout?: BoxLayout;
    onUseBtn?: () => void;
}

export const InventoryLayoutUseBtnItem = ({ layout, onUseBtn }: InventoryLayoutUseBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="use_btn"
            onPointerTap={onUseBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 125, height: 28, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.use')}
        </Button>
    );
};
