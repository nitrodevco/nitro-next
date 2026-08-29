import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `pickup` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutPickupItemProps {
    layout?: BoxLayout;
    onPickup?: () => void;
}

export const JukeboxViewLayoutPickupItem = ({ layout, onPickup }: JukeboxViewLayoutPickupItemProps) => {
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
