import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `btn_buy` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutBtnBuyItemProps {
    layout?: BoxLayout;
    onBtnBuy?: () => void;
}

export const TargetedOfferDialogLayoutBtnBuyItem = ({ layout, onBtnBuy }: TargetedOfferDialogLayoutBtnBuyItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_buy"
            tintColor="#4faf4f"
            onPointerTap={onBtnBuy}
            layout={{ width: 172, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.buy')}
        </ButtonThick>
    );
};
