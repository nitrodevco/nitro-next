import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `rotate` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const FurniViewLayoutRotateItem = ({ layout, onRotate }: FurniViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            onPointerTap={onRotate}
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};
