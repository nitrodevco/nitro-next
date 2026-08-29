import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `buy_costumes` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutBuyCostumesItemProps {
    layout?: BoxLayout;
    onBuyCostumes?: () => void;
}

export const CostumehopperCostumerequiredLayoutBuyCostumesItem = ({ layout, onBuyCostumes }: CostumehopperCostumerequiredLayoutBuyCostumesItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_costumes"
            tintColor="#00aa00"
            onPointerTap={onBuyCostumes}
            layout={{ width: 193, height: 32, flexShrink: 0, ...layout }}
        >
            {t('costumehopper.costumerequired.buy')}
        </ButtonThick>
    );
};
