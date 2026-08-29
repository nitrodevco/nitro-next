import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `put_in_inventory_button` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutPutInInventoryButtonItemProps {
    layout?: BoxLayout;
    onPutInInventoryButton?: () => void;
}

export const PackagecardNewOpenedLayoutPutInInventoryButtonItem = ({ layout, onPutInInventoryButton }: PackagecardNewOpenedLayoutPutInInventoryButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="put_in_inventory_button"
            onPointerTap={onPutInInventoryButton}
            layout={{ width: 230, height: 28, flexShrink: 0, minWidth: 206, ...layout }}
        >
            {t('widget.furni.present.put_in_inventory')}
        </Button>
    );
};
