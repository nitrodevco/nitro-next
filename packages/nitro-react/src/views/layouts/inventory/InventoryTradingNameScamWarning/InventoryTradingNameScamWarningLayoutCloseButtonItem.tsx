import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `close_button` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const InventoryTradingNameScamWarningLayoutCloseButtonItem = ({ layout, onCloseButton }: InventoryTradingNameScamWarningLayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="close_button"
            onPointerTap={onCloseButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 50, height: 26, flexShrink: 0, ...layout }}
        >
            {t('inventory.trading.namescam.close')}
        </Button>
    );
};
