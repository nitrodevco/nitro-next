import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `extend_button` of JukeboxViewLayout - pass real rows through its `items…` slot. */
export interface JukeboxViewLayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const JukeboxViewLayoutExtendButtonItem = ({ layout, onExtendButton }: JukeboxViewLayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="extend_button"
            onPointerTap={onExtendButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.extend')}
        </Button>
    );
};
