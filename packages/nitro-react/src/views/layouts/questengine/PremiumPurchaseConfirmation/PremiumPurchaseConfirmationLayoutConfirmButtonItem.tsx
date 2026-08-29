import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `confirm_button` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutConfirmButtonItemProps {
    layout?: BoxLayout;
    onConfirmButton?: () => void;
}

export const PremiumPurchaseConfirmationLayoutConfirmButtonItem = ({ layout, onConfirmButton }: PremiumPurchaseConfirmationLayoutConfirmButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="5"
            name="confirm_button"
            tintColor="#b265ce"
            onPointerTap={onConfirmButton}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('reward_track.premium.confirm.buy')}
        </Button>
    );
};
