import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `rotate` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutRotateItemProps {
    layout?: BoxLayout;
    onRotate?: () => void;
}

export const JukeboxViewLayoutRotateItem = ({ layout, onRotate }: JukeboxViewLayoutRotateItemProps) => {
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
