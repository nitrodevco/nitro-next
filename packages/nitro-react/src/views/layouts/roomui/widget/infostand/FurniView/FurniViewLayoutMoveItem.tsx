import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `move` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
}

export const FurniViewLayoutMoveItem = ({ layout, onMove }: FurniViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            onPointerTap={onMove}
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};
