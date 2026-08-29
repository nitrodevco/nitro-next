import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `rotate` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const CrackableFurniViewLayoutRotateItem = ({ layout, onRotate }: CrackableFurniViewLayoutRotateItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="rotate"
            onPointerTap={onRotate}
            textStyle="text-style-button-regular"
            layout={{ width: 141, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rotate')}
        </Button>
    );
};
