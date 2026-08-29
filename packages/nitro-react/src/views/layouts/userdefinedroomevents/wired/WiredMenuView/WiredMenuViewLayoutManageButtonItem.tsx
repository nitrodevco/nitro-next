import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `manage_button` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutManageButtonItemProps {
    layout?: BoxLayout;
    onManageButton?: () => void;
}

export const WiredMenuViewLayoutManageButtonItem = ({ layout, onManageButton }: WiredMenuViewLayoutManageButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="manage_button"
            tooltip={t('wiredmenu.variable_overview.manage.tooltip')}
            onPointerTap={onManageButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89, ...layout }}
        >
            {t('wiredmenu.variable_overview.manage')}
        </Button>
    );
};
