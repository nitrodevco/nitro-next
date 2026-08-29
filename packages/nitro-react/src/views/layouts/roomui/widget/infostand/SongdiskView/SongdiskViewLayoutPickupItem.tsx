import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `pickup` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const SongdiskViewLayoutPickupItem = ({ layout, onPickup }: SongdiskViewLayoutPickupItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="pickup"
            onPointerTap={onPickup}
            textStyle="text-style-button-regular"
            layout={{ width: 139, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.pickup')}
        </Button>
    );
};
