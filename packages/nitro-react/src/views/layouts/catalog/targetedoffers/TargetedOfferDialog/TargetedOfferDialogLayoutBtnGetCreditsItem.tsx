import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `btn_get_credits` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutBtnGetCreditsItemProps {
    layout?: BoxLayout;
    onBtnGetCredits?: () => void;
}

export const TargetedOfferDialogLayoutBtnGetCreditsItem = ({ layout, onBtnGetCredits }: TargetedOfferDialogLayoutBtnGetCreditsItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_get_credits"
            tintColor="#4faf4f"
            onPointerTap={onBtnGetCredits}
            layout={{ width: 189, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.credits')}
        </ButtonThick>
    );
};
