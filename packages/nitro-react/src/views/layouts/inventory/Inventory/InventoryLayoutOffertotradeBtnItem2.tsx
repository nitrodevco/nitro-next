import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `offertotrade_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeBtnItem2Props {
    layout?: BoxLayout;
    onOffertotradeBtn?: () => void;
}

export const InventoryLayoutOffertotradeBtnItem2 = ({ layout, onOffertotradeBtn }: InventoryLayoutOffertotradeBtnItem2Props) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="offertotrade_btn"
            onPointerTap={onOffertotradeBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 148, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('inventory.trading.offer')}
        </Button>
    );
};
