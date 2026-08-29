import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `select_button` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSelectButtonItemProps {
    layout?: BoxLayout;
    onSelectButton?: () => void;
}

export const AreaHideUiLayoutSelectButtonItem = ({ layout, onSelectButton }: AreaHideUiLayoutSelectButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="select_button"
            onPointerTap={onSelectButton}
            layout={{ width: 211, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        >
            {t('widget.areahide.area_selection.select')}
        </Button>
    );
};
