import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `btn_buy` of TargetedOfferDialogVariationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogVariationLayoutBtnBuyItemProps {
    layout?: BoxLayout;
    onBtnBuy?: () => void;
}

export const TargetedOfferDialogVariationLayoutBtnBuyItem = ({ layout, onBtnBuy }: TargetedOfferDialogVariationLayoutBtnBuyItemProps) => {
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
