import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton, Region } from '#base/theme';

/** Named region `reporting_reason` of ReportPhotoPosterLayout - configured through the parent's `reportingReason` prop. */
export interface ReportPhotoPosterLayoutReportingReasonProps {
    layout?: BoxLayout;
    on_130?: () => void;
    on_131?: () => void;
    on_132?: () => void;
    on_133?: () => void;
    on_134?: () => void;
    on_135?: () => void;
    on_136?: () => void;
}

export const ReportPhotoPosterLayoutReportingReason = ({ layout, on_130, on_131, on_132, on_133, on_134, on_135, on_136 }: ReportPhotoPosterLayoutReportingReasonProps) => {
    const t = useTranslation();

    return (
        <Region
            name="reporting_reason"
            layout={{ position: 'absolute', left: 20, width: 550, top: 445, height: 136, ...layout }}
        >
            <RadioButton
                variant="100"
                name="130"
                onPointerTap={on_130}
                layout={{ position: 'absolute', left: 0, width: 550, top: 0, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.130')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="131"
                onPointerTap={on_131}
                layout={{ position: 'absolute', left: 0, width: 550, top: 20, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.131')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="132"
                onPointerTap={on_132}
                layout={{ position: 'absolute', left: 0, width: 550, top: 40, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.132')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="133"
                onPointerTap={on_133}
                layout={{ position: 'absolute', left: 0, width: 550, top: 60, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.133')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="134"
                onPointerTap={on_134}
                layout={{ position: 'absolute', left: 0, width: 550, top: 80, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.134')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="135"
                onPointerTap={on_135}
                layout={{ position: 'absolute', left: 0, width: 550, top: 100, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.135')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="136"
                onPointerTap={on_136}
                layout={{ position: 'absolute', left: 0, width: 550, top: 120, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.136')}
            </RadioButton>
        </Region>
    );
};
