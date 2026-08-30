import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `report_error` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutReportErrorItemProps {
    captionReportError?: string;
    layout?: BoxLayout;
    visibleReportError?: boolean;
}

export const ReportWindowLayoutReportErrorItem = ({ captionReportError, layout, visibleReportError }: ReportWindowLayoutReportErrorItemProps) => {
    const t = useTranslation();

    return (
        (visibleReportError ?? false) && (
            <ThemeText
                text={captionReportError ?? t('guide.help.request.emergency.desc.error')}
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
                name="report_error"
                verticalAlign="top"
                layout={{ width: 264, height: 16, flexShrink: 0, ...layout }}
            />
        )
    );
};
