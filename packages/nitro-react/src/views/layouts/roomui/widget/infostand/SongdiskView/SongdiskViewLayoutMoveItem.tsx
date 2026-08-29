import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `move` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutMoveItemProps {
    layout?: BoxLayout;
    onMove?: () => void;
}

export const SongdiskViewLayoutMoveItem = ({ layout, onMove }: SongdiskViewLayoutMoveItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="move"
            onPointerTap={onMove}
            textStyle="text-style-button-regular"
            layout={{ width: 134, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.move')}
        </Button>
    );
};
