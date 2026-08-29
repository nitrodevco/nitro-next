import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `buyout_button` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutBuyoutButtonItemProps {
    layout?: BoxLayout;
    onBuyoutButton?: () => void;
}

export const SongdiskViewLayoutBuyoutButtonItem = ({ layout, onBuyoutButton }: SongdiskViewLayoutBuyoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="buyout_button"
            onPointerTap={onBuyoutButton}
            textStyle="text-style-button-regular"
            layout={{ width: 143, height: 22, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.buyout')}
        </Button>
    );
};
