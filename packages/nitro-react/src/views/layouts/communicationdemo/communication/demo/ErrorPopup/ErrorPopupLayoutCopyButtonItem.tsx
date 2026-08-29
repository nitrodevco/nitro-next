import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `copy_button` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutCopyButtonItemProps {
    layout?: BoxLayout;
    onCopyButton?: () => void;
}

export const ErrorPopupLayoutCopyButtonItem = ({ layout, onCopyButton }: ErrorPopupLayoutCopyButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="copy_button"
            onPointerTap={onCopyButton}
            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125, ...layout }}
        >
            {t('error_window.copy')}
        </Button>
    );
};
