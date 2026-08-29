import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `cancel_button` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const PremiumPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: PremiumPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            onPointerTap={onCancelButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('reward_track.premium.confirm.cancel')}
        </Button>
    );
};
