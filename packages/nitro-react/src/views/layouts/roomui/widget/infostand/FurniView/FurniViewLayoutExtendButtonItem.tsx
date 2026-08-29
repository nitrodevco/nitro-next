import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `extend_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const FurniViewLayoutExtendButtonItem = ({ layout, onExtendButton }: FurniViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            onPointerTap={onExtendButton}
            layout={{ width: 143, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};
