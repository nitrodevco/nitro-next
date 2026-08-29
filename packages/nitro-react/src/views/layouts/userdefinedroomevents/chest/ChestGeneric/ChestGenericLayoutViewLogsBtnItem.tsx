import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `view_logs_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutViewLogsBtnItemProps {
    layout?: BoxLayout;
    onViewLogsBtn?: () => void;
}

export const ChestGenericLayoutViewLogsBtnItem = ({ layout, onViewLogsBtn }: ChestGenericLayoutViewLogsBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="view_logs_btn"
            onPointerTap={onViewLogsBtn}
            layout={{ width: 73, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.view_logs')}
        </Button>
    );
};
