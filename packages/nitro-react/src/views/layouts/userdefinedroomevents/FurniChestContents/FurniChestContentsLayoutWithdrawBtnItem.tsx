import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `withdraw_btn` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutWithdrawBtnItemProps {
    layout?: BoxLayout;
    onWithdrawBtn?: () => void;
}

export const FurniChestContentsLayoutWithdrawBtnItem = ({ layout, onWithdrawBtn }: FurniChestContentsLayoutWithdrawBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="withdraw_btn"
            onPointerTap={onWithdrawBtn}
            layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('wiredchests.withdraw')}
        </Button>
    );
};
