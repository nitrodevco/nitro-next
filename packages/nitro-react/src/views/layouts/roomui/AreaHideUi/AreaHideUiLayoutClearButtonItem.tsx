import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `clear_button` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutClearButtonItemProps {
    layout?: BoxLayout;
    onClearButton?: () => void;
}

export const AreaHideUiLayoutClearButtonItem = ({ layout, onClearButton }: AreaHideUiLayoutClearButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="clear_button"
            onPointerTap={onClearButton}
            layout={{ width: 205, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        >
            {t('widget.areahide.area_selection.clear')}
        </Button>
    );
};
