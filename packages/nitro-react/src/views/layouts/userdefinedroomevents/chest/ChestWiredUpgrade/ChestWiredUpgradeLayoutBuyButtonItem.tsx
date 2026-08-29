import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `buy_button` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutBuyButtonItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const ChestWiredUpgradeLayoutBuyButtonItem = ({ layout, onBuyButton }: ChestWiredUpgradeLayoutBuyButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_button"
            tintColor="#00aa00"
            onPointerTap={onBuyButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.buy')}
        </ButtonThick>
    );
};
