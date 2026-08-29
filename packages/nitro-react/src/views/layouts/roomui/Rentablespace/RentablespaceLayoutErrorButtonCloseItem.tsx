import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `error_button_close` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorButtonCloseItemProps {
    layout?: BoxLayout;
    onErrorButtonClose?: () => void;
}

export const RentablespaceLayoutErrorButtonCloseItem = ({ layout, onErrorButtonClose }: RentablespaceLayoutErrorButtonCloseItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="error_button_close"
            onPointerTap={onErrorButtonClose}
            layout={{ width: 169, height: 22, flexShrink: 0, ...layout }}
        >
            {t('rentablespace.widget.close')}
        </Button>
    );
};
