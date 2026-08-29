import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `cancel_button` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: TargetedOfferPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            onPointerTap={onCancelButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.cancel')}
        </Button>
    );
};
