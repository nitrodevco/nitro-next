import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `use` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutUseItemProps {
    layout?: BoxLayout;
    onUse?: () => void;
}

export const FurniViewLayoutUseItem = ({ layout, onUse }: FurniViewLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="use"
            onPointerTap={onUse}
            layout={{ width: 126, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.use')}
        </Button>
    );
};
