import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `withdraw_all_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutWithdrawAllBtnItemProps {
    layout?: BoxLayout;
    onWithdrawAllBtn?: () => void;
}

export const ChestGenericLayoutWithdrawAllBtnItem = ({ layout, onWithdrawAllBtn }: ChestGenericLayoutWithdrawAllBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="withdraw_all_btn"
            onPointerTap={onWithdrawAllBtn}
            layout={{ width: 89, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.withdraw_all')}
        </Button>
    );
};
