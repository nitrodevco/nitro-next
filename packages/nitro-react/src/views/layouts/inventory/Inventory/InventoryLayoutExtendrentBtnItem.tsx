import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `extendrent_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutExtendrentBtnItemProps {
    layout?: BoxLayout;
    onExtendrentBtn?: () => void;
}

export const InventoryLayoutExtendrentBtnItem = ({ layout, onExtendrentBtn }: InventoryLayoutExtendrentBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="extendrent_btn"
            onPointerTap={onExtendrentBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 168, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.extendrent')}
        </Button>
    );
};
