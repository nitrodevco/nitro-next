import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `placeinroom_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutPlaceinroomBtnItemProps {
    layout?: BoxLayout;
    onPlaceinroomBtn?: () => void;
}

export const InventoryLayoutPlaceinroomBtnItem = ({ layout, onPlaceinroomBtn }: InventoryLayoutPlaceinroomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="placeinroom_btn"
            onPointerTap={onPlaceinroomBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.placetoroom')}
        </Button>
    );
};
