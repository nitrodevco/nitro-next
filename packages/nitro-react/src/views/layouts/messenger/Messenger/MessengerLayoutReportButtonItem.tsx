import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `report_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutReportButtonItemProps {
    layout?: BoxLayout;
    onReportButton?: () => void;
}

export const MessengerLayoutReportButtonItem = ({ layout, onReportButton }: MessengerLayoutReportButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="report_button"
            tooltip={t('messenger.window.button.report.tooltip')}
            onPointerTap={onReportButton}
            textStyle="text-style-il-button"
            layout={{ width: 193, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            {t('messenger.window.button.report')}
        </Button>
    );
};
