import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `confirm_button` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutConfirmButtonItemProps {
    layout?: BoxLayout;
    onConfirmButton?: () => void;
}

export const HabbiconPurchaseConfirmationLayoutConfirmButtonItem = ({ layout, onConfirmButton }: HabbiconPurchaseConfirmationLayoutConfirmButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="confirm_button"
            tintColor="#00aa00"
            onPointerTap={onConfirmButton}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.buy')}
        </ButtonThick>
    );
};
