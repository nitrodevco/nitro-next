import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `goto_room_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutGotoRoomBtnItemProps {
    layout?: BoxLayout;
    onGotoRoomBtn?: () => void;
}

export const InventoryLayoutGotoRoomBtnItem = ({ layout, onGotoRoomBtn }: InventoryLayoutGotoRoomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="goto_room_btn"
            onPointerTap={onGotoRoomBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 165, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.gotoroom')}
        </Button>
    );
};
