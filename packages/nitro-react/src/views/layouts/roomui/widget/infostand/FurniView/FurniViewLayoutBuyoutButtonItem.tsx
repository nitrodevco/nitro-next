import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `buyout_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
}

export const FurniViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton }: FurniViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            onPointerTap={onBuyoutButton}
            layout={{ width: 143, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};
