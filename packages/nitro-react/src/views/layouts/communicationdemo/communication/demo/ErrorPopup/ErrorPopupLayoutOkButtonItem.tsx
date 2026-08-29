import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `ok_button` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutOkButtonItemProps {
    layout?: BoxLayout;
    onOkButton?: () => void;
}

export const ErrorPopupLayoutOkButtonItem = ({ layout, onOkButton }: ErrorPopupLayoutOkButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="ok_button"
            onPointerTap={onOkButton}
            layout={{ width: 125, height: 30, flexShrink: 0, minWidth: 125, ...layout }}
        >
            {t('error_window.ok')}
        </Button>
    );
};
