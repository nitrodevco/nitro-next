import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `pickup` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const FurniViewLayoutPickupItem = ({ layout, onPickup }: FurniViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            onPointerTap={onPickup}
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};
