import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `start_deposit_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutStartDepositBtnItemProps {
    layout?: BoxLayout;
    onStartDepositBtn?: () => void;
}

export const ChestGenericLayoutStartDepositBtnItem = ({ layout, onStartDepositBtn }: ChestGenericLayoutStartDepositBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="start_deposit_btn"
            onPointerTap={onStartDepositBtn}
            layout={{ width: 92, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.start_deposit')}
        </Button>
    );
};
