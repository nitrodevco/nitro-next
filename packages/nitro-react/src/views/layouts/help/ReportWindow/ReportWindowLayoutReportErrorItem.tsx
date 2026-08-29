import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
            <Region
                name="report_error"
                layout={{ width: 264, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionReportError ?? t('guide.help.request.emergency.desc.error')}
                    textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
                />
            </Region>
        )
    );
};
