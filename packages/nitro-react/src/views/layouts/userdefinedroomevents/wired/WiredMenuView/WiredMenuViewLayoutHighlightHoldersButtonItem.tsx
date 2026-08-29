import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `highlight_holders_button` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutHighlightHoldersButtonItemProps {
    layout?: BoxLayout;
    onHighlightHoldersButton?: () => void;
}

export const WiredMenuViewLayoutHighlightHoldersButtonItem = ({ layout, onHighlightHoldersButton }: WiredMenuViewLayoutHighlightHoldersButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="highlight_holders_button"
            tooltip={t('wiredmenu.variable_overview.highlight_holders.tooltip')}
            onPointerTap={onHighlightHoldersButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89, ...layout }}
        >
            {t('wiredmenu.variable_overview.highlight_holders')}
        </Button>
    );
};
